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
    <Link to={link} className="space-x-2">
      <FontAwesomeIcon icon={icon} />
      {text}
    </Link>
  ) : (
    <a href={link} className="space-x-2">
      <FontAwesomeIcon icon={icon} />
      <span>{text}</span>
    </a>
  );
}
