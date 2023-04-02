/// <reference types="vite-plugin-svgr/client" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({command, /* mode */}) => {
    return {
        plugins: [
            svgr({
                exportAsDefault: true,
            }),
            react()
        ],
        root: 'src',
        build: {
            outDir: '../dist',
            sourcemap: true,
        },
        server: {
            port: 8080,
        },
        define: {
            "__RESTAPI_URI__": "'https://jeteo.newbies.pl'",
            "__GRAPHQL_URI__": "'https://jeteo.newbies.pl'",
            "__DEV__": command === "serve",
        },
    }
});
