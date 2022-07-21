import Image from "next/image"
import { FormattedMessage } from "react-intl"
import LinkButton from "./LinkButton"
import type Server from "../types/server"

const ServerCard = ({ server }: { server: Server }) => {
  return (
    <div className="flex flex-col rounded shadow">
      <div className="relative h-26 lg:h-40">
        <Image
          className="rounded-t"
          src={server.proxied_thumbnail}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="p-4 pb-5">
        <p className="b1 !font-700">{server.domain}</p>
        <p className="b3 mb-4 capitalize text-gray-1">{server.category}</p>
        <p className="b3 line-clamp-5">{server.description}</p>
      </div>

      <div className="justify-self-end p-4 pt-0">
        <LinkButton
          href={`https://${server.domain}`}
          light={server.approval_required}
          fullWidth
          size="small"
        >
          {server.approval_required ? (
            <FormattedMessage
              id="request_access"
              defaultMessage="Request access"
            />
          ) : (
            <FormattedMessage id="join_server" defaultMessage="Join server" />
          )}
        </LinkButton>
      </div>
    </div>
  )
}

export default ServerCard
