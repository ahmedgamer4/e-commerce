"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getAll, getProductsCount } from "@/lib/products";

export default function ProductsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-products"],
    queryFn: () => getAll(1, 1),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <Button>
          <Plus className="mr-1 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Product Table */}
      <DataTable columns={columns} data={data?.data?.data.products || []} />
    </div>
  );
}
