import type { ReactNode } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";

interface CardServicesButtonProps {
  size?: ButtonSize;
  children?: ReactNode;
}

type ButtonSize = "sm" | "default" | "lg";

export function CardServicesButton({
  size = "default",
  children,
}: CardServicesButtonProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between ">
      <Button
        onClick={() => navigate("/sign-up")}
        className="w-[154px] [&:hover>svg]:translate-x-2 md:w-[200px]"
        size={size}
      >
        Agende o seu
        <ArrowBigRight className="duration-300" />
      </Button>
      {children}
    </div>
  );
}
