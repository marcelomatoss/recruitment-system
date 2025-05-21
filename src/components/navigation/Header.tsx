
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, UserIcon } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  
  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-card text-card-foreground border-b border-border py-4"> 
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-purple-800">RH Select</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-purple-600 text-white">
                    {user?.email ? getInitials(user.email) : "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>{user?.email}</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex cursor-pointer items-center text-red-600 focus:text-red-600" 
                onClick={logout}
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
