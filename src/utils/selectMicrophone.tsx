const selectMicrophone = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioInputs = devices.filter((d) => d.kind === "audioinput");

    if (audioInputs.length === 0) {
      alert("No se encontraron micrófonos.");
      return;
    }

    const labels = audioInputs.map((d, i) => `${i + 1}. ${d.label || "Micrófono sin nombre"}`);
    const selected = prompt(
      "Selecciona un micrófono:\n\n" + labels.join("\n") + "\n\nIngresa el número:"
    );

    const index = parseInt(selected || "") - 1;
    if (isNaN(index) || !audioInputs[index]) {
      alert("Selección inválida.");
      return;
    }

    const selectedDevice = audioInputs[index];
    console.log("✅ Micrófono seleccionado:", selectedDevice.label);

    // Reiniciar reconocimiento con el nuevo micrófono
    // Aquí puedes pasar el deviceId al hook si lo necesitas
  } catch (err) {
    console.error("Error al acceder a dispositivos:", err);
    alert("No se pudo acceder a los dispositivos de audio.");
  }
};
export { selectMicrophone };