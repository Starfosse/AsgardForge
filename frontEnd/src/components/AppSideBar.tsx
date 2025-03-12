import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRef } from "react";
import { Link } from "react-router-dom";

const items = [
  {
    title: "Accueil",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Ventes",
    url: "/dashboard/orders",
    icon: Inbox,
  },
  {
    title: "Produits",
    url: "/dashboard/products",
    icon: Calendar,
  },
  {
    title: "Clients",
    url: "/dashboard/customers",
    icon: Search,
  },
  {
    title: "Support",
    url: "/dashboard/support",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { setOpen } = useSidebar();
  const isActiveRef = useRef(true);

  function handleOpen() {
    isActiveRef.current = !isActiveRef.current;
  }

  return (
    <Sidebar
      collapsible="icon"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(isActiveRef.current === true)}
      className="h-screen flex flex-col"
    >
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup className="h-full flex flex-col">
          <SidebarTrigger onClick={handleOpen} />
          <SidebarGroupContent className="pr-4 mr-4 flex flex-col h-full">
            <SidebarMenu className="flex flex-col h-full justify-between">
              <div className="flex flex-col gap-3 pb-4">
                {items.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className="pr-4 mr-4 pt-2 group"
                  >
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className="flex items-center gap-11 -ml-[0.4rem] "
                      >
                        <item.icon style={{ width: "24px", height: "24px" }} />
                        <span className="text-xl text-[#BDD1F8] font-mono font-bold">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>
              <div className="mb-4">
                <Link
                  to="/"
                  className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-3 px-10 items-center justify-center rounded-lg transition duration-300 w-full"
                >
                  Accueil client
                </Link>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
