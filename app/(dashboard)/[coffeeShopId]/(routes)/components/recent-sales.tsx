import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function RecentSales({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      {data.map((sale: any) => (
        <div key={sale.total} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{sale.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {sale.clientName}
            </p>
            <p className="text-sm text-muted-foreground">{sale.clientEmail}</p>
          </div>
          <div className="ml-auto font-medium">
            +
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "COP",
            }).format(sale.total)}
          </div>
        </div>
      ))}
    </div>
  );
}
