import Link from "next/link"
import classnames from "classnames"

type LinkButtonProps = {
  borderless?: boolean
  children: JSX.Element
  fullWidth?: boolean
  href: string
  light?: boolean
  size: "small" | "medium" | "large"
}

const LinkButton = ({
  borderless,
  children,
  fullWidth,
  href,
  light,
  size,
}: LinkButtonProps) => {
  let linkAttrs = {} as {
    target: string
    rel: string
  }

  // check if absolute url
  if (href.indexOf("http://") === 0 || href.indexOf("https://") === 0) {
    linkAttrs.target = "_blank"
    linkAttrs.rel = "noopener noreferrer"
  }

  return (
    <Link href={href}>
      <a
        className={classnames(
          "flex items-center justify-center rounded border-2 p-4 text-center !font-600 transition-all hover:border-dark-blurple hover:bg-dark-blurple",
          borderless ? "border-white" : "border-accent-blurple",
          fullWidth ? "w-full" : "w-max",
          light
            ? "bg-white text-accent-blurple hover:text-white"
            : "bg-accent-blurple text-white",
          size === "small" && "b3 h-10",
          size === "medium" && "b3 h-12",
          size === "large" && "b1 h-16 px-6"
        )}
        {...linkAttrs}
      >
        {children}
      </a>
    </Link>
  )
}

export default LinkButton
