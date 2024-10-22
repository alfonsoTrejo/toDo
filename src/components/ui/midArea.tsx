"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify"; // Importa toast

export default function MidArea({ onResponse }) {
  const [text, setText] = useState(""); // Estado para gestionar el texto del Textarea

  // Función para manejar el clic en el botón
  const formatDate = (dateString) => {
    // Suponiendo que el formato que estás recibiendo es 'YYYYMMDD-HHmmss'
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    const hour = dateString.slice(9, 11);
    const minute = dateString.slice(11, 13);
    const second = dateString.slice(13, 15);
  
    // Formato adecuado para PostgreSQL o un formato compatible ISO
    return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
  };
  
  const handleClick = async () => {
    const JWT = localStorage.getItem("JWT");
  
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
      // Verificar si el error es una instancia de Error
      if (error instanceof Error) {
        console.error("Error al enviar el texto:", error.message);
        toast.error(`Error: ${error.message}`);
      } else {
        console.error("Error desconocido", error);
        toast.error("Error desconocido");
      }
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
        <Button onClick={handleClick}>Enviar tu ensayo</Button>
      </div>
    </div>
  );
}
