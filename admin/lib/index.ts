export { cn, formatDate } from "./utils";
export { apiFetch } from "./api";
export { fetcher } from "./fetcher";

import { FoodOrderStatusEnum, CategoryWithCount } from "@/types";
import { apiFetch } from "./api";

// ── Status color helpers ──────────────────────────────────────────────────────

const STATUS_COLORS: Record<FoodOrderStatusEnum, string> = {
  [FoodOrderStatusEnum.PENDING]: "#F59E0B",
  [FoodOrderStatusEnum.CONFIRMED]: "#3B82F6",
  [FoodOrderStatusEnum.PREPARING]: "#8B5CF6",
  [FoodOrderStatusEnum.OUT_FOR_DELIVERY]: "#F97316",
  [FoodOrderStatusEnum.DELIVERED]: "#10B981",
  [FoodOrderStatusEnum.CANCELLED]: "#EF4444",
};

export const getBorderColor = (status: FoodOrderStatusEnum): string =>
  STATUS_COLORS[status] ?? "#71717A";

export const getOptionStyles = (
  current: FoodOrderStatusEnum,
  option: FoodOrderStatusEnum
): React.CSSProperties =>
  current === option
    ? { backgroundColor: STATUS_COLORS[option], color: "#fff" }
    : {};

// ── Navigation helpers ────────────────────────────────────────────────────────

export const getMenuColor = (pathname: string, path: string): string =>
  pathname === path
    ? "bg-accent rounded-xl text-foreground"
    : "text-muted-foreground";

// ── Category fetch (used in DishesCategory via useSWR) ───────────────────────

type ServerCategory = { _id: string; name: string };
type ServerFood = { category: { _id: string } };

export const fetchCategoriesWithCount = async (): Promise<
  CategoryWithCount[]
> => {
  const [catRes, foodRes] = await Promise.all([
    apiFetch<{ categories: ServerCategory[] }>("/api/categories"),
    apiFetch<{ foods: ServerFood[] }>("/api/foods?limit=50"),
  ]);

  const countMap = new Map<string, number>();
  for (const food of foodRes.foods) {
    const id = food.category?._id;
    if (id) countMap.set(id, (countMap.get(id) ?? 0) + 1);
  }

  return catRes.categories.map((cat) => ({
    _id: cat._id,
    categoryName: cat.name,
    count: countMap.get(cat._id) ?? 0,
  }));
};
