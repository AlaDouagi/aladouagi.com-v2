import {defineConfig} from 'astro/config'
import vercel from '@astrojs/vercel/static'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'
import AutoImport from 'astro-auto-import'

import qwikdev from '@qwikdev/astro'

// https://astro.build/config
export default defineConfig({
  site: 'https://aladouagi-com-v2.vercel.app',
  publicDir: './public',
  trailingSlash: 'never',
  output: 'static',
  adapter: vercel(),
  integrations: [
    tailwind(),
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
