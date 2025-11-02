<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, A11y, Virtual, Zoom } from 'swiper/modules'
import type { Swiper as SwiperEvent } from 'swiper/types'
import { ref } from 'vue'
import type { Sculpture } from '@/useSculptureData'

const modules = [Navigation, Pagination, Scrollbar, A11y, Virtual, Zoom]

const props = defineProps<{
  sculpture: Sculpture
}>()

const emits = defineEmits<{
  (e: 'back-out'): void
}>()


const videoRefs = ref<HTMLVideoElement[]>([])

const slideChanging = (ev: SwiperEvent) => {
  videoRefs.value.forEach((video) => {
    if (!video) return
    video.pause()
    video.currentTime = 0
  })
  const activeVideo = videoRefs.value.find(
    // @ts-expect-error wrong lib in config
    (ref) => ref.src.split('/').at(-1) === props.sculpture.media[ev.activeIndex]?.slice(1),
  )
  if (!activeVideo) return
  activeVideo.play()
}

const VIDEO_MIME_TYPES = ['mov', 'mp4']
const isVideo = (src: string) => VIDEO_MIME_TYPES.some((mimeType) => src.endsWith(mimeType))

const handleTouchEnd = (swiper: SwiperEvent) => {
  const atFirstSlide = swiper.activeIndex === 0
  const swipeRight = swiper.touches.diff > 100
  if (atFirstSlide && swipeRight) emits('back-out')
}

</script>

<template>
  <swiper @slide-change="slideChanging" @touch-end="handleTouchEnd" :modules="modules" :slides-per-view="1"
    :pagination="{ clickable: true }" :zoom="true" virtual>
    <swiper-slide v-for="src in sculpture.media" :key="src">
      <div :class="['w-full h-screen', !isVideo(src) && 'swiper-zoom-container']">
        <video v-if="isVideo(src)" :src="src" ref="videoRefs" class="object-contain w-full h-full" webkit-playsinline
          playsinline loop />
        <img v-else :src="src" class="object-contain w-full h-full" />
      </div>
    </swiper-slide>
  </swiper>
</template>