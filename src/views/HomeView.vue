<template>
  <body>
  <div class="preLoader" v-if="showLoader">
    <div class="icon">
      <Icon width="60px" icon="noto:person-running-facing-right-medium-skin-tone"/>
    </div>
  </div>
  <div class="app-container">
    <Navbar />
    <div class="content-container">
      <div class="content-box">
        <h1 class="welcome-message">Welcome {{ user }}</h1>
        <div class="message">
          <p>
            🏃‍♀️ Ready for triumph? Lace up, challenge yourself, and set the
            pace for a healthier you. <br />
            Join our running community, break records, and make your mark on the
            leaderboard.<br />
            It's about dedication, progress, and the joy of pushing limits. Take
            the first step, click below, and let the adventure unfold.<br />
            Your accomplishments await! 🚀
          </p>
          <router-link to='/Run' style="margin-top: 20px !important;">
            <button class="run-button">Run Now</button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="sidebar">
      <button @click="toggleLeaderboard" >
    <Icon width="50px"
        icon="material-symbols:arrow-circle-left-rounded"/>
      </button>
    </div>
    <Leaderboard v-if="this.leaderboard"/>
  </div>
  </body>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { ref, onMounted } from "vue";
import L from "leaflet";
import { Icon } from '@iconify/vue';
import Leaderboard from "@/components/Leaderboard.vue";

export default {
  name: "HomeView.vue",
  components: { Navbar, Icon , Leaderboard },
  data() {
    return {
      user: localStorage.getItem('username'),
      showLoader: true,
      leaderboard:false,
    }
  },
  created() {
    // Simulate loading delay (you can replace this with actual data loading logic)
    setTimeout(() => {
      this.showLoader = false; // Set showLoader to false after the delay
    }, 1000); // Adjust the duration as needed
  },

methods: {
  toggleLeaderboard() {
    this.leaderboard = !this.leaderboard;
    console.log(this.leaderboard)
  },
}

};

</script>

<style scoped>
body {
  background-color: #badcff;
}

.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url('src/assets/1509963788.jpg') no-repeat center center fixed; /* Replace with the correct path to your image */
  background-size: cover;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Vertically center the content */
  min-height: 100vh; /* Set minimum height to at least the full viewport height */
  position: relative;
}

.content-box {
  background-color: rgba(255, 255, 255, 0.7);
  border: 2px solid #333;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
}

.welcome-message {
  text-align: center;
}

.message {
  text-align: center;
  color: #333;
  font-size: 20px;
}

.run-button {
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px; /* Adjusted margin-top */
}

.run-button:hover {
  background-color: darkgreen;
}

.icon {
  position: fixed;
  top: 50%;
  left: 50%;
  animation: loading 2s linear infinite;
}

.preLoader {
  background: #cfd8d6;
  height: 100vh;
  width: 100%;
  position: fixed;
  text-align: center;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

@keyframes loading {
  0% {
    transform: rotate(0deg) scale(1);
  }

  50% {
    transform: rotate(180deg) scale(1.5);
  }

  100% {
    transform: rotate(360deg) scale(1);
  }
}
.sidebar {
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 99;
}
</style>




