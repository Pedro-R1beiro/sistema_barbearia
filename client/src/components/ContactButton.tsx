import type { IconLookup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cva, type VariantProps } from "class-variance-authority";

const contactButtonStyles = cva(
  "flex max-w-11.5 items-center justify-center rounded-full p-2 px-2.5 hover:-translate-y-1 duration-200",
  {
    variants: {
      variant: {
        primary: "text-background bg-muted-foreground",
        secondary:
          "border-background border-1 text-muted/70 hover:text-foreground hover:bg-background duration-200",
        tertiary:
          "bg-foreground text-white dark:text-background hover:bg-foreground/90 focus-visible:ring-foreground/20 dark:focus-visible:ring-foreground/40 dark:bg-foreground/100",
      },
      size: {
        lg: "h-10 w-10",
        sm: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);

interface ContactButtonProps extends VariantProps<typeof contactButtonStyles> {
  link: string;
  icon: IconLookup;
  className?: string;
}

export function ContactButton({
  link,
  icon,
  variant = "primary",
  size = "lg",
  className,
}: ContactButtonProps) {
  return (
    <a
      target="_blank"
      rel="referrer noreferrer"
      href={link}
      className={contactButtonStyles({ variant, size, className })}
    >
      <FontAwesomeIcon size={size === "lg" ? "xl" : "sm"} icon={icon} />
    </a>
  );
}
