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
    primary: "bg-white rounded-lg shadow-md",
    primaryHidden: "bg-amber-700 overflow-hidden",
    secondary: "bg-white rounded-lg shadow-lg ",
    secondaryHidden: "bg-white rounded-lg shadow-lg overflow-hidden",
  };
  return (
    <div className={`${variantClasses[variant]} ${className}`}>{children}</div>
  );
}
