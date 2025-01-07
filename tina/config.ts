import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "master",
  clientId: "b9f2e0d0-e9d6-4479-81cc-7309d0e59d8f",  // Your client ID from dashboard
  token: "15ee35ebaea6034ced37dd9f98ae45dcaa37ea39",  // Your GitHub Action token
  basePath: "/produce-post",  // For GitHub Pages
  build: {
    outputFolder: "docs/admin",
    publicFolder: "docs",
  },
  media: {
    tina: {
      mediaRoot: "assets/img",
      publicFolder: "assets",
    },
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
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
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
})
