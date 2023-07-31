<script setup lang="ts">
import axios from 'axios';


// configure acios default for this page
axios.defaults.baseURL = 'http://localhost:3333'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`


</script>

<template>
  <!-- Statistics: Simple with Action -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 m-5 mt-0">
    <!-- Card -->
    <div class="flex flex-col rounded-lg shadow-sm bg-white overflow-hidden dark:text-gray-100 dark:bg-gray-800">
      <!-- Body -->
      <div class="p-5 grow flex justify-between items-center">
        <dl class="space-y-1">
          <dt class="text-2xl font-bold">
            1046
          </dt>
          <dd class="uppercase font-semibold text-sm text-gray-500 tracking-wider dark:text-gray-400">
            Patients
          </dd>
        </dl>
        <div class="font-semibold inline-flex px-2 py-1 leading-4 items-center space-x-1 text-sm rounded-full text-emerald-800 bg-emerald-200">
          <svg class="hi-solid hi-arrow-circle-up inline-block w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"/></svg>
          <span>37.9%</span>
        </div>
      </div>
      <!-- END Body -->
  
      <!-- Action Link -->
      <a href="#" class="block p-3 font-medium text-sm text-center bg-gray-50 hover:bg-gray-100 hover:bg-opacity-75 active:bg-gray-50 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:bg-gray-900/50 dark:hover:text-blue-300 dark:hover:bg-gray-900/75 dark:active:bg-gray-900/50">
        View All Patients
      </a>
      <!-- END Action Link -->
    </div>
    <!-- END Card -->
  
    <!-- Card -->
    <div class="flex flex-col rounded-lg shadow-sm bg-white overflow-hidden dark:text-gray-100 dark:bg-gray-800">
      <!-- Body -->
      <div class="p-5 grow flex justify-between items-center">
        <dl class="space-y-1">
          <dt class="text-2xl font-bold">
            572
          </dt>
          <dd class="uppercase font-semibold text-sm text-gray-500 tracking-wider dark:text-gray-400">
            diseases
          </dd>
        </dl>
        <div class="font-semibold inline-flex px-2 py-1 leading-4 items-center space-x-1 text-sm rounded-full text-rose-800 bg-rose-200">
          <svg class="hi-solid hi-arrow-circle-down inline-block w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd"/></svg>
          <span>54,69%</span>
        </div>
      </div>
      <!-- END Body -->
  
      <!-- Action Link -->
      <a href="#" class="block p-3 font-medium text-sm text-center bg-gray-50 hover:bg-gray-100 hover:bg-opacity-75 active:bg-gray-50 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:bg-gray-900/50 dark:hover:text-blue-300 dark:hover:bg-gray-900/75 dark:active:bg-gray-900/50">
        View all Patients
      </a>
      <!-- END Action Link -->
    </div>
    <!-- END Card -->
  
    <!-- Card -->
    <div class="flex flex-col rounded-lg shadow-sm bg-white overflow-hidden dark:text-gray-100 dark:bg-gray-800">
      <!-- Body -->
      <div class="p-5 grow flex justify-between items-center">
        <dl class="space-y-1">
          <dt class="text-2xl font-bold">
            172
          </dt>
          <dd class="uppercase font-semibold text-sm text-gray-500 tracking-wider dark:text-gray-400">
            Appointments
          </dd>
        </dl>
        <div class="font-semibold inline-flex px-2 py-1 leading-4 items-center space-x-1 text-sm rounded-full text-emerald-800 bg-emerald-200">
          <svg class="hi-solid hi-arrow-circle-up inline-block w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"/></svg>
          <span>16.46%</span>
        </div>
      </div>
      <!-- END Body -->
  
      <!-- Action Link -->
      <a href="#" class="block p-3 font-medium text-sm text-center bg-gray-50 hover:bg-gray-100 hover:bg-opacity-75 active:bg-gray-50 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:bg-gray-900/50 dark:hover:text-blue-300 dark:hover:bg-gray-900/75 dark:active:bg-gray-900/50">
        Check Apppointments
      </a>
      <!-- END Action Link -->
    </div>
    <!-- END Card -->
  </div>
  <!-- END Statistics: Simple with Action -->
</template>