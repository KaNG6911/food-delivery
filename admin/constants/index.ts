import { ShoppingCart, UtensilsCrossed, Settings } from "lucide-react";

export const ADMIN_SIDEBAR_MENUS = [
  { value: "Orders", path: "/", Icon: ShoppingCart },
  { value: "Food Menu", path: "/food-menu", Icon: UtensilsCrossed },
  { value: "Settings", path: "/settings", Icon: Settings },
];
