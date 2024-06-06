import { getCollection, type CollectionEntry } from "astro:content";
import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "@vercel/og";

interface Props {
  params: { slug: string };
  props: { post: CollectionEntry<"work"> };
  request: Request;
}

const AUTHOR_NAME = "Alaeddine Douagi"
const AUTHOR_JOB_TITLE = "Web Developer"
const OG_BG_ROUTE = "/assets/og-bg-raw.jpg"
const AUTHOR_PIC_ROUTE = "/assets/portrait-square.jpg"

export async function GET({ props, request }: Props) {
  const { post } = props;

  // using custom font files
  const FontBold = fs.readFileSync(
    path.resolve("./public/assets/fonts/kaisei-tokumin-bold.ttf")
  );

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
    type: "div",
    props: {
      style: {
        position: "relative",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundImage: `url("${
          new URL(request.url).origin
      }${OG_BG_ROUTE}")`,
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              fontSize: 130,
              fontFamily: "Kaisei Tokumin",
              letterSpacing: "-0.05em",
              fontStyle: "normal",
              color: "white",
              lineHeight: "120px",
              whiteSpace: "pre-wrap",
              margin: "auto 190px",
            },
            children: post.data.title,
          },
        },
        {
          type: "div",
          props: {
            style: {
              postion: "absolute",
              bottom: "3rem",
              marginTop: "auto",
              display: "flex",
              width: "100%",
              height: "190px",
              padding: "0 190px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    position: "relative",
                    height: "160px",
                    width: "160px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    backgroundImage: `url("${
                      new URL(request.url).origin
                    }${AUTHOR_PIC_ROUTE}")`,
                    backgroundSize: "160px 160px",
                    borderRadius: "100%",
                  },
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    color: "white",
                    paddingLeft: 32,
                  },
                  children: [
                    {
                      type: "span",
                      props: {
                        style: {
                          fontSize: 54,
                        },
                        children: AUTHOR_NAME,
                      },
                    },
                    {
                      type: "span",
                      props: {
                        style: {
                          fontSize: 36,
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
  };

  return new ImageResponse(html, {
    width: 1920,
    height: 1080,
    fonts: [
      {
        name: "Kaisei Tokumin",
        data: FontBold.buffer,
        style: "normal",
      },
    ],
  });
}

// to generate an image for each blog posts in a collection
export async function getStaticPaths() {
  const blogPosts = await getCollection("work");
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}
