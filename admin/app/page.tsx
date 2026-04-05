"use client";

import { columns } from "@/components/admin/orders/columns";
import { DataTable } from "@/components/admin/orders/data-table";
import TableSkeleton from "@/components/admin/orders/TableSkeleton";
import { fetchAllOrders, OrdersResponse } from "@/lib/services/get-all-order";
import { AllFoodOrders } from "@/types";
import { Dispatch, SetStateAction } from "react";
import useSWR from "swr";

export default function AdminOrders() {
  const { data, isLoading, mutate } = useSWR<OrdersResponse>(
    "/api/orders",
    fetchAllOrders
  );

  if (isLoading) return <TableSkeleton />;

  const setFoodOrders: Dispatch<SetStateAction<AllFoodOrders[] | undefined>> = (
    value
  ) => {
    mutate(
      (current) => {
        if (!current) return current;
        const prev = current.orders;
        const next: AllFoodOrders[] =
          typeof value === "function" ? (value(prev) ?? []) : (value ?? []);
        return { ...current, orders: next };
      },
      { revalidate: false }
    );
  };

  return (
    <div className="py-6 pl-6 pr-10">
      <DataTable
        columns={columns}
        data={data?.orders ?? []}
        setFoodOrders={setFoodOrders}
      />
    </div>
  );
}
