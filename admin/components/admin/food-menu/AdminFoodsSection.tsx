"use client";

import { fetchFoodsWithCategories } from "@/lib/services/get-foods-with-categories";
import { FoodCategory } from "@/types";
import useSWR from "swr";
import { AdminFoodCard } from "./AdminFoodCard";
import { AdminFoodSkeleton } from "./AdminFoodSkeleton";
import { AddFoodModal } from "./AddFoodModal";

export const AdminFoodsSection = () => {
  const { data: foodsWithCategories, isLoading } = useSWR<FoodCategory[]>(
    "foods-with-categories",
    fetchFoodsWithCategories
  );

  if (isLoading || !foodsWithCategories) return <AdminFoodSkeleton />;

  return (
    <div className="flex flex-col gap-6">
      {foodsWithCategories.map((category, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 p-6 bg-background rounded-xl"
        >
          <div className="flex items-center gap-2 text-xl font-semibold">
            <p>{category.categoryName}</p>
            <p className="flex items-center">{category.count}</p>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <AddFoodModal
              categoryName={category.categoryName}
              categoryId={category._id}
            />
            {category.foods.map((food) => (
              <div key={food._id} className="flex gap-2">
                <AdminFoodCard
                  image={food.image}
                  price={food.price}
                  ingredients={food.ingredients}
                  foodName={food.foodName}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
