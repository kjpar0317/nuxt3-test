<script setup lang="ts">
import { reactive } from "vue";
import { useFetch, useAsyncData } from "nuxt/app";

type MovieList = {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
};

let list = reactive<MovieList>({
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
});

// const { data: results } = await useAsyncData("movie", () =>
//   $fetch(
//     "https://api.themoviedb.org/3/movie/popular?api_key=22478a88b22311a5249584b2c23d6a3d"
//   )
// );
const { data: results } = await useFetch("/api/movie", {
  server: true, // SSR에서 실행
  cache: "no-cache",
  headers: {
    "Cache-Control": "no-cache",
  },
});

if (results) {
  list = results as any;
}

function getSeverity(rate: number) {
  if (rate > 8) return "info";
  else if (rate > 6) return "success";
  else if (rate > 4) return "warn";
  else return "danger";
}
</script>

<template>
  <DataView data-key="list" :value="list.results" paginator :rows="5">
    <template #list="slotProps">
      <div class="flex flex-col">
        <div v-for="(item, index) in slotProps.items" :key="index">
          <div
            class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
            :class="{
              'border-t border-surface-200 dark:border-surface-700':
                index !== 0,
            }"
          >
            <div class="md:w-40 relative">
              <img
                class="block xl:block mx-auto rounded w-full"
                :src="`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`"
                :alt="item.title"
              />
              <div
                class="absolute bg-black/70 rounded-border"
                style="left: 4px; top: 4px"
              >
                <Tag
                  :value="item.vote_average"
                  :severity="getSeverity(item.vote_average)"
                ></Tag>
              </div>
            </div>
            <div
              class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6"
            >
              <div
                class="flex flex-row md:flex-col justify-between items-start gap-2"
              >
                <div>
                  <span
                    class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                    >{{ item.title }}</span
                  >
                  <div class="text-lg font-medium mt-2">
                    {{ item.overview }}
                  </div>
                </div>
                <div class="bg-surface-100 p-1" style="border-radius: 30px">
                  <div
                    class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                    style="
                      border-radius: 30px;
                      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                        0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                    "
                  >
                    <span class="text-surface-900 font-medium text-sm">{{
                      item.rating
                    }}</span>
                    <i class="pi pi-star-fill text-yellow-500"></i>
                  </div>
                </div>
              </div>
              <div class="flex flex-col md:items-end gap-8">
                <span class="text-md font-semibold">{{
                  item.release_date
                }}</span>
                <!-- <div class="flex flex-row-reverse md:flex-row gap-2">
                  <Button icon="pi pi-heart" outlined></Button>
                  <Button
                    icon="pi pi-shopping-cart"
                    label="Buy Now"
                    :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                    class="flex-auto md:flex-initial whitespace-nowrap"
                  ></Button>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>
