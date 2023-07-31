<script setup lang="ts">
import { ref } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
const categories = {
    'Administrator':[],
    'Doctor':[],
    'Patient':[],
}
</script>
<template>
<div class="w-full max-w-md px-2 py-16 sm:px-0">
    <TabGroup>
    <TabList class="flex space-x-1 rounded-xl p-1">
        <Tab
        v-for="category in Object.keys(categories)"
        as="template"
        :key="category"
        v-slot="{ selected }"
        >
        <button
            :class="[
            'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            ]"
        >
            {{ category }}
        </button>
        </Tab>
    </TabList>
    </TabGroup>
</div>
</template>
  