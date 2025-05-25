import { type IconLookup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export interface NavLinkInterface {
  link: string;
  text: string;
  icon: IconLookup;
  type: "reactLink" | "anchorLink";
}

type NavLinkProps = NavLinkInterface;

export function NavLink({ link, text, icon, type }: NavLinkProps) {
  return type === "reactLink" ? (
    <Link
      to={link}
      className="hover:bg-muted/10 w-full space-x-2 rounded-md p-2 whitespace-nowrap duration-100"
    >
      <FontAwesomeIcon icon={icon} />
      <span>{text}</span>
    </Link>
  ) : (
    <a
      href={link}
      className="w-full space-x-6 rounded-md p-2 whitespace-nowrap duration-200"
    >
      <FontAwesomeIcon icon={icon} />
      <span>{text}</span>
    </a>
  );
}
