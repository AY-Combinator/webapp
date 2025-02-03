import Logo from "@/components/atom/Logo";
import Navigation from "@/components/atom/Navigation";
import { DashboardNavigation } from "@/data/menus/DashboardNavigation";

const Header = () => {
  return (
    <header>
      <div className="flex justify-between items-center gap-4 py-6">
        <Logo />
        <div className="flex gap-4 items-center">
          <Navigation navigationItems={DashboardNavigation} />
        </div>
      </div>
    </header>
  );
};
export default Header;
