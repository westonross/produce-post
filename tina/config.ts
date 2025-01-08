import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "master";

export default defineConfig({
  branch,

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "assets/img",
      publicFolder: "static",
    },
  },
  schema: {
    collections: [
      {
        name: "article",
        label: "Articles",
        path: "content/articles",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "string",
            name: "categories",
            label: "Category",
            required: true,
          },
          {
            type: "string",
            name: "image",
            label: "Image Path",
          },
          {
            type: "string",
            name: "image_caption",
            label: "Image Caption",
          },
          {
            type: "string",
            name: "image_credit",
            label: "Image Credit",
          },
          {
            type: "datetime",
            name: "image_date",
            label: "Image Date",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});