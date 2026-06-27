import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Custom Vite plugin to handle Vercel serverless functions locally
function vercelApiProxy() {
  return {
    name: 'vercel-api-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/chat' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          req.on('end', async () => {
            try {
              req.body = JSON.parse(body);
              // Dynamic import of the Vercel function
              const handler = await import('./api/chat.js');
              await handler.default(req, res);
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  process.env.OPENROUTER_API_KEY = env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;
  process.env.GROQ_API_KEY = env.GROQ_API_KEY || process.env.GROQ_API_KEY;
  process.env.MISTRAL_API_KEY = env.MISTRAL_API_KEY || process.env.MISTRAL_API_KEY;
  process.env.NVIDIA_API_KEY = env.NVIDIA_API_KEY || process.env.NVIDIA_API_KEY;

  return {
    plugins: [
      react(),
      tailwindcss(),
      vercelApiProxy(),
    ],
  }
})
