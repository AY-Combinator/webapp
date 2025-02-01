import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavigationItem } from "@/lib/types";
import Link from "next/link";
import { useMemo } from "react";

interface NavigationProps {
  navigationItems: NavigationItem[];
}

const Navigation = ({ navigationItems }: NavigationProps) => {
  const menuItems = useMemo(
    () =>
      navigationItems.map(({ label, href, newTab, ariaLabel, external }) => (
        <NavigationMenuItem key={label}>
          <Link
            href={href}
            aria-label={ariaLabel ?? `Go to ${label}`}
            target={newTab ? "_blank" : "_self"}
            rel={newTab && external ? "noopener noreferrer" : undefined}
            className={navigationMenuTriggerStyle()}
          >
            {label}
          </Link>
        </NavigationMenuItem>
      )),
    [navigationItems]
  );

  if (navigationItems.length === 0) return null;

  return (
    <NavigationMenu>
      <NavigationMenuList>{menuItems}</NavigationMenuList>
    </NavigationMenu>
  );
};
export default Navigation;
