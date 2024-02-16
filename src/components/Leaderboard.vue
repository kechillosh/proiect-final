<template>
  <div class="leaderboard-container">
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
export default {
  name: "LeaderboardView",
  data() {
    return {
      accounts: JSON.parse(localStorage.getItem("accounts")) || [],
    };
  },
  computed: {
    sortedLeaderboard() {
      // Filter accounts to only include those with a valid lastRunDate
      const accountsWithRuns = this.accounts.filter(account => account.lastRunDate);

      // Sort the accounts with runs by totalDistance in descending order
      const sortedWithRuns = accountsWithRuns.sort((a, b) => b.totalDistance - a.totalDistance);

      return sortedWithRuns;
    },
  },

  methods: {
    formatRunDate(dateString) {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // dateString could not be parsed into a valid Date
        console.error(`Invalid date string: ${dateString}`);
        return 'N/A';
      } else {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
      }
    },
  },

};
</script>






<style scoped>
.leaderboard-container {
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 0;
  height: 100vh;
  z-index: 98;
}

.filter-menu {
  margin-bottom: 20px;
}

.runs-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.runs-table th,
.runs-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
  color: #333;
}

.runs-table th {
  background-color: #f0f0f0;
}

.runs-table tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>




