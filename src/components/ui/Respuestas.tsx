"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function Respuestas({ response }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-lg font-bold">Respuestas</h2>
      <div>
        {response && response.Respuesta_Geminai ? (
          <ReactMarkdown>{response.Respuesta_Geminai}</ReactMarkdown>
        ) : (
          "No hay respuestas aún"
        )}
      </div>
      
      <div>
      {response && response.Audio_URL ? (
          <div className="p-4 bg-white rounded-lg shadow-md w-full mt-4">
            <audio controls autoplay className="w-full">
            <source src={response.Audio_URL} type="audio/mpeg" />
            El navegador no soporta este audio.
          </audio>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
