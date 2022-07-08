import { FormattedMessage } from "react-intl"

import loadIntlMessages from "../utils/loadIntlMessages"
import LinkButton from "../components/LinkButton"
import TestimonialCard from "../components/TestimonialCard"

import testimonialsData from "../data/testimonials.json"

function Home({ testimonials }) {
  return (
    <>
      <HomeHero />
      <Testimonials testimonials={testimonialsData} />
    </>
  )
}

export default Home

const HomeHero = () => {
  return (
    <section className="grid hero">
      <h1 className="h1">
        <FormattedMessage
          id="home.hero.headline"
          defaultMessage="Social networking that's not for sale."
        />
      </h1>

      <p className="sh1">
        <FormattedMessage
          id="home.hero.body"
          defaultMessage="Your home feed should be filled with what matters to you most, not what a corporation thinks you should see. Radically different social media, back in the hands of the people."
        />
      </p>

      <div className="hero__button-row">
        <LinkButton href="/">
          <FormattedMessage
            id="home.how_it_works"
            defaultMessage="How it works"
          />
        </LinkButton>

        <LinkButton href="/" light>
          <FormattedMessage
            id="home.get_started"
            defaultMessage="Get started"
          />
        </LinkButton>
      </div>
      <style jsx>{`
        h1 {
          max-width: 15ch;
        }

        p {
          max-width: 45ch;
        }

        h1,
        p {
          justify-self: center;
        }

        .hero {
          text-align: center;
        }

        .hero__button-row {
          display: flex;
          gap: 3rem;
          justify-content: center;
        }
      `}</style>
    </section>
  )
}

const Testimonials = ({ testimonials }) => {
  return (
    <section className="grid">
      {testimonials.map((testimonial) => {
        return (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        )
      })}
    </section>
  )
}

export async function getStaticProps(ctx) {
  return {
    props: { intlMessages: await loadIntlMessages(ctx) },
  }
}
