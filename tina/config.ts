import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "master",
  clientId: "b9f2e0d0-e9d6-4479-81cc-7309d0e59d8f",
  token: "820c1c73d752a2a155967de7714f26c584963100",
  basePath: "/produce-post",
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
  // Add this search configuration
  search: {
    tina: {
      indexerToken: "eed4c56d12540697aee13fbaa42165599711772c", // Use your Search token from Tina dashboard
      stopwordLanguages: ["eng"]
    },
  }
})