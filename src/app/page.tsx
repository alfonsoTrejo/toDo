"use client";
import { useState } from "react";


import LeftSheet from "@/components/ui/leftSheet";
import MidArea from "@/components/ui/midArea";
import Respuestas from "@/components/ui/Respuestas";

export default function Page() {
  const [response, setResponse] = useState(null); // Estado para almacenar la respuesta

  const handleResponse = (data) => {
    setResponse(data); // Actualiza el estado con la respuesta recibida
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-3">
      {/* Sección Superior */}
      <div className="flex flex-row flex-grow">
        <div className="flex-shrink-0"> {/* Ancho fijo o proporcional para LeftSheet */}
          <LeftSheet />
        </div>
        <div className="flex w-full w-screen ml-6 p-1"> {/* Espacio restante para Respuestas */}
          <Respuestas response={response} />
        </div>
      </div>
      {/* Sección Inferior alineada al fondo */}
      <div className="flex flex-row w-full mt-auto p-3">
        <MidArea onResponse={handleResponse} />
      </div>
    </div>
  );
}