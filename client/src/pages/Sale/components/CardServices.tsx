import type { ReactNode } from "react";

interface CardServicesProps {
  image: string;
  children: ReactNode;
}

export default function CardServices({ image, children }: CardServicesProps) {
  return (
    <div className="dark:bg-foreground/90 mx-auto h-112 w-[20rem] overflow-hidden rounded-md bg-[#d9d9d9] p-0 pb-8">
      <div className="max-width-full p-0">
        <img src={image} alt="" className="min-w-full" />
      </div>
      <div className="text-foreground dark:text-background p-3 text-justify">
        {children}
      </div>
    </div>
  );
}
