<script setup lang="ts">
import { TransitionRoot } from '@headlessui/vue';

const props = defineProps({
  color: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  }
})

</script>
<template>
<TransitionRoot appear  :show="show" 
  as="template"
  enter="transform transition duration-[1000ms]"
  enter-from="opacity-0 scale-50"
  enter-to="opacity-100 scale-100"
  leave="transform transition duration-[1000ms]"
  leave-from="opacity-100 scale-100"
  leave-to="opacity-0 scale-50"
>
  <div  id="toast-simple" 
    :class="`absolute m-5 flex items-center w-full max-w-xs p-4 space-x-4 rounded-lg shadow  divide-x divide-gray-200 dark:divide-gray-700 space-x ${props.color}`" role="alert">
    <slot></slot>
    <div class="pl-4 text-sm font-normal">{{props.message}}</div>
  </div>
</TransitionRoot>
</template>
