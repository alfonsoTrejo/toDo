import React from "react";
import Logout from "@/components/ui/logout"; // Asegúrate de que la ruta sea la correcta

export default function LogoutButton() {
  const handleLogout = () => {
    // Eliminar el JWT del localStorage
    localStorage.removeItem("JWT");

    // Redirigir al usuario a la página de inicio (opcional) o recargar
    window.location.reload(); // Recargar la página para reflejar el estado de sesión
  };

  return (
    <Logout onClick={handleLogout} /> // Usa tu componente Logout
  );
}
