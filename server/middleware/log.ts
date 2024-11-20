export default defineEventHandler((event: any) => {
  // api 가 아닌경우는 return
  if (!event.node.req.url.startsWith("/api/")) return;

  console.log(
    `[${new Date().toISOString()}] ${event.node.req.method} ${
      event.node.req.url
    }`
  );
});
