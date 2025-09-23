import type { ReactNode } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowBigRight } from "lucide-react";

interface CardServicesButtonProps {
  size?: ButtonSize;
  children?: ReactNode;
  className?: string;
}

type ButtonSize = "sm" | "default" | "lg";

export function CardServicesButton({
  size = "default",
  children,
  className,
}: CardServicesButtonProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between ">
      <Button
        onClick={() => navigate("/sign-up")}
        className={cn("w-[154px] [&:hover>svg]:translate-x-2", className)}
        size={size}
      >
        Agende o seu
        <ArrowBigRight className="duration-300" />
      </Button>
      {children}
    </div>
  );
}
