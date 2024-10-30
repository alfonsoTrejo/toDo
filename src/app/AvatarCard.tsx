// AvatarCard.tsx
"use client";
import AvatarMini from "@/components/ui/avatar"; // Asegúrate de que la ruta sea correcta

const AvatarCard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-10 w-1/2 h-[600px] flex flex-col items-center"> {/* Aumentar tamaño de la tarjeta */}
      <h2 className="text-xl font-bold mb-4 text-center">Avatar</h2> {/* Encabezado */}
      <div className="flex justify-center w-full h-full mb-6"> {/* Contenedor del avatar */}
        <AvatarMini className="w-full h-full" /> {/* Pasar el tamaño del avatar */}
      </div>
      <button
        onClick={onClose}
        className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 w-full"
      >
        Cerrar
      </button>
    </div>
  );
};

export default AvatarCard;
