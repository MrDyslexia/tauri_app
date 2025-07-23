use tauri::{
    menu::{Menu, MenuItem, PredefinedMenuItem},
    tray::{MouseButton, TrayIconBuilder, TrayIconEvent, TrayIcon},
    Manager, WebviewWindow, WindowEvent, AppHandle,
};
use std::sync::Mutex;

// Estado global para controlar la visibilidad y el tray
static WINDOW_STATE: Mutex<bool> = Mutex::new(true);
static TRAY_ICON: Mutex<Option<TrayIcon>> = Mutex::new(None);

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
#[tauri::command]
fn resize_window_to_content(window: WebviewWindow, width: u32, height: u32) -> Result<(), String> {
    window.set_size(tauri::Size::Logical(tauri::LogicalSize { width: width as f64, height: height as f64 }))
        .map_err(|e| e.to_string())
}
#[tauri::command]
fn toggle_window_visibility(window: WebviewWindow) -> Result<(), String> {
    let mut visible = WINDOW_STATE.lock().unwrap();
    
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
fn set_window_position(window: WebviewWindow, x: i32, y: i32) -> Result<(), String> {
    use tauri::LogicalPosition;
    window.set_position(LogicalPosition::new(x, y)).map_err(|e| e.to_string())
}

#[tauri::command]
fn set_always_on_top(window: WebviewWindow, on_top: bool) -> Result<(), String> {
    window.set_always_on_top(on_top).map_err(|e| e.to_string())
}

#[tauri::command]
fn minimize_window(window: WebviewWindow) -> Result<(), String> {
    // Minimizar normal - aparece en barra de tareas
    window.set_skip_taskbar(false).map_err(|e| e.to_string())?;
    window.minimize().map_err(|e| e.to_string())?;
    
    // Actualizar estado
    let mut visible = WINDOW_STATE.lock().unwrap();
    *visible = false;
    
    Ok(())
}

// MEJORADO: Función para limpiar el tray icon existente
fn clear_tray_icon() {
    let mut tray_guard = TRAY_ICON.lock().unwrap();
    if let Some(tray) = tray_guard.take() {
        // Intentar remover el tray icon
        drop(tray); // Esto debería limpiar el tray icon
    }
}

// Función para crear el tray icon
fn create_tray_icon(app: &AppHandle) -> Result<TrayIcon, Box<dyn std::error::Error>> {
    // IMPORTANTE: Limpiar cualquier tray icon existente primero
    clear_tray_icon();
    
    let show_item = MenuItem::with_id(app, "show", "📱 Mostrar Asistente", true, None::<&str>)?;
    let separator = PredefinedMenuItem::separator(app)?;
    let quit_item = MenuItem::with_id(app, "quit", "❌ Salir", true, None::<&str>)?;
    
    let tray_menu = Menu::with_items(app, &[&show_item, &separator, &quit_item])?;
    
    let tray = TrayIconBuilder::new()
        .menu(&tray_menu)
        .tooltip("AI Assistant - Clic para mostrar")
        .icon(app.default_window_icon().unwrap().clone())
        .on_tray_icon_event({
            let app_handle = app.clone();
            move |_tray, event| {
                if let TrayIconEvent::Click { button: MouseButton::Left, .. } = event {
                    if let Some(window) = app_handle.get_webview_window("main") {
                        // Mostrar ventana y remover del tray
                        let _ = show_window_from_tray(&window, &app_handle);
                    }
                }
            }
        })
        .on_menu_event({
            let app_handle = app.clone();
            move |_app, event| {
                match event.id.as_ref() {
                    "show" => {
                        if let Some(window) = app_handle.get_webview_window("main") {
                            let _ = show_window_from_tray(&window, &app_handle);
                        }
                    }
                    "quit" => {
                        // Limpiar tray antes de salir
                        clear_tray_icon();
                        app_handle.exit(0);
                    }
                    _ => {}
                }
            }
        })
        .build(app)?;
    
    Ok(tray)
}

// CORREGIDO: Función para mostrar ventana desde el tray
fn show_window_from_tray(window: &WebviewWindow, _app: &AppHandle) -> Result<(), String> {
    // 1. PRIMERO: Limpiar el tray icon
    clear_tray_icon();
    
    // 2. Mostrar ventana en la barra de tareas
    window.set_skip_taskbar(false).map_err(|e| e.to_string())?;
    window.show().map_err(|e| e.to_string())?;
    window.unminimize().map_err(|e| e.to_string())?;
    window.set_focus().map_err(|e| e.to_string())?;
    
    // 3. Actualizar estado
    let mut visible = WINDOW_STATE.lock().unwrap();
    *visible = true;
    
    println!("Window restored from tray, tray icon should be removed");
    
    Ok(())
}

// MEJORADO: Función para ocultar en el system tray
#[tauri::command]
fn hide_to_tray(window: WebviewWindow, app: AppHandle) -> Result<(), String> {
    println!("Hiding window to tray...");
    
    // 1. Limpiar cualquier tray icon existente primero
    clear_tray_icon();
    
    // 2. Ocultar de la barra de tareas
    window.set_skip_taskbar(true).map_err(|e| e.to_string())?;
    window.hide().map_err(|e| e.to_string())?;
    
    // 3. Crear el icono del tray
    match create_tray_icon(&app) {
        Ok(tray) => {
            let mut tray_guard = TRAY_ICON.lock().unwrap();
            *tray_guard = Some(tray);
            println!("Tray icon created successfully");
        }
        Err(e) => {
            eprintln!("Error creating tray icon: {}", e);
            return Err(format!("Failed to create tray icon: {}", e));
        }
    }
    
    // 4. Actualizar estado
    let mut visible = WINDOW_STATE.lock().unwrap();
    *visible = false;
    
    Ok(())
}

#[tauri::command]
fn get_window_position(window: WebviewWindow) -> Result<(i32, i32), String> {
    let position = window.outer_position().map_err(|e| e.to_string())?;
    Ok((position.x, position.y))
}

#[tauri::command]
fn quit_app(app: tauri::AppHandle) -> Result<(), String> {
    println!("Quitting application...");
    // Limpiar el tray antes de salir
    clear_tray_icon();
    app.exit(0);
    Ok(())
}

// NUEVO: Comando para verificar el estado del tray
#[tauri::command]
fn get_tray_status() -> bool {
    let tray_guard = TRAY_ICON.lock().unwrap();
    tray_guard.is_some()
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
            get_window_position,
            get_tray_status,
            quit_app,
            resize_window_to_content
        ])
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            
            // Configurar la ventana
            let _ = window.set_always_on_top(true);
            // Inicialmente visible en la barra de tareas
            let _ = window.set_skip_taskbar(false);
            
            // Manejar eventos de la ventana
            let window_clone = window.clone();
            let app_handle = app.handle().clone();
            
            window.on_window_event(move |event| {
                match event {
                    WindowEvent::CloseRequested { api, .. } => {
                        println!("Close requested, hiding to tray...");
                        // Al cerrar, ocultar en el tray
                        api.prevent_close();
                        
                        // Limpiar tray existente
                        clear_tray_icon();
                        
                        // Ocultar de la barra de tareas
                        let _ = window_clone.set_skip_taskbar(true);
                        let _ = window_clone.hide();
                        
                        // Crear icono del tray
                        if let Ok(tray) = create_tray_icon(&app_handle) {
                            let mut tray_guard = TRAY_ICON.lock().unwrap();
                            *tray_guard = Some(tray);
                            println!("Tray icon created on close");
                        }
                        
                        // Actualizar estado
                        let mut visible = WINDOW_STATE.lock().unwrap();
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
