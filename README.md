
## Understanding Directory structure

#### Pages
Following guidelines of NextJs V13.1, this project follow pages directory approach. All of the routes have their own pages directory and being rendered from the server using `getServerSideProps` function.

## Useful Links

[Staging](https://draft-uat.herokuapp.com/)
[Production](https://draft-prod.herokuapp.com/)
[User Profile](https://draft-uat.herokuapp.com/pro/barry-allen)
[Organization Profile](https://draft-uat.herokuapp.com/org/tiktok)
[Article](https://draft-uat.herokuapp.com/article/view/8483)
## Promote to Production

`main` branch is deployed on staging environment.
`production` branch is deployed on prod environment.

## Todo

Move auth logic to server [Commit] (https://app.reviewee.it/projects/commit?repoFullName=founderandlightning%2Fdraft-react&repoId=550017767&repoName=draft-react&sha=53505f7fa1da28a302d51023afe946a2f213b794&uuid=fb7c84c0-302c-11ee-83ff-5123bd6aace2)
[Commit 2] (https://app.reviewee.it/projects/commit?repoFullName=founderandlightning%2Fdraft-react&repoId=550017767&repoName=draft-react&sha=650a9d76116f02aa9d5d6733b174f1434ad78844&uuid=9f61d6c0-306a-11ee-9ef7-270482fa974c)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/[token].tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
