"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getRecentOrders,
  getRecentOrdersCount,
  getTotalSales,
} from "@/lib/orders";
import { getProductsCount } from "@/lib/products";
import { getCustomersCount } from "@/lib/users";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["recent-orders"],
    queryFn: () => getRecentOrders(1, 10),
  });
  console.log(data);
  return (
    <div className="w-full">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">
        Dashboard Overview
      </h1>

      <OverviewCards />

      <h2 className="mt-8 text-2xl font-bold">Recent Orders</h2>
      <br />
      <Table>
        <TableCaption>A list of your recent sales.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Customer</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading ? (
            data?.data?.data?.orders.map((order) => (
              <TableRow>
                <TableCell className="font-medium">{order.user}</TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell className="text-right">
                  {order.createdAt.toISOString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow></TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

const OverviewCards = () => {
  const { data: totalSalesData, isLoading: totalSalesLoading } = useQuery({
    queryKey: ["total-sales"],
    queryFn: () => getTotalSales(),
  });

  const { data: recentOrdersCount, isLoading: recentOrdersLoading } = useQuery({
    queryKey: ["recent-orders-count"],
    queryFn: () => getRecentOrdersCount(),
  });

  const { data: totalProductsCountData, isLoading: totalProductsCountLoading } =
    useQuery({
      queryKey: ["total-products-count"],
      queryFn: () => getProductsCount(),
    });

  const { data: customersCountData, isLoading: customersCountLoading } =
    useQuery({
      queryKey: ["customers-count"],
      queryFn: () => getCustomersCount(),
    });

  console.log(recentOrdersCount);
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
          <CardDescription>This month</CardDescription>
        </CardHeader>
        <CardContent className="text-2xl font-bold text-green-600">
          ${" "}
          {totalSalesLoading
            ? "Loading..."
            : totalSalesData?.data?.data.totalSales || "0.00"}
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>New Orders</CardTitle>
          <CardDescription>Last 7 days</CardDescription>
        </CardHeader>
        <CardContent className="text-2xl font-bold text-blue-600">
          {recentOrdersLoading
            ? "Loading..."
            : recentOrdersCount?.data?.data.count || "0"}
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Total Products</CardTitle>
          <CardDescription>Active listings</CardDescription>
        </CardHeader>
        <CardContent className="text-2xl font-bold text-purple-600">
          {totalProductsCountLoading
            ? "Loading..."
            : totalProductsCountData?.data?.data.count || "0"}
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>Total users</CardDescription>
        </CardHeader>
        <CardContent className="text-2xl font-bold text-yellow-600">
          {customersCountLoading
            ? "Loading..."
            : customersCountData?.data?.data.count || "0"}
        </CardContent>
      </Card>
    </div>
  );
};
