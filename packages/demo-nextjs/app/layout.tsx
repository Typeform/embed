import { Suspense } from 'react'

import { AppMenu } from './app-menu'
import '../shared/globals.css'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <h1>
          This is an example <a href="https://nextjs.org">Next.js</a> app with{' '}
          <a href="https://nextjs.org/docs/app">App Router</a>.
        </h1>
        <Suspense>
          <AppMenu />
          {children}
        </Suspense>
      </body>
    </html>
  )
}
