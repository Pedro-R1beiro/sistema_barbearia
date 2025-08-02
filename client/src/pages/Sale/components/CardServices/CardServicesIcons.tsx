import { ContactButton } from "@/components/ContactButton";
import type { IconLookup } from "@fortawesome/free-solid-svg-icons";

export interface CardServicesIconsProps {
  icons: {
    icon: IconLookup;
    link: string;
  }[];
}
export function CardServicesIcons({ icons }: CardServicesIconsProps) {
  return (
    <div className="absolute top-5.5 flex gap-2 right-5.5">
      {icons.map(({ icon, link }) => {
        return <ContactButton icon={icon} link={link} />;
      })}
    </div>
  );
}
