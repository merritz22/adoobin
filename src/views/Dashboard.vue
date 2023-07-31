<script setup lang="ts">
import { ref, onBeforeMount } from "vue";

// Headless UI, for more info and examples you can check out https://github.com/tailwindlabs/headlessui
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import AdminFlex from '@/components/Flex/AdminFlex.vue'
import Boxes from '@/components/Boxes/Boxes.vue'
import Toast from '@/components/Toasts/ToastIcon.vue'
import axios from "axios";
import router from "@/router";

const mobileNavOpen = ref(false);
let user = ''

const doctors = ref(0)
const notifs = ref(0)
const success = ref('')
const show_success = ref(false)
const error = ref('')
const show_error = ref(false)
const warning = ref('')
const show_warning = ref(false)

const settings = false

// configure acios default for this page
axios.defaults.baseURL = 'http://localhost:3333'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

// if the session is active or not
const check_session =async () => {
  axios.get('/')
  .then(response =>{
    // console.log(response);
    success.value = `Welcome to ADOOBIN ${user.patient.name} !`
    show_success.value = !show_success.value
    setTimeout(() => {
      show_success.value = !show_success.value
    }, 2000);
  })
  .catch(error =>{
    console.log(error.response);
    warning.value = `Attention you're session expired !`
      router.push({
        path: '/auth/login',
        query: {msg: btoa('your session has expired')}
      })
  })
}

// await check_session()

const patient_doctors =async () => {
  // 
  await axios.get(`/patient/${user.patient.id}`)
  .then(response =>{
    doctors.value = response.data[0].doctors.length
  })
  .catch(error =>{
    console.log(error.response);
  })
}

const notifications_count =async () => {
  await axios.get(`/notifications`)
  .then(response =>{
    notifs.value = response.data.length
  })
  .catch(error =>{
    console.log(error.response);
  })
}

const logout =async () => {
  await axios.post('/logout')
  .then(response =>{
    // console.log(response);
    router.push({
      path: '/auth/login',
      query: {msg: btoa('logged out')}
    })
  })
  .catch(error =>{
    console.log(error.response);
  })
}

onBeforeMount(async () => {
  // getting the stored user in localstorage
  user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    await patient_doctors()
    await notifications_count()
  }
})
</script>

<template>
  <div class="block">
      <Toast color="bg-red-400 text-red-700" :message="error" :show="show_error"
       v-if="show_error">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    </Toast>
    <Toast color="bg-green-400 text-green-700"  :message="success" :show="show_success"
     v-if="show_success">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    </Toast>
    <Toast color="bg-yellow-300 text-yellow-700"  :message="warning" :show="show_warning"
     v-if="show_warning">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    </Toast>
  </div>
  <!-- Page Container -->
  <div id="page-container" class="flex flex-col mx-auto w-full min-h-screen min-w-[320px] bg-gray-100 dark:text-gray-100 dark:bg-gray-900">
    <!-- Page Header -->
    <header id="page-header" class="flex flex-none items-center bg-white shadow-sm z-1 dark:bg-gray-800">
      <div class="container xl:max-w-7xl mx-auto px-4 lg:px-8">
        <div class="flex justify-between py-4">
          <!-- Left Section -->
          <div class="flex items-center">
            <!-- Logo -->
            <a href="/" class="group inline-flex items-center space-x-2 font-bold text-lg tracking-wide text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300">
              <svg class="hi-mini hi-cube-transparent inline-block w-5 h-5 text-blue-600 transition group-hover:scale-110 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M9.638 1.093a.75.75 0 01.724 0l2 1.104a.75.75 0 11-.724 1.313L10 2.607l-1.638.903a.75.75 0 11-.724-1.313l2-1.104zM5.403 4.287a.75.75 0 01-.295 1.019l-.805.444.805.444a.75.75 0 01-.724 1.314L3.5 7.02v.73a.75.75 0 01-1.5 0v-2a.75.75 0 01.388-.657l1.996-1.1a.75.75 0 011.019.294zm9.194 0a.75.75 0 011.02-.295l1.995 1.101A.75.75 0 0118 5.75v2a.75.75 0 01-1.5 0v-.73l-.884.488a.75.75 0 11-.724-1.314l.806-.444-.806-.444a.75.75 0 01-.295-1.02zM7.343 8.284a.75.75 0 011.02-.294L10 8.893l1.638-.903a.75.75 0 11.724 1.313l-1.612.89v1.557a.75.75 0 01-1.5 0v-1.557l-1.612-.89a.75.75 0 01-.295-1.019zM2.75 11.5a.75.75 0 01.75.75v1.557l1.608.887a.75.75 0 01-.724 1.314l-1.996-1.101A.75.75 0 012 14.25v-2a.75.75 0 01.75-.75zm14.5 0a.75.75 0 01.75.75v2a.75.75 0 01-.388.657l-1.996 1.1a.75.75 0 11-.724-1.313l1.608-.887V12.25a.75.75 0 01.75-.75zm-7.25 4a.75.75 0 01.75.75v.73l.888-.49a.75.75 0 01.724 1.313l-2 1.104a.75.75 0 01-.724 0l-2-1.104a.75.75 0 11.724-1.313l.888.49v-.73a.75.75 0 01.75-.75z" clip-rule="evenodd"/></svg>
              <span>ADOOBIN</span>
            </a>
            <!-- END Logo -->
          </div>
          <!-- END Left Section -->

          <!-- Right Section -->
          <div class="flex items-center space-x-2 lg:space-x-5">
            <!-- Desktop Navigation -->
            <nav class="hidden lg:flex items-center space-x-2">
              <label class="group text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded-lg text-blue-600 border border-blue-100 bg-blue-50 dark:text-white dark:bg-gray-700 dark:border-transparent">
                <svg class="hi-mini hi-home inline-block w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd"/></svg>
                <span>Home</span>
              </label>
              <label class="group text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-800 border border-transparent hover:text-blue-600 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700 dark:active:border-gray-600">
                <svg class="hi-mini hi-briefcase inline-block w-5 h-5 opacity-25 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 016 4.193V3.75zm6.5 0v.325a41.622 41.622 0 00-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25zM10 10a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V11a1 1 0 00-1-1H10z" clip-rule="evenodd"/><path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 01-9.274 0C3.985 17.585 3 16.402 3 15.055z"/></svg>
                <span>Health</span>
              </label>
              <label class="group text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-800 border border-transparent hover:text-blue-600 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700 dark:active:border-gray-600">
                <svg class="hi-mini hi-users inline-block w-5 h-5 opacity-25 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z"/></svg>
                <span>Appointments</span>
              </label>
            </nav>
            <!-- END Desktop Navigation -->

            <!-- User Dropdown -->
            <Menu as="div" class="relative inline-block">
              <!-- Dropdown Toggle Button -->
              <MenuButton
                class="inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-3 py-2 leading-5 text-sm border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
              >
                <span>{{
                    user == null ? 'user_name' : user.patient.name
                }}</span>
                <svg class="hi-mini hi-chevron-down inline-block w-5 h-5 opacity-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/></svg>
              </MenuButton>
              <!-- END Dropdown Toggle Button -->

              <!-- Dropdown -->
              <Transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="opacity-0 scale-90"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-90"
              >
                <MenuItems class="absolute right-0 origin-top-right z-10 mt-2 w-48 shadow-xl rounded-lg dark:shadow-gray-900 focus:outline-none">
                  <div class="bg-white ring-1 ring-black ring-opacity-5 rounded-lg divide-y divide-gray-100 dark:bg-gray-800 dark:divide-gray-700 dark:ring-gray-700">
                    <div class="p-2.5 space-y-1">
                      <MenuItem v-slot="{ active }">
                        <label
                          class="group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg border border-transparent"
                          :class="{
                            'text-blue-800 bg-blue-50 dark:text-white dark:bg-gray-700/75 dark:border-transparent': active,
                            'text-gray-700 hover:text-blue-800 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700/75 dark:active:border-gray-600': !active,
                          }"
                        >
                          <svg class="flex-none hi-mini hi-inbox inline-block w-5 h-5 opacity-25 group-hover:opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M1 11.27c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 015.273 3h9.454a2.75 2.75 0 012.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 01-2 2H3a2 2 0 01-2-2v-3.73zm3.068-5.852A1.25 1.25 0 015.273 4.5h9.454a1.25 1.25 0 011.205.918l1.523 5.52c.006.02.01.041.015.062H14a1 1 0 00-.86.49l-.606 1.02a1 1 0 01-.86.49H8.236a1 1 0 01-.894-.553l-.448-.894A1 1 0 006 11H2.53l.015-.062 1.523-5.52z" clip-rule="evenodd"/></svg>
                          <span class="grow">Doctors</span>
                          <div class="font-semibold inline-flex px-1.5 py-0.5 leading-4 text-xs rounded-full border border-blue-200 text-blue-700 bg-blue-100 dark:text-blue-50 dark:bg-blue-700 dark:border-blue-700">
                            {{ doctors }}
                          </div>
                        </label>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <label
                          class="group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg border border-transparent"
                          :class="{
                            'text-blue-800 bg-blue-50 dark:text-white dark:bg-gray-700/75 dark:border-transparent': active,
                            'text-gray-700 hover:text-blue-800 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700/75 dark:active:border-gray-600': !active,
                          }"
                        >
                          <svg class="flex-none hi-mini hi-flag inline-block w-5 h-5 opacity-25 group-hover:opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.449 6.449 0 014.271.572 7.948 7.948 0 005.965.524l2.078-.64A.75.75 0 0018 12.25v-8.5a.75.75 0 00-.904-.734l-2.38.501a7.25 7.25 0 01-4.186-.363l-.502-.2a8.75 8.75 0 00-5.053-.439l-1.475.31V2.75z"/></svg>
                          <span class="grow">Notifications</span>
                          <div class="font-semibold inline-flex px-1.5 py-0.5 leading-4 text-xs rounded-full border border-blue-200 text-blue-700 bg-blue-100 dark:text-blue-50 dark:bg-blue-700 dark:border-blue-700">
                            {{ notifs }}
                          </div>
                        </label>
                      </MenuItem>
                    </div>
                    <div class="p-2.5 space-y-1">
                      <MenuItem v-slot="{ active }">
                        <label
                          class="group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg border border-transparent"
                          :class="{
                            'text-blue-800 bg-blue-50 dark:text-white dark:bg-gray-700/75 dark:border-transparent': active,
                            'text-gray-700 hover:text-blue-800 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700/75 dark:active:border-gray-600': !active,
                          }"
                        >
                          <svg class="flex-none hi-mini hi-user-circle inline-block w-5 h-5 opacity-25 group-hover:opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clip-rule="evenodd"/></svg>
                          <span class="grow">Account</span>
                        </label>
                      </MenuItem>
                      <MenuItem v-slot="{ active }" v-if="(user.role === 'ADMIN' || user.role === 'DOCTOR') ? true : false">
                        <label
                          class="group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg border border-transparent"
                          :class="{
                            'text-blue-800 bg-blue-50 dark:text-white dark:bg-gray-700/75 dark:border-transparent': active,
                            'text-gray-700 hover:text-blue-800 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700/75 dark:active:border-gray-600': !active,
                          }"
                        >
                          <svg class="flex-none hi-mini hi-cog-6-tooth inline-block w-5 h-5 opacity-25 group-hover:opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/></svg>
                          <span class="grow">Settings</span>
                        </label>
                      </MenuItem>
                    </div>
                    <div class="p-2.5 space-y-1">
                      <MenuItem v-slot="{ active }">
                        <label
                          class="group text-sm font-medium flex items-center justify-between space-x-2 px-2.5 py-2 rounded-lg border border-transparent"
                          :class="{
                            'text-blue-800 bg-blue-50 dark:text-white dark:bg-gray-700/75 dark:border-transparent': active,
                            'text-gray-700 hover:text-blue-800 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700/75 dark:active:border-gray-600': !active,
                          }"
                        >
                          <svg class="flex-none hi-mini hi-lock-closed inline-block w-5 h-5 opacity-25 group-hover:opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd"/></svg>
                          <span @click="logout" class="grow">Sign out</span>
                        </label>
                      </MenuItem>
                    </div>
                  </div>
                </MenuItems>
              </Transition>
              <!-- END Dropdown -->
            </Menu>
            <!-- END User Dropdown -->

            <!-- Toggle Mobile Navigation -->
            <div class="lg:hidden">
              <button
                @click="mobileNavOpen = !mobileNavOpen"
                type="button"
                class="inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-3 py-2 leading-5 text-sm border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
              >
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="hi-solid hi-menu inline-block w-5 h-5"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
            <!-- END Toggle Mobile Navigation -->
          </div>
          <!-- END Right Section -->
        </div>

        <!-- Mobile Navigation -->
        <div
          class="lg:hidden"
          :class="{
            'hidden': !mobileNavOpen
          }"
        >
          <nav class="flex flex-col space-y-2 py-4 border-t dark:border-gray-700">
            <label class="group text-sm font-semibold flex items-center space-x-2 px-3 py-2 rounded-lg text-blue-600 border border-blue-50 bg-blue-50 dark:text-white dark:bg-gray-700/75 dark:border-transparent">
              <svg class="hi-mini hi-home inline-block w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd"/></svg>
              <span>Home</span>
            </label>
            <label class="group text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-800 border border-transparent hover:text-blue-600 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700 dark:active:border-gray-600">
              <svg class="hi-mini hi-briefcase inline-block w-5 h-5 opacity-25 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 016 4.193V3.75zm6.5 0v.325a41.622 41.622 0 00-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25zM10 10a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V11a1 1 0 00-1-1H10z" clip-rule="evenodd"/><path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 01-9.274 0C3.985 17.585 3 16.402 3 15.055z"/></svg>
              <span>Health</span>
            </label>
            <label class="group text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-800 border border-transparent hover:text-blue-600 hover:bg-blue-50 active:border-blue-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700 dark:active:border-gray-600">
              <svg class="hi-mini hi-users inline-block w-5 h-5 opacity-25 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z"/></svg>
              <span>Appointments</span>
            </label>
          </nav>
        </div>
        <!-- END Mobile Navigation -->
      </div>
    </header>
    <!-- END Page Header -->

    <!-- Page Content -->
    <main id="page-content" class="flex flex-auto flex-col max-w-full">
      <!-- Page Section -->
      <div class="container xl:max-w-7xl mx-auto p-4 lg:p-8">
        <!--

        ADD YOUR MAIN CONTENT BELOW

        -->

        
        <!-- Placeholder -->
        <!-- <div class="flex items-center justify-center rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 text-gray-400 py-64 dark:bg-gray-800 dark:border-gray-700">Content (max width 1280px)</div> -->
        <div class="block rounded-xl border-gray-200 text-gray-400 dark:bg-gray-800 dark:border-gray-700">
          <AdminFlex  v-if="(user.role === 'ADMIN' || user.role === 'DOCTOR') ? true : false" />
          <Boxes />
        </div>

        
        <!--
        
        ADD YOUR MAIN CONTENT ABOVE
              
        -->
      </div>
      <!-- END Page Section -->
    </main>
    <!-- END Page Content -->

    <!-- Page Footer -->
    <footer id="page-footer" class="flex flex-none items-center bg-white dark:bg-gray-800">
      <div class="text-center flex flex-col md:text-left md:flex-row md:justify-between text-sm container xl:max-w-7xl mx-auto px-4 lg:px-8">
        <div class="pt-4 pb-1 md:pb-4">
          <a href="#" class="font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300" target="_blank">Meka</a> ©
        </div>
        <div class="pb-4 pt-1 md:pt-4 inline-flex items-center justify-center">
          <span>Crafted with</span>
          <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="mx-1 text-red-600 hi-solid hi-heart inline-block w-4 h-4"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path></svg>
          <span> by <a href="https://pixelcave.com" class="font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300" target="_blank">pixelcave</a></span>
        </div>
      </div>
    </footer>
    <!-- END Page Footer -->
  </div>
  <!-- END Page Container -->
</template>