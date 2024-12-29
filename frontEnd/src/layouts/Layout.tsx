import Menu from "../components/Menu";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen ">
      <Menu />
      <main className="flex-grow">{children}</main>
    </div>
  );
}

export default Layout;
