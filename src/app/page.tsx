"use client";

import { useState, useEffect } from "react";
import LeftSheet from "@/components/ui/leftSheet";
import Respuestas from "@/components/ui/Respuestas";
import Spinner from "./spinner";
import Home from "./registerCard";
import AvatarCard from "./AvatarCard";
import MidArea from "@/components/ui/midArea";
import Cerrar from "@/components/ui/cerrar";
import File from "@/components/ui/files";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ResponseData {
  Respuesta_Geminai: string;
  Audio_URL: string | null;
}

export default function Page() {
  const [showHome, setShowHome] = useState(true);
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAvatarCard, setShowAvatarCard] = useState(false);

  const handleSelectMessage = (mensaje: Mensaje) => {
    setResponse({
      Respuesta_Geminai: mensaje.message_text,
      Audio_URL: mensaje.audio_link || null,
    });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("JWT");
    if (jwt) {
      setShowHome(false);
    }
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-3">
      {loading ? (
        <div className="fixed inset-0 z-20 flex justify-center items-center bg-black bg-opacity-80">
          <Spinner />
        </div>
      ) : (
        <>
          {showHome && (
            <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-80 backdrop-blur-sm transition-opacity duration-300">
              <Home onButtonClick={() => setShowHome(false)} />
            </div>
          )}

          <div className={`flex flex-row flex-grow transition-all duration-300 ${showHome ? "blur-sm" : ""}`}>
            <div className="flex-shrink-0">
              <LeftSheet onSelectMessage={handleSelectMessage} />
            </div>
            <div className="flex w-full ml-6 p-1">
              <Respuestas response={response} />
            </div>
          </div>

          <div className={`flex flex-row w-full mt-auto p-3 ${showHome ? "hidden" : "block"}`}>
            <MidArea onResponse={setResponse} />
          </div>

          <div className={`flex flex-row w-full mt-auto p-3 justify-between ${showHome ? "hidden" : "flex"}`}>
            <Cerrar />
            <File />
          </div>

          {!showHome && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowAvatarCard(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Mostrar Avatar
              </button>
            </div>
          )}

          {showAvatarCard && (
            <div className="fixed inset-0 z-20 flex justify-center items-center bg-black bg-opacity-80">
              <AvatarCard onClose={() => setShowAvatarCard(false)} />
            </div>
          )}

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
