import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


// https://vitejs.dev/config/

/**
 * We are using proxy to forward the requests to the backend server.
 * 
 * This is because in production the may be on different servers.
 * Also, right now the backend address is localhost:5000 but later it
 * may change. We don't want to change the address in the frontend
 * code for all of the requests. So, we use proxy to forward the
 * requests to the backend server.
 * 
 * @see https://www.udemy.com/course/node-with-react-fullstack-web-development/learn/lecture/7605038#search
 * @see https://vitejs.dev/config/#server-proxy
 */
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:5000',
        secure: false
      }
    }
  },
})
