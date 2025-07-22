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

  const minimizeWindow = async () => {
    try {
      await invoke("minimize_window")
    } catch (error) {
      console.error("Error minimizing window:", error)
    }
  }

  const hideToTray = async () => {
    try {
      await invoke("hide_to_tray")
      console.log("Window hidden to tray successfully")
    } catch (error) {
      console.error("Error hiding to tray:", error)
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

  const getTrayStatus = async (): Promise<boolean> => {
    try {
      const status = (await invoke("get_tray_status")) as boolean
      return status
    } catch (error) {
      console.error("Error getting tray status:", error)
      return false
    }
  }

  const quitApp = async () => {
    try {
      await invoke("quit_app")
    } catch (error) {
      console.error("Error quitting app:", error)
    }
  }

  return {
    toggleWindowVisibility,
    setWindowPosition,
    setAlwaysOnTop,
    minimizeWindow,
    hideToTray,
    getWindowPosition,
    getTrayStatus,
    quitApp,
  }
}
