<script setup lang="ts">
import IndexNavbar from "@/components/Navbars/IndexNavbar.vue";
import Footer from "@/components/Footers/Footer.vue";

import patternVue from "@/assets/img/pattern_vue.png";
import componentBtn from "@/assets/img/component-btn.png";
import componentProfileCard from "@/assets/img/component-profile-card.png";
import componentInfoCard from "@/assets/img/component-info-card.png";
import componentInfo2 from "@/assets/img/component-info-2.png";
import componentMenu from "@/assets/img/component-menu.png";
import componentBtnPink from "@/assets/img/component-btn-pink.png";
import documentation from "@/assets/img/documentation.png";
import login from "@/assets/img/login.jpg";
import profile from "@/assets/img/profile.jpg";
import landing from "@/assets/img/landing.jpg";
import { RouterLink } from "vue-router";
import {ref} from 'vue'
import router from "@/router";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3333'

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

axios.get('/')
.then(response =>{
  console.log(response);
})
.catch(error =>{
  console.log(error.response);
})

</script>

<template>
  <div>
    <IndexNavbar />
    <!-- <Footer /> -->
  </div>
</template>
