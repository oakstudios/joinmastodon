import classNames from "classnames"

export const MenuToggle = ({ open, onClick }) => (
  <button onClick={onClick} className="md:hidden">
    <svg
      width="27"
      height="19"
      viewBox="0 0 27 19"
      className="overflow-visible"
    >
      <line
        className={classNames(
          "origin-center stroke-white transition-all",
          open && "-translate-x-1 translate-y-[0.37rem] rotate-45"
        )}
        y1="1.5"
        x2="27"
        y2="1.5"
        strokeWidth="3"
      />
      <line
        className={classNames(
          "origin-center stroke-white transition-all",
          open && "opacity-0"
        )}
        y1="9.50002"
        x2="27"
        y2="9.50002"
        strokeWidth="3"
      />
      <line
        className={classNames(
          "origin-center stroke-white transition-all",
          open && "-translate-x-1 -translate-y-[0.37rem] -rotate-45"
        )}
        y1="17.5"
        x2="27"
        y2="17.5"
        strokeWidth="3"
      />
    </svg>
  </button>
)

export default MenuToggle
