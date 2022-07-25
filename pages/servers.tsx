import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { FormattedMessage, defineMessages, useIntl } from "react-intl"
import ServerCard from "../components/ServerCard"
import { categoriesMessages } from "../data/categories"
import type Server from "../types/server"

const Servers = ({ filters }) => {
  return (
    <div className="py-40">
      <h1>Servers page placeholder</h1>

      <div className="grid grid-cols-4 gap-gutter lg:grid-cols-12">
        <ServerFilters filters={filters} />
        {/* <ServerList /> */}
      </div>
    </div>
  )
}

const ServerList = () => {
  const servers = useQuery(
    ["servers"],
    async function (): Promise<Server[]> {
      const res = await fetch("https://api.joinmastodon.org/servers")
      return await res.json()
    },
    { cacheTime: 30 * 60 * 1000 } // 30 minutes
  )

  if (servers.isLoading) {
    return <p>Loading...</p>
  }

  if (servers.isError) {
    return <p>Oops, something went wrong.</p>
  }

  return (
    <div className="col-span-4 lg:col-start-4 lg:col-end-13 ">
      <h3 className="h5 mb-6">
        <FormattedMessage id="servers.browse_all" defaultMessage="Browse all" />
      </h3>
      <div className="grid gap-gutter md:grid-cols-2  xl:grid-cols-3">
        {servers.data?.map((server) => (
          <ServerCard key={server.domain} server={server} />
        ))}
      </div>
    </div>
  )
}

const ServerFilters = ({ filters }) => {
  const [filterState, setFilterState] = useState({
    topic: new Array(filters.topic.length).fill(false),
    language: new Array(filters.language.length).fill(false),
    server_size: new Array(filters.server_size.length).fill(false),
  })

  const intl = useIntl()
  const filterGroupMessages = defineMessages({
    topic: { id: "server.filter_by.topic", defaultMessage: "Topic" },
    language: {
      id: "server.filter_by.language",
      defaultMessage: "Language",
    },
    server_size: {
      id: "server.filter_by.server_size",
      defaultMessage: "Server size",
    },
  })

  return (
    <div className="col-span-3">
      {Object.keys(filterGroupMessages).map((group) => {
        return (
          <div className="mb-8" key={group}>
            <h3 className="h5 mb-2" id={`${group}-group-label`}>
              {intl.formatMessage(filterGroupMessages[group])}
            </h3>

            <ul
              className="space-y-2"
              role="group"
              aria-labelledby={`${group}-group-label`}
            >
              {filters[group]?.map((item, i) => {
                if (item.category || item.language || item.server_size) {
                  return (
                    <li key={i}>
                      <div
                        className="flex w-max cursor-pointer gap-1"
                        role="checkbox"
                        tabIndex={0}
                        aria-checked={filterState[group][i]}
                        onClick={() => {
                          const updatedFilterState = filterState[group].map(
                            (item, position) => {
                              return i === position ? !item : item
                            }
                          )

                          setFilterState({
                            ...filterState,
                            [group]: updatedFilterState,
                          })
                        }}
                      >
                        <span className="pl-2">
                          {group === "topic"
                            ? intl.formatMessage(
                                categoriesMessages[item.category]
                              )
                            : item.language || item.server_size}
                        </span>
                        <span className="text-gray-2">
                          ({item.servers_count})
                        </span>
                      </div>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export async function getServerSideProps() {
  const topicRes = await fetch("https://api.joinmastodon.org/categories")
  const topic = await topicRes.json()

  const langaugeRes = await fetch("https://api.joinmastodon.org/languages")
  const language = await langaugeRes.json()

  const serversRes = await fetch("https://api.joinmastodon.org/servers")
  const servers = await serversRes.json()

  // matching data format of /categories and /languages
  let serverCount = [
    {
      server_size: "1 - 1,000",
      servers_count: 0,
    },
    {
      server_size: "1,000 - 5,000",
      servers_count: 0,
    },
    {
      server_size: "5,000+",
      servers_count: 0,
    },
  ]

  servers.forEach((server) => {
    if (server.total_users < 1000) {
      serverCount[0].servers_count++
    } else if (server.total_users > 1000 && server.total_users <= 5000) {
      serverCount[1].servers_count++
    } else {
      serverCount[2].servers_count++
    }
  })

  return {
    props: {
      filters: {
        topic,
        language,
        server_size: serverCount,
      },
    },
  }
}

export default Servers
