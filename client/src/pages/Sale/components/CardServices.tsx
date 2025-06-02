import type { ReactNode } from "react";

interface CardServicesProps {
  image: string;
  children: ReactNode;
}

export default function CardServices({ image, children }: CardServicesProps) {
  return (
    <div className="bg-foreground/90 relative mx-auto h-112 w-[20rem] rounded-md p-0 pb-8 duration-200 hover:scale-110">
      <div className="w-full min-w-full p-1">
        <img src={image} alt="" className="w-full min-w-full rounded-sm" />
      </div>
      <div className="text-background p-3 text-justify">
        <p className="dark:text-medium max-h-64 overflow-y-auto">{children}</p>
      </div>
    </div>
  );
}
