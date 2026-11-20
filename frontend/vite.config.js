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
            cors: {
                origin: 'https://charterly.site',
            },
            proxy:
                {
                    '^/api/*':
                        {
                            target: 'https://charterly.site',
                            changeOrigin: true,
                            secure: false,
                        }
                },
            allowedHosts:
            [
                "charterly.site"
            ]
        }

})
