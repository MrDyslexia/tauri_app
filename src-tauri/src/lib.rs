use tauri::{Manager, Window, WindowEvent};
use std::sync::Mutex;

// Estado global para controlar la visibilidad
static WINDOW_VISIBLE: Mutex<bool> = Mutex::new(true);

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn toggle_window_visibility(window: Window) -> Result<(), String> {
    let mut visible = WINDOW_VISIBLE.lock().unwrap();
    
    if *visible {
        window.hide().map_err(|e| e.to_string())?;
        *visible = false;
    } else {
        window.show().map_err(|e| e.to_string())?;
        window.set_focus().map_err(|e| e.to_string())?;
        *visible = true;
    }
    
    Ok(())
}

#[tauri::command]
fn set_window_position(window: Window, x: i32, y: i32) -> Result<(), String> {
    use tauri::LogicalPosition;
    window.set_position(LogicalPosition::new(x, y)).map_err(|e| e.to_string())
}

#[tauri::command]
fn set_always_on_top(window: Window, on_top: bool) -> Result<(), String> {
    window.set_always_on_top(on_top).map_err(|e| e.to_string())
}

#[tauri::command]
fn minimize_to_tray(window: Window) -> Result<(), String> {
    window.hide().map_err(|e| e.to_string())?;
    let mut visible = WINDOW_VISIBLE.lock().unwrap();
    *visible = false;
    Ok(())
}

#[tauri::command]
fn get_window_position(window: Window) -> Result<(i32, i32), String> {
    let position = window.outer_position().map_err(|e| e.to_string())?;
    Ok((position.x, position.y))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            toggle_window_visibility,
            set_window_position,
            set_always_on_top,
            minimize_to_tray,
            get_window_position
        ])
        .setup(|app| {
            // CORREGIDO: Usar get_webview_window en lugar de get_window
            let window = app.get_webview_window("main").unwrap();
            
            // Configurar la ventana para comportarse como overlay
            let _ = window.set_always_on_top(true);
            
            // Manejar eventos de la ventana
            let window_clone = window.clone();
            window.on_window_event(move |event| {
                match event {
                    WindowEvent::CloseRequested { api, .. } => {
                        // Prevenir el cierre y minimizar a la bandeja del sistema
                        api.prevent_close();
                        let _ = window_clone.hide();
                        let mut visible = WINDOW_VISIBLE.lock().unwrap();
                        *visible = false;
                    }
                    _ => {}
                }
            });
            
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
