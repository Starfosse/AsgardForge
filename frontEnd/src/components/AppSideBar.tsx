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
    title: "Tableau de bord",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Paramètres",
    url: "/",
    icon: Home,
  },
  {
    title: "Ventes",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Produits",
    url: "/dashboard/products",
    icon: Calendar,
  },
  {
    title: "Clients",
    url: "#",
    icon: Search,
  },
  {
    title: "Profitabilité",
    url: "#",
    icon: Settings,
  },
  {
    title: "Marketing",
    url: "#",
    icon: Settings,
  },
  {
    title: "Support",
    url: "#",
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
      onMouseLeave={() => {
        isActiveRef.current === true ? setOpen(true) : setOpen(false);
      }}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarTrigger onClick={handleOpen} />
          <SidebarGroupContent className="pr-4 mr-4 space-y-5">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="pr-4 mr-4 space-y-5 group"
                >
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className="flex items-center gap-11 -ml-[0.4rem] "
                    >
                      <item.icon style={{ width: "24px", height: "24px" }} />
                      <span className="text-lg text-[#BDD1F8] font-mono font-thin">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
