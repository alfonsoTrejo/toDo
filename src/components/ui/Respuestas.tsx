"use client";

import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Respuestas({ response }) {
  const audioRef = useRef<HTMLAudioElement | null>(null); // Referencia al elemento de audio

  useEffect(() => {
    // Si cambia la URL del audio, reproducir el nuevo audio desde el inicio
    if (response?.Audio_URL && audioRef.current) {
      audioRef.current.pause(); // Pausar el audio actual si hay uno
      audioRef.current.load();  // Cargar el nuevo audio
      audioRef.current.play().catch(error => {
        console.error("Error al reproducir el audio:", error);
      });
    }
  }, [response?.Audio_URL]); // Ejecuta este efecto cuando cambia la URL del audio

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-lg font-bold">Respuestas</h2>
      <div>
        {response?.Respuesta_Geminai ? (
          <ReactMarkdown>{response.Respuesta_Geminai}</ReactMarkdown>
        ) : (
          "No hay respuestas aún"
        )}
      </div>
      
      {response?.Audio_URL && (
        <div className="p-4 bg-white rounded-lg shadow-md w-full mt-4">
          <audio ref={audioRef} controls className="w-full">
            <source src={response.Audio_URL} type="audio/mpeg" />
            El navegador no soporta este audio.
          </audio>
        </div>
      )}
    </div>
  );
}
