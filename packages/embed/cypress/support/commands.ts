/// <reference types="@visual-regression-tracker/agent-cypress" />
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

type VrtOptions = NonNullable<Parameters<Cypress.Chainable['vrtTrack']>[1]> & { waitForForms?: boolean }

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>

      /**
       * Waits for the embedded forms to settle, then tracks a visual regression snapshot.
       * Pass `waitForForms: false` for states without a rendered form, such as a closed launcher.
       * @example cy.vrt('popup mobile')
       */
      vrt(title: string, options?: VrtOptions): Chainable<void>
    }
  }
}

const FORM_READY_TIMEOUT = 15000
const SETTLE_MS = 500

// Only the form iframes' own documents are checked: they are readable because chromeWebSecurity is off.
const getFormDocuments = (doc: Document) =>
  Array.from(doc.querySelectorAll('iframe'))
    .map((iframe) => iframe.contentDocument)
    .filter((formDoc): formDoc is Document => !!formDoc)

// Waits until every embedded form has rendered content, loaded its fonts and images, and finished its
// finite animations. Infinite ones (spinners, skeletons) are ignored or this would never settle.
const waitForFormsReady = () =>
  cy.document({ timeout: FORM_READY_TIMEOUT }).should((doc) => {
    const formDocs = getFormDocuments(doc)
    expect(formDocs, 'form iframes found').to.have.length.greaterThan(0)
    formDocs.forEach((formDoc) => {
      expect(formDoc.body.innerText.trim(), 'form has rendered content').to.not.equal('')
      expect(formDoc.fonts.status, 'fonts loaded').to.equal('loaded')
      expect(
        Array.from(formDoc.images).filter((img) => !img.complete),
        'images still loading'
      ).to.have.length(0)
      const running = formDoc
        .getAnimations()
        .filter((a) => a.playState === 'running' && Number.isFinite(a.effect?.getComputedTiming().endTime))
      expect(running, 'finite animations still running').to.have.length(0)
    })
  })

// Printed to the node log (see the `log` task) so a "Difference found" can be read from the CI output.
const logFormState = (title: string) =>
  cy.document().then((doc) => {
    const forms = getFormDocuments(doc).map((formDoc) => {
      const frame = formDoc.defaultView!.frameElement as HTMLIFrameElement
      return {
        src: frame.src.slice(0, 120),
        size: `${frame.offsetWidth}x${frame.offsetHeight}`,
        text: formDoc.body.innerText.replace(/\s+/g, ' ').slice(0, 200),
        okButton: !!formDoc.querySelector('[data-qa*="ok-button"]'),
        // heuristic: the new RX renderer marks non-focused blocks `inert`, the old UI doesn't
        inertBlocks: formDoc.querySelectorAll('[inert]').length,
      }
    })
    const viewport = `${doc.defaultView!.innerWidth}x${doc.defaultView!.innerHeight}`
    cy.task('log', `[vrt-debug] ${JSON.stringify({ title, viewport, forms })}`, { log: false })
  })

Cypress.Commands.add('vrt', (title, { waitForForms = true, ...options }: VrtOptions = {}) => {
  if (waitForForms) {
    waitForFormsReady()
  }
  cy.wait(SETTLE_MS) // animations can start right after the content mounts
  logFormState(title)
  cy.vrtStart()
  cy.vrtTrack(title, {
    viewport: title.match(/mobile/i) ? 'mobile' : 'desktop',
    // VRT retries resend the same screenshot file, so they can never turn a diff into a pass
    retryLimit: 0,
    ...options,
  })
  cy.vrtStop()
})

export {}
