"use client";

import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Mensaje {
  id: string;
  message_text: string;
  audio_link: string;
  image_link: string;
  message_time: string;
}

export default function LeftSheet() {
  const [historial, setHistorial] = useState<Mensaje[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistorial = async () => {
      const token = localStorage.getItem("JWT");
      
      try {
        const response = await fetch("http://127.0.0.1:5000/historial", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.Error || "Error al obtener el historial");
        }

        const data = await response.json();
        setHistorial(data.Respuesta);
      } catch (err) {
        console.error("Error en la solicitud:", err);
        setError((err as Error).message);
      }
    };

    fetchHistorial();
  }, []);

  const truncateText = (text: string, length: number) => {
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  return (
    <Sheet>
      <SheetTrigger>{"<<"}</SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Historial de ensayo</SheetTitle>
          <SheetDescription>
            Aquí puedes ver el historial de tus ensayos generados.
          </SheetDescription>
        </SheetHeader>
        
        {error && <p className="text-red-500">{error}</p>}
        
        <div className="mt-4 min-h-[200px] max-h-[80vh] overflow-y-auto"> {/* Establece una altura mínima y máxima */}
          {historial.length > 0 ? (
            <ul>
              {historial.map((mensaje) => (
                <li key={mensaje.id} className="mb-2">
                  <p className="text-sm"><strong>Texto:</strong> {truncateText(mensaje.message_text, 50)}</p>
                  {mensaje.audio_link && (
                    <audio controls className="w-full">
                      <source src={mensaje.audio_link} type="audio/mpeg" />
                      El navegador no soporta este audio.
                    </audio>
                  )}
                  <p className="text-xs"><small>Tiempo: {mensaje.message_time}</small></p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay ensayos en el historial.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
