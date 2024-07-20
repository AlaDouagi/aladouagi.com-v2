import {getCollection, type CollectionEntry} from 'astro:content'
import fs from 'node:fs'
import path from 'node:path'
import {ImageResponse} from '@vercel/og'

interface Props {
  params: {slug: string}
  props: {post: CollectionEntry<'blog'>}
  request: Request
}

const AUTHOR_NAME = 'Alaeddine Douagi'
const AUTHOR_JOB_TITLE = 'Web Developer'
const OG_BG_ROUTE = '/assets/og-bg-raw.jpg'
const AUTHOR_PIC_ROUTE = '/assets/portrait-square.jpg'

export async function GET({props, request}: Props) {
  const {post} = props

  const OG_BG_URL = new URL(OG_BG_ROUTE, request.url).href
  const AUTHOR_PIC_URL = new URL(AUTHOR_PIC_ROUTE, request.url).href

  // using custom font files
  const FontBold = fs.readFileSync(
    path.resolve('./public/assets/fonts/kaisei-tokumin-bold.ttf'),
  )

  // post cover with Image is pretty tricky for dev and build phase
  //   const postCover = fs.readFileSync(
  //     process.env.NODE_ENV === "development"
  //       ? path.resolve(
  //           post.data.cover.src.replace(/\?.*/, "").replace("/@fs", "")
  //         )
  //       : path.resolve(post.data.cover.src.replace("/", "dist/"))
  //   );

  // Astro doesn't support tsx endpoints so usign React-element objects
  const html = {
    type: 'div',
    props: {
      style: {
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundImage: `url("${OG_BG_URL}")`,
        backgroundSize: "960px 540px"
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              fontSize: 65,
              fontFamily: 'Kaisei Tokumin',
              letterSpacing: '-0.05em',
              fontStyle: 'normal',
              color: 'white',
              lineHeight: '60px',
              whiteSpace: 'pre-wrap',
              margin: 'auto 95px',
            },
            children: post.data.title,
          },
        },
        {
          type: 'div',
          props: {
            style: {
              postion: 'absolute',
              bottom: '1.5rem',
              marginTop: 'auto',
              display: 'flex',
              width: '100%',
              height: '95px',
              padding: '0 95px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    position: 'relative',
                    height: '80px',
                    width: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    backgroundImage: `url("${AUTHOR_PIC_URL}")`,
                    backgroundSize: '80px 80px',
                    borderRadius: '100%',
                  },
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    color: 'white',
                    paddingLeft: 16,
                  },
                  children: [
                    {
                      type: 'span',
                      props: {
                        style: {
                          fontSize: 27,
                        },
                        children: AUTHOR_NAME,
                      },
                    },
                    {
                      type: 'span',
                      props: {
                        style: {
                          fontSize: 18,
                        },
                        children: AUTHOR_JOB_TITLE,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  }

  return new ImageResponse(html, {
    width: 960,
    height: 540,
    fonts: [
      {
        name: 'Kaisei Tokumin',
        data: FontBold.buffer,
        style: 'normal',
      },
    ],
  })
}

// to generate an image for each blog posts in a collection
export async function getStaticPaths() {
  const blogPosts = await getCollection('blog')
  return blogPosts.map((post) => ({
    params: {slug: post.slug},
    props: {post},
  }))
}
