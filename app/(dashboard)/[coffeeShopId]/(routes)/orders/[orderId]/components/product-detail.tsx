import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Product } from "@/types/schemas";

interface ProductDetailProps {
  product: Product;
  quantity: number;
  productPrice: number;
  subtotal: number;
}

export function ProductDetail({
  product,
  quantity,
  productPrice,
  subtotal,
}: ProductDetailProps) {
  return (
    <Card className={cn("w-[380px]")}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage
              className="h-10 w-10 rounded-full"
              src={product.imageUrl}
            />
            <AvatarFallback>PC</AvatarFallback>
          </Avatar>
          <p>{product.name}</p>
        </CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {quantity} x{" "}
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 2,
              }).format(productPrice)}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end">
        <p className="text-sm">
          Total:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 2,
          }).format(subtotal)}
        </p>
      </CardFooter>
    </Card>
  );
}
