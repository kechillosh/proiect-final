<template>
  <div class="page-container">
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
  </div>
</template>

<script>

export default {
  name: "LeaderboardView",
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
  font-family: Arial, sans-serif;
  position: absolute;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #000;
  color: #fff;
  height: 100vh; /* Adjust the height as needed */
  z-index: 999;
  left: 0;
}

.content-container {
  flex: 1; /* Take up remaining space */
}

.filter-menu {
  margin-bottom: 20px;
}

.runs-table {
  width: 100%;
  border-collapse: collapse;
}

.runs-table th,
.runs-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  color: #fff;
}

.runs-table th {
  background-color: #333;
}

.runs-table tr:nth-child(even) {
  background-color: #222;
}
</style>


