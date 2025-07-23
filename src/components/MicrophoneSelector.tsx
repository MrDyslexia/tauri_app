// src/components/MicrophoneSelector.tsx
import { useEffect, useState } from "react";

export default function MicrophoneSelector() {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const loadDevices = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true }); // Solicitar permiso
        const allDevices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = allDevices.filter((d) => d.kind === "audioinput");
        setDevices(audioInputs);
      } catch (err) {
        console.error("Error al acceder a micrófonos:", err);
      }
    };

    loadDevices();
  }, []);

  const handleSelect = (deviceId: string, label: string) => {
    setSelected(deviceId);
    console.log("✅ Micrófono seleccionado:", label, deviceId);
    // Aquí puedes emitir evento o reinicializar el reconocimiento
  };

  return (
    <div className="text-xs text-gray-300 space-y-1">
      <label className="block font-semibold">Micrófono:</label>
      {devices.length === 0 ? (
        <p className="text-red-400">No disponible</p>
      ) : (
        <select
          className="bg-black/50 text-white px-2 py-1 rounded w-full"
          onChange={(e) => {
            const [id, label] = e.target.value.split("|");
            handleSelect(id, label);
          }}
        >
          <option value="">Selecciona...</option>
          {devices.map((d) => (
            <option key={d.deviceId} value={`${d.deviceId}|${d.label}`}>
              {d.label || "Micrófono sin nombre"}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}