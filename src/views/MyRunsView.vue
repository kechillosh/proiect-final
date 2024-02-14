<template>
  <div class="page-container">
    <Navbar />
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
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "MyRunsView",
  components: { Navbar },
  data() {
    return {
      // Assuming you retrieve the logged-in user and accounts from local storage
      loggedInUser: localStorage.getItem("username"),
      accounts: JSON.parse(localStorage.getItem("accounts")) || [],
      sortBy: "latest",
    };
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

<style>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #badcff; /* Matching the specified background color */
  font-family: 'Arial', sans-serif;
}

.filter-menu {
  margin: 20px;
}

.runs-table {
  width: 80%;
  border-collapse: collapse;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
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
</style>





