interface DashBoardProductProps {
  children: React.ReactNode;
}

export default function DashBoardProduct({ children }: DashBoardProductProps) {
  return <div className="w-full bg-[#272E48] rounded-sm p-8">{children}</div>;
}
