import { useEffect, useState } from "react";
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define la interfaz para los datos de Invoice
interface Invoice {
  name: string;
  materia: string;
  estado: boolean;
  date: string; // Puedes ajustar el tipo de la fecha según tus necesidades
}

export default function TableDemo() {
  // Define el estado con el tipo adecuado
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    // Obtener las facturas de localStorage
    const storedInvoices = localStorage.getItem("tasks");
    if (storedInvoices) {
      setInvoices(JSON.parse(storedInvoices));
    }
  }, []);

  const handleDelete = (index: number) => {
    const updatedInvoices = [...invoices];
    updatedInvoices.splice(index, 1); // Eliminar el elemento en el índice específico
    setInvoices(updatedInvoices); // Actualizar el estado

    // Actualizar localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedInvoices));
  };

  const toggleEstado = (index: number) => {
    const updatedInvoices = [...invoices];
    updatedInvoices[index].estado = !updatedInvoices[index].estado; // Alternar el valor de estado
    setInvoices(updatedInvoices); // Actualizar el estado

    // Actualizar localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedInvoices));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Tareas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Una lista de tus tareas recientes.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Tarea</TableHead>
                <TableHead>Materia</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Fecha</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.length > 0 ? (
                invoices.map((invoice, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{invoice.name}</TableCell>
                    <TableCell>{invoice.materia}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => toggleEstado(index)}
                        className={`px-2 py-1 rounded min-w-[75px] ${
                          invoice.estado ? "bg-green-500" : "bg-red-500"
                        } text-white`}
                      >
                        {invoice.estado ? "Completado" : "Pendiente"}
                      </button>
                    </TableCell>
                    <TableCell className="text-right">{invoice.date}</TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-500 hover:underline"
                      >
                        Eliminar
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No hay tareas disponibles.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
