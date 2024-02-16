<template>
  <div class="main-lead">
    <div class="second-lead">

    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import {Icon} from "@iconify/vue";

export default {
  name: "Leaderboard",
  data() {
    return {
      user: localStorage.getItem('username'),
      showLoader: true,
    }
  },
}

</script>

<style>

</style>