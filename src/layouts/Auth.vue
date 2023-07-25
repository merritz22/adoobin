<script setup lang="ts">
import FooterSmall from '@/components/Footers/FooterSmall.vue'
import registerBg2 from '@/assets/img/register_bg_2.png'
</script>

<template>
  <div>
    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <div
          class=" bg-slate-900 top-0 w-full h-full  bg-full"
          >
          <!-- :style="`background-image: url('${registerBg2}');`" -->
      </div>
      <RouterView />
      <FooterSmall absolute />
      </section>
    </main>
  </div>
</template>
