import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
const csp = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' http://localhost:3000", 
  "base-uri 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "object-src 'none'",
  "frame-src 'none'",
  "upgrade-insecure-requests",
].join("; ");
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
    },
  },
  preview: {
    headers: {
      "Content-Security-Policy": csp,
    },
  },
});
