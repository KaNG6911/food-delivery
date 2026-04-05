import { apiFetch } from "@/lib/api";

type CreateFoodPayload = {
  foodName: string;
  price: number;
  image?: string;
  ingredients?: string;
  category: string;
};

export const createFood = (payload: CreateFoodPayload) =>
  apiFetch("/api/foods", {
    method: "POST",
    body: JSON.stringify({
      name: payload.foodName,
      price: payload.price,
      imageUrl: payload.image,
      description: payload.ingredients,
      category: payload.category,
    }),
  });
