interface DashBoardProductProps {
  children: React.ReactNode;
  className?: string;
}

export default function DashBoardAnalytics({
  children,
  className,
}: DashBoardProductProps) {
  return (
    <div className={`w-full bg-[#272E48] rounded-sm p-8 ${className}`}>
      {children}
    </div>
  );
}
