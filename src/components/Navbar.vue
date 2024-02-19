<template>
  <nav>
    <div>
      <router-link to="/Home" class="nav-link desktop-nav">
        <Icon icon="material-symbols:home"/>
        Home
      </router-link>
      <router-link to="/MyRuns" class="nav-link desktop-nav">
        <Icon icon="cil:running"/>
        MyRuns
      </router-link>
      <router-link to="/Profile" class="nav-link desktop-nav">
        <Icon icon="iconamoon:profile-fill"/>
        Profile
      </router-link>
      <a class="icon-link mobile-nav" @click="toggleDropdown">
        <Icon
            class="menu-icon"
            icon="material-symbols:table-rows-narrow"
            width="30"
            color="white"
        />
      </a>
      <div v-if="showDropdownMenu" class="dropdown-list mobile-nav">
        <router-link to="/Home" class="dropdown-item">Home</router-link>
        <router-link to="/MyRuns" class="dropdown-item">MyRuns</router-link>
        <router-link to="/Profile" class="dropdown-item">Profile</router-link>
        <router-link to="/" class="dropdown-item">Logout</router-link>
      </div>
      <div class="navbar-right">
      <a class="icon-link desktop-nav" @click="toggleList">
        <Icon
            class="user"
            icon="iconamoon:profile-circle-duotone"
            width="30"
            color="white"
        />
      </a>
      <div v-if="showList" class="dropdown-list">
        <p>user: {{user}}</p>
        <router-link to="/" class="dropdown-item">Logout</router-link>
      </div>
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
      user:localStorage.getItem("username"),
      showDropdownMenu: false
    }
  },
  methods: {
    toggleList() {
      this.showList = !this.showList;
    },
    toggleDropdown() {
      this.showDropdownMenu = !this.showDropdownMenu
    },
  },

}
</script>


<style scoped>
.navbar-right {
  margin-left: 75vw;
}

nav {
  background-color: #333; /* Dark Gray */
  padding: 10px 20px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 96;
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

.dropdown-list {
  position: absolute;
  top: 60px; /* Adjust this value based on your design */
  right: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-width: 150px;
  z-index: 1001;
}

.dropdown-item {
  padding: 10px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.dropdown-item:hover {
  background-color: #2ecc71;
  color: #fff;
}

@media screen and (max-width: 1600px) {
  .navbar-right {
    margin-left: 70vw; /* Adjust the left margin for smaller screens */
  }

}

@media screen and (max-width: 1360px) {
  .navbar-right {
    margin-left: 65vw; /* Adjust the left margin for smaller screens */
  }
}

@media screen and (min-width: 1100px) {
  .desktop-nav {
    display: block;
  }

  .mobile-nav {
    display: none;
  }
}

@media screen and (max-width: 1100px) {
  .desktop-nav {
    display: none;
  }

  .mobile-nav {
    display: block;
  }
}


</style>
