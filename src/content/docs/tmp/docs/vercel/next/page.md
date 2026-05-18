```tsx
export async function getStaticProps () {
  // `getStaticProps` 在服务端执行
  // const article = await getArticleFromAPI()
  return {
    props: {
      fallback: {
        // '/api/article': article
        '/api/article': {}
      }
    }
  }
}
```