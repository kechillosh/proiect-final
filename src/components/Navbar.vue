<template>
  <nav>
    <div>
      <router-link to="/Home" class="nav-link"><Icon icon="material-symbols:home"/>Home</router-link>
      <router-link to="/MyRuns" class="nav-link"><Icon icon="cil:running"/>MyRuns</router-link>
      <router-link to="/Profile" class="nav-link"><Icon icon="iconamoon:profile-fill"/>Profile</router-link>
    </div>
  </nav>
</template>

<script>
import { Icon } from '@iconify/vue';
export default {
  name: "Navbar",
  components: {Icon}
}
</script>

<style scoped>
nav {
  background-color: #333; /* Dark Gray */
  padding: 10px 20px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

div {
  display: flex;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #fff; /* White */
  margin: 0 15px;
  padding: 10px 15px;
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: #2ecc71; /* Lime Green */
}

</style>
