import { ContactButton } from "@/components/ContactButton";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import type { ReactNode } from "react";

interface CardServicesProps {
  image: string;
  children: ReactNode;
}

export default function CardServices({ image, children }: CardServicesProps) {
  return (
    <div className="dark:bg-foreground/90 relative mx-auto h-112 w-[20rem] rounded-md bg-[#d9d9d9] p-0 pb-8 duration-200 hover:scale-110">
      <div className="w-full min-w-full p-1">
        <img src={image} alt="" className="w-full min-w-full rounded-sm" />
      </div>
      <div className="text-foreground dark:text-background p-3 text-justify">
        <p className="max-h-64 overflow-y-auto">{children}</p>
      </div>

      <ContactButton
        link="whatsapp.api.client"
        icon={faCalendar}
        className="bg-foreground dark:text-background absolute right-[-1rem] bottom-[-1rem]"
      />
    </div>
  );
}
