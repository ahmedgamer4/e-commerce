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

export default function ProductsPage() {
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

      {/* Search Input */}
      <div className="w-full sm:w-1/3">
        <Input placeholder="Search products..." />
      </div>

      {/* Product Table */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>GMMK Pro</TableCell>
                <TableCell>Custom</TableCell>
                <TableCell>$179.99</TableCell>
                <TableCell>12</TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button variant="outline" size="sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Keychron K6</TableCell>
                <TableCell>Wireless</TableCell>
                <TableCell>$89.99</TableCell>
                <TableCell>34</TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button variant="outline" size="sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              {/* More rows can go here */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
