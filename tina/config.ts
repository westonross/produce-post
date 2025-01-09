import { defineConfig } from "tinacms";

const branch = "master";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    publicFolder: "static",
    outputFolder: "admin",
  },
  schema: {
    collections: [
      {
        name: "article",    // Changed from "post" to "article"
        label: "Articles",  // Updated label as well
        path: "content/articles",
        format: "md",
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            required: true,
            isTitle: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "categories",  // Changed from category to categories to match your content
            label: "Category",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          }
        ],
      },
    ],
  },
});