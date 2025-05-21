import SideNav from "@/components/navigation/SideNav";
import Header from "@/components/navigation/Header";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNav />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
            <main className="flex-1 overflow-y-auto bg-background text-foreground p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;