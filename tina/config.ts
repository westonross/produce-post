import { defineConfig } from "tinacms";

const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "master";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,  // Changed to use the correct env variable name
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      publicFolder: "static",
      mediaRoot: "img"
    },
  },
  admin: {
    auth: {
      useLocalAuth: process.env.NODE_ENV === 'development',
    },
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_TOKEN,
      stopwordLanguages: ['eng']
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
