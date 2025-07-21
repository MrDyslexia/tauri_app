import { invoke } from "@tauri-apps/api/core"

export const useTauriCommands = () => {
  const toggleWindowVisibility = async () => {
    try {
      await invoke("toggle_window_visibility")
    } catch (error) {
      console.error("Error toggling window visibility:", error)
    }
  }

  const setWindowPosition = async (x: number, y: number) => {
    try {
      await invoke("set_window_position", { x, y })
    } catch (error) {
      console.error("Error setting window position:", error)
    }
  }

  const setAlwaysOnTop = async (onTop: boolean) => {
    try {
      await invoke("set_always_on_top", { onTop })
    } catch (error) {
      console.error("Error setting always on top:", error)
    }
  }

  const minimizeToTray = async () => {
    try {
      await invoke("minimize_to_tray")
    } catch (error) {
      console.error("Error minimizing to tray:", error)
    }
  }

  const getWindowPosition = async (): Promise<[number, number] | null> => {
    try {
      const position = (await invoke("get_window_position")) as [number, number]
      return position
    } catch (error) {
      console.error("Error getting window position:", error)
      return null
    }
  }

  return {
    toggleWindowVisibility,
    setWindowPosition,
    setAlwaysOnTop,
    minimizeToTray,
    getWindowPosition,
  }
}
