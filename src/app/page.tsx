"use client";
import { useState } from "react";
import LeftSheet from "@/components/ui/leftSheet";
import MidArea from "@/components/ui/midArea";
import Respuestas from "@/components/ui/Respuestas";
import Home from "./registerCard"; 

export default function Page() {
  const [showHome, setShowHome] = useState(true); 

  const handleResponse = (data) => {

  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-3">
      {showHome && (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-80 backdrop-blur-sm transition-opacity duration-300">
          <Home onButtonClick={() => setShowHome(false)} />
        </div>
      )}
    
      <div className={`flex flex-row flex-grow ${showHome ? "blur-sm" : "block"}`}>
        <div className="flex-shrink-0">
          <LeftSheet />
        </div>
        <div className="flex w-full w-screen ml-6 p-1">
          <Respuestas response={Response} />
        </div>
      </div>

      <div className={`flex flex-row w-full mt-auto p-3 ${showHome ? "hidden" : "block"}`}>
        <MidArea onResponse={handleResponse} />
      </div>
    </div>
  );
}
