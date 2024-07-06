import {defineConfig} from 'astro/config'
import vercel from '@astrojs/vercel/static'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https://aladouagi-com-v2.vercel.app',
  publicDir: './public',
  trailingSlash: 'never',
  output: 'static',
  adapter: vercel(),
  integrations: [tailwind()],
})
