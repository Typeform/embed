import { useRouter } from 'next/router'
import { AppProps } from 'next/app'

import '../shared/globals.css'
import { Menu } from '../shared/menu'
import { defaultFormId } from '../shared/constants'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const formId = router.query?.id ?? defaultFormId
  return (
    <>
      <h1>
        This is an example <a href="https://nextjs.org">Next.js</a> app with{' '}
        <a href="https://nextjs.org/docs/pages">Pages Router</a>.
      </h1>
      <Menu id={`${formId}`} />
      <Component id={formId} {...pageProps} />
    </>
  )
}
