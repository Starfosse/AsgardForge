interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "primaryHidden" | "secondary" | "secondaryHidden";
}

export default function Card({
  children,
  className,
  variant = "primary",
}: CardProps) {
  const variantClasses = {
    primary: "rounded-lg shadow-md",
    primaryHidden: "bg-amber-700 overflow-hidden",
    secondary: "rounded-lg shadow-lg ",
    secondaryHidden: "rounded-lg shadow-lg overflow-hidden",
  };
  return (
    <div className={`bg-white ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}
