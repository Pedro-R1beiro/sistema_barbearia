import type { IconLookup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ContactButtonProps {
  link: string;
  icon: IconLookup;
}

export function ContactButton({ link, icon }: ContactButtonProps) {
  return (
    <a
      href={link}
      className="bg-muted-foreground/70 flex rounded-full p-2 px-2.5"
    >
      <FontAwesomeIcon icon={icon} className="text-muted text-3xl" />
    </a>
  );
}
