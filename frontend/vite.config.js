import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    envPrefix: "PUBLIC_",
    server:
        {
            proxy:
                {
                    '/api/test':
                        {
                            target: 'http://16.192.213.81:5201',
                            changeOrigin: true,
                        }
                }
        }

})
