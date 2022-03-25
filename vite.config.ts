import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { svgrComponent } from 'vite-plugin-svgr-component'

// https://vitejs.dev/config/
export default defineConfig(({command, /* mode */}) => {
    return {
        plugins: [svgrComponent(), react()],

        root: 'src',
        build: {
            outDir: '../dist',
            sourcemap: true,
        },
        server: {
            port: 8080,
            proxy: {
                '/graphql': {
                    target: "http://jeteo.newbies.pl:8080"
                }
            }
        },

        define: {
            "__RESTAPI_URI__": "'http://jeteo.newbies.pl:8080'",
            "__GRAPHQL_URI__": command === "serve" ? "'http://localhost:8080'" : "'http://jeteo.newbies.pl:8080'",
            "__DEV__": command === "serve",
        },
    }
})
