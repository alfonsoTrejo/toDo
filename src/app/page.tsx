"use client";
import { useState, useEffect } from "react";
import LeftSheet from "@/components/ui/leftSheet";
import MidArea from "@/components/ui/midArea";
import Respuestas from "@/components/ui/Respuestas";
import Home from "./registerCard"; // Tu componente de inicio de sesión

export default function Page() {
  const [showHome, setShowHome] = useState(true); // Controla si se muestra la pantalla de inicio
  const [response, setResponse] = useState(null); // Estado para almacenar la respuesta

  const handleResponse = (data) => {
    setResponse(data);// Lógica para manejar la respuesta (puedes personalizarla)
  };
  useEffect(() => { 
    const jwt = localStorage.getItem("JWT"); // Cambia "jwtToken" al nombre de tu clave
    if (jwt) {
      setShowHome(false); // Si el JWT está presente, oculta la pantalla de inicio
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-3">
      {/* Mostrar Home si showHome es true */}
      {showHome && (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-80 backdrop-blur-sm transition-opacity duration-300">
          <Home onButtonClick={() => setShowHome(false)} /> {/* Pasar setShowHome */}
        </div>
      )}

      {/* Contenedor principal con desenfoque si Home está visible */}
      <div className={`flex flex-row flex-grow transition-all duration-300 ${showHome ? "blur-sm" : ""}`}>
        <div className="flex-shrink-0">
          <LeftSheet />
        </div>
        <div className="flex w-full ml-6 p-1">
          <Respuestas response={response} />
        </div>
      </div>

      {/* Mostrar MidArea solo si Home no está visible */}
      <div className={`flex flex-row w-full mt-auto p-3 ${showHome ? "hidden" : "block"}`}>
        <MidArea onResponse={handleResponse} />
      </div>
    </div>
  );
}
