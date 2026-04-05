import { apiFetch } from "@/lib/api";
import { FoodCategory } from "@/types";

type ServerCategory = { _id: string; name: string };
type ServerFood = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category: { _id: string; name: string };
  createdAt: string;
  updatedAt: string;
};

export const fetchFoodsWithCategories = async (): Promise<FoodCategory[]> => {
  const [catRes, foodRes] = await Promise.all([
    apiFetch<{ categories: ServerCategory[] }>("/api/categories"),
    apiFetch<{ foods: ServerFood[] }>("/api/foods?limit=50"),
  ]);

  const map = new Map<string, FoodCategory>();

  for (const cat of catRes.categories) {
    map.set(cat._id, {
      _id: cat._id,
      categoryName: cat.name,
      count: 0,
      foods: [],
    });
  }

  for (const food of foodRes.foods) {
    const catId = food.category?._id;
    if (!catId || !map.has(catId)) continue;
    const entry = map.get(catId)!;
    entry.foods.push({
      _id: food._id,
      foodName: food.name,
      price: food.price,
      image: food.image ?? "",
      ingredients: food.description ?? "",
      createdAt: food.createdAt,
      updatedAt: food.updatedAt,
    });
    entry.count++;
  }

  return Array.from(map.values());
};
