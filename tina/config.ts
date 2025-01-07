import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "master",  // Hardcode to master since that's what we use
  clientId: "27d193c6-15ae-4535-9e34-94b111ebdc9a",
  token: "5a16c5ff8a36420814629fbe69d7bd928df9ad09",
  build: {
    outputFolder: "docs/admin",
    publicFolder: "docs",
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
  }
})