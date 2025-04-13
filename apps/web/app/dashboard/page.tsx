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

export default function Page() {
  return (
    <div className="w-full">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-green-600">
            $30,000
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>New Orders</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-blue-600">
            16
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
            <CardDescription>Active listings</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-purple-600">
            120
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Customers</CardTitle>
            <CardDescription>Total users</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-bold text-yellow-600">
            101
          </CardContent>
        </Card>
      </div>

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
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
