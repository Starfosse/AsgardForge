import Footer from "@/components/Footer";
import Menu from "../components/Menu";

function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Menu />
      <main className="flex-grow flex flex-col min-h-full">{children}</main>
      <Footer />
    </div>
  );
}

export default LayoutClient;
