<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import router from '@/router';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3333'

let logged = false

const user = ref({
  email:'',
  password:''
})

const loginRequest =async () => {
  await axios.post('/login',user.value, {
    withCredentials: true
  })
  .then(response =>{
    console.log(response.data.token);
    localStorage.setItem('token', response.data.token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
    logged = true
    // router.push('/')
  })
  .catch(error =>{
    console.log(error.response);
  })

  if (logged)
    await axios.get(`/user/${user.value.email}`)
    .then(response =>{
      console.log(response.data[0]);
      localStorage.setItem('user', JSON.stringify(response.data[0]))
      router.push('/')
    })
    .catch(error =>{
      console.log(error.response.data);
    })
}

// function loginRequest() {

//   const url = 'http://127.0.0.1:3333/login?email=' + user.value.email + '&password=' + user.value.password
  
//   fetch(url, {
//     method: 'POST',
//     headers:{
//       'Access-Control-Allow-Origin': '*'
//     }
//   })
//   .then((response) => {
//     if (response.ok){
//       response.json()
//       .then(
//         (res) =>{
//           console.log(res.token);
//           localStorage.setItem('token', res.token)
//           router.push({path: '/'})
//         }
//       )
//     }
//   })
//   .then((result) => {
//     if (result != null)
//       console.log('Success:', result.msg);
//   })
//   .catch((error) => {
//       console.error('Error:', error);
//     });
// }

</script>
<template>
  <div class="container mx-auto px-4 h-full rounded-3xl p-7">
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
              <small>sign in to adoobin</small>
            </div>
            <form @submit.prevent="loginRequest">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                  v-model="user.email"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  type="password"
                  required
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                  v-model="user.password"
                />
              </div>

              <div class="text-center mt-6">
                <button
                  class="bg-gray-950 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="flex flex-wrap mt-6 relative">
          <div class="w-1/2">
            <RouterLink to="/auth/recover" class="text-blueGray-200">
              <small>Forgot password?</small>
            </RouterLink>
          </div>
          <div class="w-1/2 text-right">
            <RouterLink to="/auth/register" class="text-blueGray-200">
              <small>Create new account</small>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>