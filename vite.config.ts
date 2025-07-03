import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), mkcert()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    define: {
        'process.env': process.env,
    },
    server: {
        port: 3000,
    },
});
