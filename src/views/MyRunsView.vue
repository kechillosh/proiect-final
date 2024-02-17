<template>
  <div class="preLoader" v-if="showLoader">
    <div class="icon">
      <Icon width="60px" icon="noto:person-running-facing-right-medium-skin-tone"/>
    </div>
  </div>
  <div class="page-container">
    <Navbar />
    <div class="content-container">
    <div class="filter-menu">
      <label for="sort">Sort by:</label>
      <select id="sort" v-model="sortBy">
        <option value="latest">Latest</option>
        <option value="lessTime">Less Time</option>
        <option value="highestKm">Highest Km</option>
      </select>
    </div>
    <table class="runs-table">
      <thead>
      <tr>
        <th>Distance (km)</th>
        <th>Time</th>
        <th>Date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="run in sortedRuns" :key="run.date">
        <td>{{ run.distance }}</td>
        <td>{{ run.time }}</td>
        <td>{{ formatRunDate(run.date) }}</td>
      </tr>
      </tbody>
    </table>
      </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { Icon } from '@iconify/vue';

export default {
  name: "MyRunsView",
  components: {Icon, Navbar },
  data() {
    return {
      // Assuming you retrieve the logged-in user and accounts from local storage
      loggedInUser: localStorage.getItem("username"),
      accounts: JSON.parse(localStorage.getItem("accounts")) || [],
      sortBy: "latest",
      showLoader: true,
  };
  },
  created() {
    // Simulate loading delay (you can replace this with actual data loading logic)
    setTimeout(() => {
      this.showLoader = false; // Set showLoader to false after the delay
    }, 1000); // Adjust the duration as needed
  },
  computed: {
    // Filter runs for the logged-in user
    userRuns() {
      const userAccount = this.accounts.find((account) => account.username === this.loggedInUser);
      return userAccount ? userAccount.runs || [] : [];
    },
    // Sort runs based on the selected criteria
    sortedRuns() {
      switch (this.sortBy) {
        case "latest":
          return [...this.userRuns].sort((a, b) => new Date(b.date) - new Date(a.date));
        case "lessTime":
          return [...this.userRuns].sort((a, b) => a.time.localeCompare(b.time));
        case "highestKm":
          return [...this.userRuns].sort((a, b) => b.distance - a.distance);
        default:
          return this.userRuns;
      }
    },
  },
  methods: {
    // Format run date as per your requirement
    formatRunDate(dateString) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString("en-US", options);
    },
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Arial', sans-serif;
  background: url('src/assets/running-is-one-of-the-best-ways-to-stay-fit-royalty-free-image-1036780592-1553033495.jpg') no-repeat center center fixed; /* Replace with the correct path to your image */
  background-size: cover;
}

.content-container {
  background: rgba(255, 255, 255, 0.8); /* Adjust opacity as needed */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  padding: 20px;
  width: 80vw;
}


.filter-menu {
  margin: 20px;
}

.runs-table {
  width: 95%;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 1);
  border: 2px solid #333;
  padding: 20px;
  margin: 20px;
}

.runs-table th, .runs-table td {
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
}

.runs-table th {
  background-color: #e6e6e6;
}

.runs-table tbody tr:hover {
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;
}

.filter-menu {
  margin: 20px;
  text-align: center;
}

.filter-menu label {
  font-size: 16px;
  margin-right: 10px;
  color: #333; /* Adjust the color as needed */
}

.filter-menu select {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #333; /* Adjust the color as needed */
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.filter-menu select:hover,
.filter-menu select:focus {
  border-color: #007bff; /* Change to the color you prefer on hover/focus */
  outline: none;
}

.filter-menu select option {
  background-color: #fff;
  color: #333; /* Adjust the color as needed */
}

.filter-menu select option:hover {
  background-color: #f0f0f0;
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

</style>





