import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@honkhonk/vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svgr(), react()],
    root: 'src',

    // apis
    define: {
        "__API_URL__": "'http://jeteo.newbies.pl:8080'"
    },

    server: {
        proxy: {
            '/oauth': {
                target: 'http://jeteo.newbies.pl:8080/',
            },
            '/api': {
                target: 'http://jeteo.newbies.pl:8080/',
            }
        }
    }
})
