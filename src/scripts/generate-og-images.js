import {parse} from 'node:path'
import {readdir, writeFile} from 'node:fs/promises'
import {waitUntilUsedOnHost} from 'tcp-port-used'

const BLOG_ROUTE = 'blog'
const BLOG_POST_DIRECTORY_PATH = `../content/${BLOG_ROUTE}`
const OG_IMAGES_OUTPUT_PATH = '../../public/assets/blog-ogs'
const LOCAL_APP_PORT = 4321
const FgYellow = '\x1b[33m'
const FgMagenta = '\x1b[35m'

async function downloadFile(url, outputPath) {
  try {
    const response = await fetch(url)
    const bfr = await response.arrayBuffer()
    await writeFile(outputPath, Buffer.from(bfr))
    console.log(FgMagenta, `OG image written here: ${outputPath}`)
  } catch (err) {
    console.error(err)
  }
}

async function getBlogPostsSlugs() {
  return await readdir(new URL(BLOG_POST_DIRECTORY_PATH, import.meta.url)).then(
    (files) => files.map((f) => parse(f).name),
  )
}

async function generateOgImages() {
  console.log(FgYellow, 'Pinging for OG Images. . .')
  const slugs = await getBlogPostsSlugs()

  for (const slug of slugs) {
    await downloadFile(
      `http://localhost:4321/${BLOG_ROUTE}/${slug}/og.png`,
      new URL(`${OG_IMAGES_OUTPUT_PATH}/${slug}.png`, import.meta.url),
    )
  }
}

console.log(FgYellow, 'Waiting for app to start')
await waitUntilUsedOnHost(LOCAL_APP_PORT, 'localhost', 500, 99999999)
await generateOgImages()
