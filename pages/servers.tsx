import { useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import Link from "next/link"
import { FormattedMessage, useIntl } from "react-intl"
import SVG from "react-inlinesvg"
import classnames from "classnames"
import { orderBy as _orderBy } from "lodash"
import ServerCard from "../components/ServerCard"
import { IconCard } from "../components/IconCard"
import SelectMenu from "../components/SelectMenu"
import { categoriesMessages } from "../data/categories"
import type { Server, Category, Language } from "../types/api"
import Hero from "../components/Hero"
import loadIntlMessages from "../utils/loadIntlMessages"

import serverHeroMobile from "../public/illustrations/servers_hero_mobile.png"
import serverHeroDesktop from "../public/illustrations/servers_hero_desktop.png"
import SkeletonText from "../components/SkeletonText"

const apiBase = `https://api.joinmastodon.org/`
const getApiUrl = (path, params = "") => `${apiBase}${path}?${params}`

const Servers = () => {
  const intl = useIntl()
  const [filters, setFilters] = useState({ language: "", category: "general" })

  const params = new URLSearchParams(filters)
  const queryOptions = {
    cacheTime: 30 * 60 * 1000, // 30 minutes
  }
  const fetchEndpoint = async function (endpoint, params): Promise<any[]> {
    const res = await fetch(getApiUrl(endpoint, params.toString()))
    return await res.json()
  }

  const initialCategories = useQuery<Category[]>(
    ["initial-categories"],
    () => fetchEndpoint("categories", {}),
    { ...queryOptions }
  )

  const apiCategories = useQuery<Category[]>(
    ["categories", filters.language],
    () => fetchEndpoint("categories", params),
    { ...queryOptions }
  )

  const apiLanguages = useQuery<Language[]>(
    ["languages", filters.category],
    () => fetchEndpoint("languages", params),
    { ...queryOptions }
  )

  /**
   * To keep the list stable when we get category data from the API,
   * we need to update the full list of filters' `servers_count` with
   * the new data, or 0 if it's not in the API's list */
  const updateCategoriesWithServersCount = (categories, newCategories) => {
    return categories?.map((localItem) => ({
      ...localItem,
      servers_count:
        newCategories?.find(
          (remoteItem) => remoteItem.category === localItem.category
        )?.servers_count ?? 0,
    }))
  }

  const sortedInitialCategories = _orderBy(
    initialCategories.data,
    "servers_count",
    "desc"
  )
  const updatedCategoryList = updateCategoriesWithServersCount(
    sortedInitialCategories,
    apiCategories?.data
  )

  const servers = useQuery<Server[]>(
    ["servers", filters.language, filters.category],
    () => fetchEndpoint("servers", params),
    queryOptions
  )

  return (
    <div>
      <Hero mobileImage={serverHeroMobile} desktopImage={serverHeroDesktop}>
        <h1 className="h1 mb-2">
          <FormattedMessage id="servers" defaultMessage="Servers" />
        </h1>

        <p className="sh1 mb-14 max-w-[36ch]">
          <FormattedMessage
            id="servers.hero.body"
            defaultMessage="Find your community here on the servers page. New here? <b>Check out the help section below.</b>"
            values={{
              b: (text) => <b>{text}</b>,
            }}
          />
        </p>
      </Hero>

      <div className="grid gap-20 pb-40">
        <GettingStartedCards />
        <div className="grid grid-cols-4 gap-gutter md:grid-cols-12">
          <div className="col-span-4 my-4 md:col-span-3">
            <h2 className="mb-8 flex items-center gap-2">
              <SVG className="text-gray-2" src="/ui/filters.svg" />
              <span className="text-gray-1">
                <FormattedMessage id="wizard.filter" defaultMessage="Filter" />
              </span>
            </h2>
            <ServerFilters
              isLoading={initialCategories.isLoading}
              filterList={updatedCategoryList}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="col-span-4 md:col-start-4 md:col-end-13">
            <div className="my-4 mb-8 flex md:justify-end">
              {apiLanguages.isSuccess && (
                <SelectMenu
                  label={
                    <FormattedMessage
                      id="wizard.filter_by_language"
                      defaultMessage="Filter by language"
                    />
                  }
                  onChange={(v) => {
                    setFilters({ ...filters, language: v })
                  }}
                  value={filters.language}
                  options={[
                    {
                      value: "",
                      label: intl.formatMessage({
                        id: "wizard.filter.all_languages",
                        defaultMessage: "All languages",
                      }),
                    },
                    ...apiLanguages.data
                      .filter(
                        (language) => language.language && language.locale
                      )
                      .map((language) => ({
                        label: language.language,
                        value: language.locale,
                      })),
                  ]}
                />
              )}
            </div>
            <ServerList servers={servers} />
          </div>
        </div>
      </div>
    </div>
  )
}

const GettingStartedCards = () => {
  const [visited, setVisited] = useState(false)
  useEffect(function checkVisited() {
    let visits = localStorage.getItem("visited")

    // on first visit, set localStorage.visited = true
    if (!visits) {
      localStorage.setItem("visited", "true")
    } else {
      setVisited(true) // on subsequent visits
    }
  }, [])

  return (
    <section className={classnames("mb-8", visited ? "order-1" : "order-0")}>
      <h2 className="h3 mb-8 text-center">
        <FormattedMessage
          id="servers.getting_started.headline"
          defaultMessage="Getting started with Mastodon is easy"
        />
      </h2>
      <div className="grid gap-gutter sm:grid-cols-2 xl:grid-cols-4">
        <IconCard
          title={<FormattedMessage id="servers" defaultMessage="Servers" />}
          icon="servers"
          copy={
            <FormattedMessage
              id="servers.getting_started.servers"
              defaultMessage="The first step is deciding which network you’d like to be a part of. Every server is operated by an independent organization or individual and the server you choose will host your account."
            />
          }
        />
        <IconCard
          title={
            <FormattedMessage
              id="servers.getting_started.feed.title"
              defaultMessage="Your feed"
            />
          }
          icon="feed"
          copy={
            <FormattedMessage
              id="servers.getting_started.feed.body"
              defaultMessage="Once you join a server, you can curate your home feed by browsing locally, following and talking with people from other servers, or explore trending posts from any publically available server."
            />
          }
        />
        <IconCard
          title={
            <FormattedMessage
              id="servers.getting_started.flexible.title"
              defaultMessage="Flexible"
            />
          }
          icon="move-servers"
          copy={
            <FormattedMessage
              id="servers.getting_started.flexible.body"
              defaultMessage="Find a different server you'd prefer? With Mastodon, you can easily move your profile to a different server at any time without losing any followers. To be in complete control, you can create your own server."
            />
          }
        />
        <IconCard
          title={
            <FormattedMessage
              id="servers.getting_started.safe_for_all.title"
              defaultMessage="Safe for all"
            />
          }
          icon="safety-1"
          copy={
            <FormattedMessage
              id="servers.getting_started.safe_for_all.body"
              defaultMessage="Actively working to eliminate hate speech, our organization will only point you to servers that are consistently committed to moderation again racism, sexism, and transphobia."
            />
          }
        />
      </div>
    </section>
  )
}

const ServerList = ({ servers }) => {
  if (servers.isError) {
    return <p>Oops, something went wrong.</p>
  }

  const featuredServers = null

  return (
    <div className="col-span-4 md:col-start-4 md:col-end-13">
      {featuredServers && (
        <h3 className="h5 mb-6">
          <FormattedMessage
            id="servers.browse_all"
            defaultMessage="Browse all"
          />
        </h3>
      )}
      <div className="grid gap-gutter sm:grid-cols-2 xl:grid-cols-3">
        {servers.isLoading
          ? Array(8)
              .fill(null)
              .map((_el, i) => <ServerCard key={i} />)
          : servers.data.map((server) => (
              <ServerCard key={server.domain} server={server} />
            ))}
      </div>
    </div>
  )
}

const ServerFilters = ({
  filters,
  setFilters,
  filterList,
  isLoading,
}: {
  filters: any
  setFilters: any
  filterList: any
  isLoading: boolean
}) => {
  const intl = useIntl()
  const totalServersCount =
    filterList?.reduce((acc, el) => acc + el.servers_count, 0) ?? 0
  const allOption = {
    category: "",
    servers_count: totalServersCount,
  }
  const options = [allOption, ...filterList]

  return (
    <div className="md:mb-8">
      <h3 className="h5 mb-2" id="category-group-label">
        <FormattedMessage
          id="server.filter_by.category"
          defaultMessage="Topic"
        />
      </h3>
      <ul className="flex flex-wrap gap-x-3 md:flex-col">
        {isLoading
          ? new Array(11).fill(null).map((_, i) => (
              <li className="h-8 py-2" key={i}>
                <SkeletonText className="!h-full" />
              </li>
            ))
          : options.map((item, i) => {
              const isActive = filters.category === item.category

              return (
                <li key={i}>
                  <label
                    className={classnames(
                      "b2 flex cursor-pointer gap-1 rounded py-1 focus-visible-within:outline focus-visible-within:outline-2 focus-visible-within:outline-accent-blurple",
                      isActive && "!font-800",
                      item.servers_count === 0 && "text-gray-2"
                    )}
                  >
                    <input
                      className="sr-only"
                      type="checkbox"
                      name="filters-category"
                      onChange={() => {
                        setFilters({
                          ...filters,
                          category: isActive ? "" : item.category,
                        })
                      }}
                    />
                    {item.category === ""
                      ? intl.formatMessage({
                          id: "wizard.filter.all_categories",
                          defaultMessage: "All topics",
                        })
                      : intl.formatMessage(categoriesMessages[item.category])}

                    <span className="text-gray-2">({item.servers_count})</span>
                  </label>
                </li>
              )
            })}
      </ul>
    </div>
  )
}

export async function getStaticProps(ctx) {
  return {
    props: { intlMessages: await loadIntlMessages(ctx) },
  }
}

export default Servers
