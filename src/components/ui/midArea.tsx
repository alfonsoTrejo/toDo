"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import Spinner from "@/app/spinner"; // Asegúrate de importar tu Spinner

export default function MidArea({ onResponse }) {
  const [text, setText] = useState(""); // Estado para gestionar el texto del Textarea
  const [loading, setLoading] = useState(false); // Estado para gestionar el estado de carga

  const handleClick = async () => {
    const JWT = localStorage.getItem("JWT");
    setLoading(true); // Activar el estado de carga
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/texto`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log("Texto enviado exitosamente", responseData);
        if (onResponse) {
          onResponse(responseData);
        }
      } else {
        const errorMessage = await response.text();
        console.error("Error al enviar el texto", response.statusText, errorMessage);
        toast.error(`Error: ${errorMessage || response.statusText}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al enviar el texto:", error.message);
        toast.error(`Error: ${error.message}`);
      } else {
        console.error("Error desconocido", error);
        toast.error("Error desconocido");
      }
    } finally {
      setLoading(false); // Desactivar el estado de carga al final de la operación
      setText("");
    }
  };
  
  return (
    <div className="grid w-full h-full gap-7">
      <div className="shadow-md rounded-lg">
        <Textarea
          placeholder="Escribe aquí tu ensayo"
          value={text}
          onChange={(e) => setText(e.target.value)} // Actualiza el estado cuando cambia el texto
        />
      </div>
      <div className="mx-auto shadow-md rounded-lg">
        {/* Mostrar Spinner si está cargando, caso contrario, mostrar el botón */}
        {loading ? (
          <Spinner /> // Mostrar el spinner si está cargando
        ) : (
          <Button onClick={handleClick} disabled={loading}>
            Enviar tu ensayo
          </Button>
        )}
      </div>
    </div>
  );
}
