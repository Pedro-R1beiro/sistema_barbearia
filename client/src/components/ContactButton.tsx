import type { IconLookup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ContactButtonProps {
  link: string;
  icon: IconLookup;
  variant?: "primary" | "secondary";
  size?: "xs" | "sm" | "lg" | undefined;
}

export function ContactButton({
  link,
  icon,
  variant = "primary",
  size,
}: ContactButtonProps) {
  return (
    <a
      target="_blank"
      rel="referrer noreferrer"
      href={link}
      className={`flex max-w-11.5 items-center justify-center rounded-full p-2 px-2.5 ${variant === "primary" ? "bg-muted-foreground/70" : "border-background border-1"} ${size === "lg" ? "h-6.5 w-6.5" : ""}`}
    >
      <FontAwesomeIcon
        size={size}
        icon={icon}
        className={`text-3xl ${variant === "primary" ? "text-background" : "text-muted/70"}`}
      />
    </a>
  );
}
