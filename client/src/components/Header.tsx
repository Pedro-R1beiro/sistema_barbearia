import { twMerge } from "tailwind-merge";

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export function Header({ children, className }: HeaderProps) {
  return (
    <header
      className={twMerge(
        "bg-accent-foreground/70 text-background relative flex w-full max-w-full items-center justify-end rounded-md py-3 shadow-xs backdrop-blur-sm",
        className,
      )}
    >
      <a
        href="#"
        className="bg-background absolute top-[em] left-[-0.25rem] rounded-r-full p-3"
      >
        <div className="bg-foreground rounded-full p-2 py-[0.8rem] font-bold">
          logo
        </div>
      </a>
      {children}
    </header>
  );
}
