<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios'
import { RouterLink } from 'vue-router';

// configure axios domain
// axios.defaults.baseURL = "http://api.new.adoobin.com/"

const email = ref('')

async function recoverRequest() {
    
}

</script>
<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div>
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300" />
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-center mb-3 font-bold">
              <small>Recover Request</small>
            </div>
            <form @submit.prevent="recoverRequest">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Enter your e-mail
                </label>
                <input
                  type="email"
                  required
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                  v-model="email"
                />
              </div>

              <div class="text-center mt-6">
                <button
                  class="bg-gray-950 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                >
                  recover
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>