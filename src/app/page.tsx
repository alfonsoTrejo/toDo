"use client";

import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Minimize2, Maximize2 } from 'lucide-react';
import Spinner from "@/app/spinner";

const LeftSheet = lazy(() => import("@/components/ui/leftSheet"));
const Respuestas = lazy(() => import("@/components/ui/Respuestas"));
const Home = lazy(() => import("./registerCard"));
const AvatarMini = lazy(() => import("@/components/ui/avatar"));
const MidArea = lazy(() => import("@/components/ui/midArea"));
const Cerrar = lazy(() => import("@/components/ui/cerrar"));
const File = lazy(() => import("@/components/ui/files"));

interface ResponseData {
  Respuesta_Geminai: string;
  Audio_URL: string | null;
}

interface Mensaje {
  message_text: string;
  audio_link?: string;
}

export default function Page() {
  const [showHome, setShowHome] = useState(true);
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const avatarRef = useRef<any>(null);

  useEffect(() => {
    const jwt = localStorage.getItem("JWT");

    if (!jwt) {
      console.log("No se encontró el token JWT en localStorage.");
      setIsLoading(false);
      return;
    }

    const verificarToken = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/verificar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          setShowHome(false); // Usuario verificado, ocultar algo si es necesario
        } else {
          console.log("Error al verificar el token:", await response.json());
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      } finally {
        setIsLoading(false);
      }
    };

    verificarToken();
  }, []);

  const handleSelectMessage = (mensaje: Mensaje) => {
    setResponse({
      Respuesta_Geminai: mensaje.message_text,
      Audio_URL: mensaje.audio_link || null,
    });
  };

  const handleSendEssay = (essay: string) => {
    setIsAnimating(true);
    setIsLoading(true);
    setIsMinimized(true);
    avatarRef.current?.startAnimation();
  };

  const handleResponse = (responseData: ResponseData) => {
    setResponse(responseData);
    setIsAnimating(false);
    setIsLoading(false);
    avatarRef.current?.stopAnimation();
  };

  const toggleMinimize = () => setIsMinimized(!isMinimized);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-100">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-3 relative">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full h-2/3 mb-4 relative">
          <Suspense fallback={null}>
            <AvatarMini ref={avatarRef} className="w-full h-full" isAnimating={isAnimating} isLoading={isLoading} />
          </Suspense>
        </div>
      </div>

      <div 
        className={`fixed inset-0 z-20 bg-white bg-opacity-95 overflow-auto transition-all duration-150 ease-in-out ${
          isMinimized ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex flex-row flex-grow">
            <div className="flex-shrink-0">
              <Suspense fallback={null}>
                <LeftSheet onSelectMessage={handleSelectMessage} />
              </Suspense>
            </div>
            <div className="flex w-full ml-6 p-1">
              <Suspense fallback={null}>
                <Respuestas response={response} />
              </Suspense>
            </div>
          </div>

          <div className="flex flex-row w-full mt-auto p-3">
            <Suspense fallback={null}>
              <MidArea onResponse={handleResponse} onSendEssay={handleSendEssay} />
            </Suspense>
          </div>

          <div className="flex flex-row w-full mt-auto p-3 justify-between">
            <Suspense fallback={null}>
              <Cerrar />
            </Suspense>
            <Suspense fallback={null}>
              <File />
            </Suspense>
          </div>

          <button
            onClick={toggleMinimize}
            className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
          >
            <Minimize2 size={24} />
          </button>
        </div>
      </div>

      {isMinimized && (
        <div className="fixed top-4 right-4 z-30">
          <button
            onClick={toggleMinimize}
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
          >
            <Maximize2 size={24} />
          </button>
        </div>
      )}

      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />

      {showHome && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-80 backdrop-blur-sm transition-opacity duration-300">
          <Suspense fallback={null}>
            <Home onButtonClick={() => setShowHome(false)} />
          </Suspense>
        </div>
      )}
    </div>
  );
}