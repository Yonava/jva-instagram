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
import type { SculptureData } from './data'

const props = defineProps<{
  sculpture: SculptureData
}>()

const modules = [Navigation, Pagination, Scrollbar, A11y]

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
        :style="{ viewTransitionName: sculpture.id }"
      >
        <swiper-slide v-for="src in sculpture.media" :key="src">
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
