import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { svgrComponent } from 'vite-plugin-svgr-component'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    return {
        plugins: [svgrComponent(), react()],

        root: 'src',
        build: {
            outDir: '../dist'
        },
        server: {
            port: 8080,
        },

        define: {
            "__API_URL__": "'http://jeteo.newbies.pl:8080'",
            "__DEV__": command === "build" ? "'production'" : "'development'",
        },
    }
})
