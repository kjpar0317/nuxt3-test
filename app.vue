<template>
  <div>
    <NuxtLayout v-slot="{ pageProps }">
      <NuxtPage v-bind="pageProps" />
    </NuxtLayout>
  </div>
</template>

<script lang="ts">
import "@/assets/styles/tailwind.css";
</script>
