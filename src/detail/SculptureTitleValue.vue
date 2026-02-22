<script setup lang="ts">

defineProps<{
  title: string,
  value: string
}>()
</script>

<template>
  <div class="text-lg">
    <h2 class="font-bold">
      {{ title }}
    </h2>
    <div>
      {{ value }}
    </div>
  </div>
</template>