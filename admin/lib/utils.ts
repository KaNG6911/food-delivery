import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatDate = (dateRange: DateRange | undefined): string => {
  if (!dateRange?.from) return "Pick a date range";
  if (!dateRange.to) return format(dateRange.from, "LLL dd, y");
  return `${format(dateRange.from, "LLL dd, y")} – ${format(dateRange.to, "LLL dd, y")}`;
};
