import VirtualAssistantSphere from "@/components/VirtualAssistantSphere";
export default function IndexPage() {
  const handleMenuAction = (action: string) => {
    switch (action) {
      case 'Nueva tarea':
        window.location.href = '/home';
        break;
      case 'Estado del sistema':
        console.log('Estado del sistema seleccionado');
        break;
      case 'Configuración':
        console.log('Configuración seleccionada');
        break;
      default:
        console.log('Acción no reconocida:', action);
        break;
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen bg-red-900">
      <VirtualAssistantSphere onMenuAction={handleMenuAction} />
    </div>
  );
}