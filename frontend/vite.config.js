import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import tailwindcss from "@tailwindcss/vite";
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), basicSsl({
        name: 'domain',
        domains: ['charterly.site'],
        /** optional, days before certificate expires */
        /** custom certification directory */
        certDir: './cert',
    }),],
    envPrefix: "PUBLIC_",
    server:
        {
            proxy:
                {
                    '/api':
                        {
                            target: 'http://16.192.213.81:5201',
                            changeOrigin: true,
                        }
                },
            allowedHosts:
            [
                "charterly.site"
            ]
        }

})
