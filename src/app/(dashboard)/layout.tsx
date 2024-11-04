import { UserNav } from "@/components/Navbar/UserNav";
import { MainNav } from "../../components/Navbar/MainNav";
import { Search } from "@/components/Navbar/Search";

// import { UserNav } from "@/app/(app)/examples/dashboard/components/user-nav";

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
    </div>
  );
}