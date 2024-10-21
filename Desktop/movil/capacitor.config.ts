import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tuapp.movil',  // Cambia el ID del paquete si necesitas algo personalizado
  appName: 'MovilApp',        // Asegúrate de que el nombre sea el correcto
  webDir: 'www',              // El directorio web por defecto generado tras 'ionic build'
  bundledWebRuntime: false    // Si estás usando runtime nativo de Capacitor, puedes ajustar esto
};

export default config;