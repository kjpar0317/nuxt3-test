export default defineEventHandler(async (event) => {
  const res: any = await $fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=22478a88b22311a5249584b2c23d6a3d"
  );

  return {
    results: res?.results ?? [],
  };
});
