
import { Link, useLocation } from "react-router-dom";
import { 
  Home,
  Users,
  FileText,
  CheckSquare,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Candidatos",
    href: "/candidates",
    icon: Users,
  },
  {
    title: "Vagas",
    href: "/jobs",
    icon: FileText,
  },
  {
    title: "Processos",
    href: "/processes",
    icon: CheckSquare,
  },
  {
    title: "Configurações",
    href: "/settings",
    icon: Settings,
  },
];

const SideNav = () => {
  const location = useLocation();
  
  return (
    <div className="w-64 h-full bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border p-4">
      <div className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-md transition-colors",
              location.pathname === item.href
                ? "bg-purple-100 text-purple-800 font-medium"
                : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
