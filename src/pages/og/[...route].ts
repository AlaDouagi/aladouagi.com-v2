import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";

// Assuming you have a collection named "blog"
const blogs = await getCollection("work");

// Transform the collection into an object
const pages = Object.fromEntries(
  blogs.map(({ id, slug, data }) => [id, { data, slug }])
);

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (path, page) => ({
    title: page.title,
    description: page.description,
    bgImage: {
      path: "./public/og-bg.png",
    },
  }),
});
