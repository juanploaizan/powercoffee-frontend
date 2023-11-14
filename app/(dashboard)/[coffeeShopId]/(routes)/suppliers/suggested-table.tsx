import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const SuggestedSuppliersTable = ({
  suggestedSuppliers,
}: {
  suggestedSuppliers: any[];
}) => {
  return (
    <Table>
      <TableCaption>A list of suggested providers</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>NIT</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {suggestedSuppliers.length > 0 ? (
          suggestedSuppliers.map((suggestedSupplier: any) => (
            <TableRow key={suggestedSupplier.name}>
              <TableCell>{suggestedSupplier.name}</TableCell>
              <TableCell>{suggestedSupplier.nit}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableCell colSpan={2}>No suggested providers</TableCell>
        )}
      </TableBody>
    </Table>
  );
};
