interface CardServicesProps {
  title: string;
  text: string;
}

export function CardServicesContent({ title, text }: CardServicesProps) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-1.5">{title}</h3>
        <p className="max-w-[220px]">{text}</p>
      </div>
    </div>
  );
}
