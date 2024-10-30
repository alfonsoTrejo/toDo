"use client";
import { useState, useEffect } from "react";
import LeftSheet from "@/components/ui/leftSheet";
import MidArea from "@/components/ui/midArea";
import Respuestas from "@/components/ui/Respuestas";
import Cerrar from "@/components/ui/cerrar";
import File from "@/components/ui/files";
import Home from "./registerCard"; // Tu componente de inicio de sesión
import AvatarCard from "./AvatarCard"; // Nuevo componente para la tarjeta con el avatar
import Spinner from "./spinner"; // Asegúrate de que la ruta sea correcta
import { ToastContainer } from "react-toastify"; // Importa ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importa los estilos de react-toastify

export default function Page() {
  const [showHome, setShowHome] = useState(true); // Controla si se muestra la pantalla de inicio
  const [response, setResponse] = useState(null); // Estado para almacenar la respuesta
  const [loading, setLoading] = useState(true); // Estado de carga
  const [showAvatarCard, setShowAvatarCard] = useState(false); // Controla si se muestra la tarjeta del avatar

  const handleResponse = (data) => {
    setResponse(data); // Lógica para manejar la respuesta (puedes personalizarla)
  };

  useEffect(() => {
    const jwt = localStorage.getItem("JWT"); // Cambia "jwtToken" al nombre de tu clave
    if (jwt) {
      setShowHome(false); // Si el JWT está presente, oculta la pantalla de inicio
    }
    setLoading(false); // Finaliza la carga después de verificar el JWT
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-3">
      {/* Mostrar spinner mientras se verifica el JWT */}
      {loading ? (
        <div className="fixed inset-0 z-20 flex justify-center items-center bg-black bg-opacity-80">
          <Spinner />
        </div>
      ) : (
        <>
          {/* Mostrar Home si showHome es true */}
          {showHome && (
            <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-80 backdrop-blur-sm transition-opacity duration-300">
              <Home onButtonClick={() => setShowHome(false)} /> {/* Pasar setShowHome */}
            </div>
          )}

          {/* Tarjeta del Avatar */}
          {showAvatarCard && (
            <div className="fixed inset-0 z-20 flex justify-center items-center bg-black bg-opacity-80 backdrop-blur-sm">
              <AvatarCard onClose={() => setShowAvatarCard(false)} />
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

          {/* Sección para Cerrar y File, usando justify-between */}
          <div className={`flex flex-row w-full mt-auto p-3 justify-between ${showHome ? "hidden" : "flex"}`}>
            <Cerrar />
            <File />
          </div>

          {/* Botón para mostrar la tarjeta del avatar */}
          <div className={`flex justify-center mt-4 ${!showHome && "block"}`}>
            <button
              onClick={() => setShowAvatarCard(true)} // Muestra la tarjeta del avatar
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Mostrar Avatar
            </button>
          </div>

          {/* Agrega el ToastContainer aquí */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
          />
        </>
      )}
    </div>
  );
}
