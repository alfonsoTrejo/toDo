"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function midArea({ onResponse }) {
  const [text, setText] = useState(""); // Estado para gestionar el texto del Textarea

  // Función para manejar el clic en el botón
  const handleClick = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/texto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }), // Enviar el texto en formato JSON
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Texto enviado exitosamente", responseData);
        if (onResponse) {
          onResponse(responseData); // Llama a la función pasada como prop con la respuesta
        }
      } else {
        console.error("Error al enviar el texto", response.statusText);
          }
    } catch (error) {
      console.error("Error al enviar el texto", error);
    }
  };

  return (
    <div className="grid w-full h-full gap-7  ">
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
