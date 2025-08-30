// C:\xampp\htdocs\lintasinn\lintas\vite.config.js

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            // Tentukan file input utama untuk CSS dan JavaScript
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            // Aktifkan hot-reload saat file blade diubah
            refresh: true,
        }),
        // Tambahkan plugin untuk mendukung React (JSX)
        react(),
        tailwindcss(),
    ],
});