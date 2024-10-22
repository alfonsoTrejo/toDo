import { Button } from "@/components/ui/button"; // Importa el componente de Button de Shadcn

export default function LogoutButton() {
  
  const handleLogout = () => {
    // Eliminar el JWT del localStorage
    localStorage.removeItem("JWT");

    // Redirigir al usuario a la página de inicio (opcional) o recargar
    window.location.reload(); // Recargar la página para reflejar el estado de sesión
  };

  return (
    <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
      Cerrar Sesión
    </Button>
  );
}