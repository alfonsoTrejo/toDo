"use client";
import { useState } from "react";
import AvatarMini from "@/components/ui/avatar"; // Componente de avatar en 3D
import Page from "./page"; // Tu página existente
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage: React.FC = () => {
  const [showMainPage, setShowMainPage] = useState(false); // Estado para controlar la vista
  const [showHomePage, setShowHomePage] = useState(true); // Estado para mostrar/ocultar el componente HomePage

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {showHomePage ? (
        <div className="relative flex flex-col items-center justify-center min-h-screen">
          {/* Avatar en 3D como página principal */}
          <div className="absolute inset-0">
            <AvatarMini /> {/* Aquí puedes ajustar el tamaño del avatar si es necesario */}
          </div>
          <button
            onClick={() => {
              setShowMainPage(true);
              setShowHomePage(false); // Oculta el HomePage
            }}
            className="absolute bottom-10 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 z-10"
          >
            Ir a la Página Principal
          </button>
        </div>
      ) : (
        <div className="flex-grow transition-all duration-300">
          <Page key="main-page" /> {/* Componente de tu página existente */}
          <button
            onClick={() => {
              setShowMainPage(false); // Oculta el Page
              setShowHomePage(true); // Muestra el HomePage
            }}
            className="absolute top-10 left-10 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Volver
          </button>
        </div>
      )}

      {/* ToastContainer para notificaciones */}
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
    </div>
  );
}

export default HomePage;
