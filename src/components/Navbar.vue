<template>
  <nav>
    <div>
      <router-link to="/Home" class="nav-link">
        <Icon icon="material-symbols:home"/>
        Home
      </router-link>
      <router-link to="/MyRuns" class="nav-link">
        <Icon icon="cil:running"/>
        MyRuns
      </router-link>
      <router-link to="/Profile" class="nav-link">
        <Icon icon="iconamoon:profile-fill"/>
        Profile
      </router-link>
      <a class="icon-link" @click="toggleList">
        <Icon
            class="user"
            icon="iconamoon:profile-circle-duotone"
            width="30"
            color="white"
        />
      </a>
      <div v-if="showList" class="dropdown-list">
        <!-- Your list content goes here -->
        <router-link to="/Logout" class="dropdown-item">Logout</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  name: "Navbar",
  components: { Icon },
  data() {
    return {
      showList: false,
    }
  },
  methods: {
    toggleList() {
      this.showList = !this.showList;
    },
  },
}
</script>


<style scoped>
.user {
  margin-left: 75vw;
}

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


.icon-link {
  text-decoration: none;
  transition: opacity 0.3s ease-in-out;
}

.icon-link:hover {
  opacity: 0.75;
  cursor: pointer;
}
</style>
