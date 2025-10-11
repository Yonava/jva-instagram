<script setup lang="ts">
defineProps<{
  color: string
}>()
</script>

<template>
  <div class="absolute w-full h-full bg-gray-800 flex flex-col items-center pt-6">
    <div :class="[color, 'w-80', 'h-80']" :style="{ viewTransitionName: color }"></div>
  </div>
</template>
