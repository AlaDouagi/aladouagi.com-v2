import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import AutoImport from 'astro-auto-import'
import tailwindcss from '@tailwindcss/vite'
import qwikdev from '@qwikdev/astro'

// https://astro.build/config
export default defineConfig({
  site: 'https://aladouagi-com-v2.vercel.app',
  publicDir: './public',
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
  integrations: [
    qwikdev(),
    AutoImport({
      imports: [
        {
          './src/components/stackblitz-embed.tsx': [['default', 'StackBlitz']],
        },
      ],
    }),
    mdx(),
  ],
})
