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
        name: "article",
        label: "Articles",
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
            name: "author",
            label: "Author",
            required: true,
          },
          {
            type: "string",
            name: "categories",
            label: "Category",
            required: true,
            options: ["Markets", "Fresh News"]
          },
          {
            type: "string",
            name: "description",
            label: "Description",
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
          }
        ],
      }
    ],
  },
});