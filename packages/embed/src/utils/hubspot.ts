import { sleep } from './sleep'

type HubspotFieldsType = {
  hubspot_page_name: string
  hubspot_page_url: string
  hubspot_utk?: string
}

const HUBSPOT_COOKIE = 'hubspotutk'

export const getHubspotCookieValue = () => {
  const match = document.cookie.match(new RegExp(`(^| )${HUBSPOT_COOKIE}=([^;]+)`))
  return (match && match[2]) || undefined
}

export const getHubspotHiddenFields = (): HubspotFieldsType => ({
  hubspot_page_name: document.title,
  hubspot_page_url: window.location.href,
  hubspot_utk: getHubspotCookieValue(),
})

export const waitForHubspotCookie = async (): Promise<void> => {
  for (let maxRetries = 10, retries = 0; !getHubspotCookieValue() && retries < maxRetries; retries++) {
    await sleep(250)
  }
}
