import { useRouter } from "next/router"
import { IntlProvider } from "react-intl"

function MyApp({ Component, pageProps }) {
  const { locale, defaultLocale } = useRouter()
  return (
    <IntlProvider
      locale={locale}
      defaultLocale={defaultLocale}
      messages={pageProps.intlMessages}
    >
      <Component {...pageProps} />
    </IntlProvider>
  )
}

export default MyApp
