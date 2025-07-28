// NavHeader/index.tsx or NavHeader.tsx
import { cn } from "@/lib/utils"
import { NavHeaderComponentProps } from "../header-types"
import NavLink from "./nav-link"
import NavLogo from "./nav-logo"
import NavMenu from "./nav-menu"
import NavProfile from "./nav-profile"

// Base component
const NavHeaderRoot: React.FC<NavHeaderComponentProps> = ({
  children,
  className,
}) => {
  const baseClass = "flex flex-wrap items-center justify-between p-1"
  return <nav className={cn(baseClass, className)}>{children}</nav>
}

// Attach compound parts to base component
type NavHeaderType = React.FC<NavHeaderComponentProps> & {
  Logo: typeof NavLogo
  Menu: typeof NavMenu
  Link: typeof NavLink
  Profile: typeof NavProfile
}

export const Nav: NavHeaderType = Object.assign(NavHeaderRoot, {
  Logo: NavLogo,
  Menu: NavMenu,
  Link: NavLink,
  Profile: NavProfile,
})
