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
        <th>Username</th>
        <th>Total Distance (km)</th>
        <th>Last Run Date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(account, index) in sortedLeaderboard" :key="account.username">
        <td>{{ account.username }}</td>
        <td>{{ account.totalDistance }}</td>
        <td>{{ account.lastRunDate ? formatRunDate(account.lastRunDate) : 'N/A' }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "LeaderboardView",
  components: { Navbar },
  data() {
    return {
      accounts: JSON.parse(localStorage.getItem("accounts")) || [],
      sortBy: "highestKm",
    };
  },
  computed: {
    // Sort accounts based on the selected criteria
    sortedLeaderboard() {
      switch (this.sortBy) {
        case "latest":
          return [...this.accounts].sort((a, b) => new Date(b.lastRunDate) - new Date(a.lastRunDate));
        case "lessTime":
          return [...this.accounts].sort((a, b) => a.totalTime.localeCompare(b.totalTime));
        case "highestKm":
          return [...this.accounts].sort((a, b) => b.totalDistance - a.totalDistance);
        default:
          return this.accounts;
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
  min-height: 100vh;
  background-color: #badcff; /* Matching the specified background color */
  font-family: 'Arial', sans-serif;
}

.filter-menu {
  margin: 20px;
}

.runs-table {
  width: 80%;
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

/* Updated styles for the leaderboard view */
.runs-table {
  max-width: 800px;
  width: 100%;
  margin: 20px auto;
}

.filter-menu {
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-menu label {
  margin-right: 10px;
}

.filter-menu select {
  padding: 10px;
  border-radius: 5px;
}

/* Style for leaderboard rows */
.runs-table tbody tr {
  background-color: #f9f9f9;
}

.runs-table tbody tr:nth-child(2n) {
  background-color: #e6e6e6;
}

.runs-table th, .runs-table td {
  font-weight: normal;
}

/* Responsive styles for smaller screens */
@media (max-width: 600px) {
  .runs-table {
    width: 100%;
  }
}
</style>
