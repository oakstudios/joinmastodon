import BasicPage from "../components/BasicPage"
import Head from "next/head"
import Hero from "../components/Hero"
import loadIntlMessages from "../utils/loadIntlMessages"
import LinkButton from "../components/LinkButton"
import classNames from "classnames"

const BrandSection = ({ title, copy, ctas, preview }) => (
  <section className="text-center">
    <div className="full-width-bg">
      <div className="full-width-bg__inner flex flex-col items-center justify-center py-20">
        <h2 className="h1 mb-8 max-w-[17ch] md:mb-12">{title}</h2>
        <div className="b1 mb-12 flex max-w-[50ch] flex-col gap-8">{copy}</div>
        <div className="flex justify-center gap-12">{ctas}</div>
      </div>
    </div>
    <div className="full-width-bg flex flex-col items-center justify-center bg-gray-5 py-20">
      <div className="full-width-bg__inner">{preview}</div>
    </div>
  </section>
)

/** This page does not require translations */
const Brand = () => (
  <div dir="ltr" className="[unicode-bidi:plaintext]">
    <Hero>
      <h1 className="h1 mb-4">Brand Toolkit</h1>
      <p className="sh1">
        Thanks for stopping by! You’ll find everything you assets and guidelines
        for how to use our logo. Questions? Feel free to reach out to us!
      </p>
    </Hero>
    <BrandSection
      title="Our Logos"
      copy={
        <p>
          We take pride in the Mastodon logo and hope you do too. Please take a
          moment to think about how you apply it. If you want to use our art,
          please keep it tasteful!
        </p>
      }
      ctas={
        <>
          <LinkButton size="large" href="">
            Download SVG
          </LinkButton>
          <LinkButton size="large" href="" light>
            Download PNG
          </LinkButton>
        </>
      }
      preview={
        <div className="grid grid-cols-12 gap-gutter">
          <div className="col-span-4 md:col-span-3 grid aspect-square items-center justify-center rounded bg-eggplant p-8 md:col-start-3">
            <img src="/logos/logo-purple.svg" alt="" />
          </div>
          <div className="col-span-8 md:col-span-5 grid items-center justify-center rounded bg-eggplant p-8">
            <img src="/logos/logo-full-purple.svg" alt="" />
          </div>
          <div className="col-span-4 md:col-span-3 grid aspect-square items-center justify-center rounded bg-gray-1 p-8 md:col-start-3">
            <img src="/logos/logo-white.svg" alt="" />
          </div>
          <div className="col-span-8 md:col-span-5 grid items-center justify-center rounded bg-gray-1 p-8">
            <img src="/logos/logo-full-white.svg" alt="" />
          </div>
          <div className="col-span-4 md:col-span-3 grid aspect-square items-center justify-center rounded bg-gray-3 p-8 md:col-start-3">
            <img src="/logos/logo-black.svg" alt="" />
          </div>
          <div className="col-span-8 md:col-span-5 grid items-center justify-center rounded bg-gray-3 p-8">
            <img src="/logos/logo-full-black.svg" alt="" />
          </div>
        </div>
      }
    />
    <BrandSection
      title="Sample toots!"
      copy={
        <p>
          If you’d like to make a mockup of a toot for media or news, please use
          the template below to get an accurate
        </p>
      }
      ctas={
        <LinkButton size="large" href="">
          Figma File
        </LinkButton>
      }
      preview={
        <div className="grid gap-gutter sm:grid-cols-2">
          <img
            className="w-full flex-auto"
            src="/samples/sample-toot.svg"
            alt=""
          />
          <img
            className="w-full flex-auto"
            src="/samples/sample-boost.svg"
            alt=""
          />
        </div>
      }
    />
    <BrandSection
      title="Our Typeface"
      copy={
        <>
          <p>
            Manrope is a modern sans-serif designed by Mikhail Sharanda in 2018
            that was converted into a variable font with collaboration from
            Mirko Velimirovic. It reflects the democratic values of Mastodon and
            the open-source community that we are esteemed to be a part of.
          </p>
          <p>
            <a href="https://manropefont.com/" className="text-main-blurple">
              manropefont.com
            </a>
          </p>
        </>
      }
      ctas={
        <>
          <LinkButton
            size="large"
            href="https://www.manropefont.com/manrope.zip"
          >
            Download typeface
          </LinkButton>
          <LinkButton
            size="large"
            href="https://github.com/sharanda/manrope"
            light
          >
            Contribute on GitHub
          </LinkButton>
        </>
      }
      preview={[800, 450].map((weight) => (
        <div key={weight} className="text-center mlb-48">
          <h3
            className={classNames(
              "h1 mb-16 mli-auto",
              weight === 450 && "!font-450"
            )}
          >
            Manrope {weight}
          </h3>
          <p
            className={classNames(
              "h4 mb-8 max-w-[30ch] mli-auto",
              weight === 450 && "!font-450"
            )}
          >
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww
            Xx Yy Zz
          </p>
          <p
            className={classNames(
              "h4 max-w-[30ch] mli-auto",
              weight === 450 && "!font-450"
            )}
          >
            1234567890!@#$%^&*()
          </p>
        </div>
      ))}
    />

    <Head>
      <title>Brand Toolkit - Mastodon</title>
      <meta property="og:title" content="Brand Toolkit for joinmastodon.org" />
    </Head>
  </div>
)
export async function getStaticProps(ctx) {
  return {
    props: { intlMessages: await loadIntlMessages(ctx) },
  }
}
export default Brand
