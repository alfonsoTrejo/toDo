"use client";

import Formulario from "@/components/ui/formulario";
import Tabla from "@/components/ui/tabla";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PaginaMain() {
  return (
          <Tabs defaultValue="crear" className= "h-full w-full">
            <TabsList className="flex w-full h-full bg-gray-200 border-t border-gray-300">
              <TabsTrigger
                value="tareas"
                className="flex-1 flex items-center justify-center flex-col"
              >
                <img src="/portapapeles.png" alt="Tareas Icon" className="w-6 h-6 mb-1" />
                Tareas
              </TabsTrigger>
              <TabsTrigger
                value="crear"
                className="flex-1 flex items-center justify-center flex-col"
              >
                <img src="/agregar.png" alt="Crear Icon" className="w-6 h-6 mb-1" />
                Crear
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tareas">
                <Tabla />
              </TabsContent>
              <TabsContent value="crear">
                <Formulario />
              </TabsContent>
          </Tabs>
  );
}
