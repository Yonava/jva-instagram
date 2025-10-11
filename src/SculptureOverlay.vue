<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { ref } from 'vue'
import type { Swiper as SwiperEvent } from 'swiper/types'

const props = defineProps<{
  color: string
}>()

const sources = [
  'https://julianvossandreae.com/wp-content/gallery/currentinventory/438_Contrapposto.jpg',
  'https://julianvossandreae.com/wp-content/gallery/jvaportfolio/02_2002_LargeFirAlphaHelix_c.jpg',
  'https://julianvossandreae.com/wp-content/gallery/currentinventory/158_Quantum_Nefertiti_5.jpg',
  '/chess.mov',
  'https://julianvossandreae.com/wp-content/gallery/jvaportfolio/379_Superwoman2.jpg',
]

const modules = [Navigation, Pagination, Scrollbar, A11y]

const videoRefs = ref<HTMLVideoElement[]>([])

const slideChanging = (ev: SwiperEvent) => {
  videoRefs.value.forEach((video) => {
    if (!video) return
    video.pause()
    video.currentTime = 0
  })
  const activeVideo = videoRefs.value.find(
    (ref) => ref.src.split('/').at(-1) === sources[ev.activeIndex]?.slice(1),
  )
  if (!activeVideo) return
  activeVideo.play()
}

const VIDEO_MIME_TYPES = ['mov', 'mp4']
const isVideo = (src: string) => VIDEO_MIME_TYPES.some((mimeType) => src.endsWith(mimeType))
</script>

<template>
  <div class="absolute w-full h-full bg-gray-800 flex flex-col items-center">
    <div class="h-full w-full">
      <swiper
        @slide-change="slideChanging"
        :modules="modules"
        :slides-per-view="1"
        :pagination="{ clickable: true }"
        :zoom="true"
        ref="swiperRef"
      >
        <swiper-slide v-for="src in sources" :key="src">
          <div class="w-full h-[600px] bg-gray-900">
            <video
              v-if="isVideo(src)"
              :src="src"
              ref="videoRefs"
              class="object-contain w-full h-full"
              webkit-playsinline
              playsinline
              loop
            />
            <img v-else :src="src" class="object-contain w-full h-full" />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
