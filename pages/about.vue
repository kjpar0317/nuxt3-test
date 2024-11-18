<template>
  <p>This page will be displayed at the /about route.</p>
  <InputText placeholder="Overriden" class="!bg-slate-600" />
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "empty", // 'empty' 레이아웃 사용
});
</script>
