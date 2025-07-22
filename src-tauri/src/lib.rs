use tauri::{
    menu::{Menu, MenuItem, PredefinedMenuItem},
    tray::{MouseButton, TrayIconBuilder, TrayIconEvent},
    Manager, Window, WindowEvent,
};
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
fn minimize_window(window: Window) -> Result<(), String> {
    window.minimize().map_err(|e| e.to_string())?;
    Ok(())
}

// Función para ocultar en el system tray
#[tauri::command]
fn hide_to_tray(window: Window) -> Result<(), String> {
    window.hide().map_err(|e| e.to_string())?;
    let mut visible = WINDOW_VISIBLE.lock().unwrap();
    *visible = false;
    Ok(())
}

// Función para mostrar desde el tray
#[tauri::command]
fn show_from_tray(window: Window) -> Result<(), String> {
    window.show().map_err(|e| e.to_string())?;
    window.set_focus().map_err(|e| e.to_string())?;
    let mut visible = WINDOW_VISIBLE.lock().unwrap();
    *visible = true;
    Ok(())
}

#[tauri::command]
fn get_window_position(window: Window) -> Result<(i32, i32), String> {
    let position = window.outer_position().map_err(|e| e.to_string())?;
    Ok((position.x, position.y))
}

#[tauri::command]
fn quit_app(app: tauri::AppHandle) -> Result<(), String> {
    app.exit(0);
    Ok(())
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
            minimize_window,
            hide_to_tray,
            show_from_tray,
            get_window_position,
            quit_app
        ])
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            
            // Configurar la ventana
            let _ = window.set_always_on_top(true);
            
            // Crear el menú del system tray - CORREGIDO
            let show_item = MenuItem::with_id(app, "show", "Mostrar Asistente", true, None::<&str>)?;
            let hide_item = MenuItem::with_id(app, "hide", "Ocultar", true, None::<&str>)?;
            let separator = PredefinedMenuItem::separator(app)?;
            let quit_item = MenuItem::with_id(app, "quit", "Salir", true, None::<&str>)?;
            
            let tray_menu = Menu::with_items(app, &[&show_item, &hide_item, &separator, &quit_item])?;
            
            // Crear el system tray
            let _tray = TrayIconBuilder::new()
                .menu(&tray_menu)
                .tooltip("AI Assistant")
                .icon(app.default_window_icon().unwrap().clone())
                .on_tray_icon_event(|tray, event| {
                    let app = tray.app_handle();
                    
                    match event {
                        TrayIconEvent::Click {
                            button: MouseButton::Left,
                            ..
                        } => {
                            // Clic izquierdo: mostrar/ocultar ventana
                            if let Some(window) = app.get_webview_window("main") {
                                let visible = WINDOW_VISIBLE.lock().unwrap();
                                if *visible {
                                    let _ = window.hide();
                                } else {
                                    let _ = window.show();
                                    let _ = window.set_focus();
                                }
                                drop(visible);
                                let mut visible = WINDOW_VISIBLE.lock().unwrap();
                                *visible = !*visible;
                            }
                        }
                        _ => {}
                    }
                })
                .on_menu_event(|app, event| {
                    match event.id.as_ref() {
                        "show" => {
                            if let Some(window) = app.get_webview_window("main") {
                                let _ = window.show();
                                let _ = window.set_focus();
                                let mut visible = WINDOW_VISIBLE.lock().unwrap();
                                *visible = true;
                            }
                        }
                        "hide" => {
                            if let Some(window) = app.get_webview_window("main") {
                                let _ = window.hide();
                                let mut visible = WINDOW_VISIBLE.lock().unwrap();
                                *visible = false;
                            }
                        }
                        "quit" => {
                            app.exit(0);
                        }
                        _ => {}
                    }
                })
                .build(app)?;
            
            // Manejar eventos de la ventana
            let window_clone = window.clone();
            window.on_window_event(move |event| {
                match event {
                    WindowEvent::CloseRequested { api, .. } => {
                        // Al cerrar, ocultar en el tray en lugar de cerrar
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
        .expect("error while running tauri application")
}
