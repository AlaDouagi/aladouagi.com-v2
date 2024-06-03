import { getCollection, type CollectionEntry } from "astro:content";
import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "@vercel/og";

interface Props {
  params: { slug: string };
  props: { post: CollectionEntry<"work"> };
  request: Request;
}

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
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundImage: `url("${
          new URL(request.url).origin
        }/assets/og-bg.png")`,
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              marginLeft: 190,
              marginRight: 190,
              display: "flex",
              fontSize: 130,
              fontFamily: "Kaisei Tokumin",
              letterSpacing: "-0.05em",
              fontStyle: "normal",
              color: "white",
              lineHeight: "120px",
              whiteSpace: "pre-wrap",
            },
            children: post.data.title,
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
