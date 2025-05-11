import type { IconLookup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cva, type VariantProps } from "class-variance-authority";

const contactButtonStyles = cva(
  "flex max-w-11.5 items-center justify-center rounded-full p-2 px-2.5", // base
  {
    variants: {
      variant: {
        primary: "bg-muted-foreground/100 text-background",
        secondary:
          "border-background border-1 text-muted/70 hover:text-foreground hover:bg-background duration-200",
      },
      size: {
        lg: "h-12 w-14",
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
      <FontAwesomeIcon size={size === "lg" ? "2x" : "sm"} icon={icon} />
    </a>
  );
}
