<template>
  <body>
  <Navbar/>
  <div class="profile-container">
    <!-- User Info Section -->
    <section class="user-info">
      <h2>User Information</h2>
      <p><strong>Username:</strong> {{ username }}</p>

      <!-- Editable fields with v-if to toggle between display and edit modes -->
      <div v-if="!editMode">
        <p><strong>Age:</strong> {{ age }}</p>
        <p><strong>Weight:</strong> {{ weight }} kg</p>
        <p><strong>Height:</strong> {{ height }} cm</p>
      </div>

      <div v-if="editMode">
        <label for="editedAge">Age:</label>
        <input v-model="editedAge" type="number" id="editedAge" placeholder="Enter Age">

        <label for="editedWeight">Weight:</label>
        <input v-model="editedWeight" type="number" id="editedWeight" placeholder="Enter Weight">

        <label for="editedHeight">Height:</label>
        <input v-model="editedHeight" type="number" id="editedHeight" placeholder="Enter Height">
      </div>

      <!-- Toggle Edit and Apply Changes buttons -->
      <button v-if="!editMode" @click="toggleEditMode">Edit</button>
      <button v-if="editMode" @click="applyChanges">Apply Changes</button>
    </section>

    <!-- Other Sections or Components can be added here -->
  </div>
  </body>
</template>

<!-- ... (rest of the component) -->


<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "ProfileView",
  components: { Navbar },
  data() {
    return {
      username: "",
      age: null,
      weight: null,
      height: null,
      editMode: false, // Flag to track if in edit mode
      editedAge: null, // Edited values
      editedWeight: null,
      editedHeight: null,
    };
  },
  created() {
    // Get the currently logged-in user from localStorage
    const loggedInUser = localStorage.getItem('username');

    // Fetch the existing accounts from localStorage
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // Find the account with the currently logged-in username
    const loggedInAccount = accounts.find(account => account.username === loggedInUser);

    if (loggedInAccount) {
      // Set user data from localStorage
      this.username = loggedInUser;
      this.age = loggedInAccount.age;
      this.weight = loggedInAccount.weight;
      this.height = loggedInAccount.height;
    } else {
      console.error("Unable to find the currently logged-in user in accounts.");
    }
  },
  methods: {
    toggleEditMode() {
      // Toggle the edit mode
      this.editMode = !this.editMode;

      // Set edited values to current values when entering edit mode
      if (this.editMode) {
        this.editedAge = this.age;
        this.editedWeight = this.weight;
        this.editedHeight = this.height;
      }
    },
    applyChanges() {
      // Apply the edited values
      this.age = this.editedAge;
      this.weight = this.editedWeight;
      this.height = this.editedHeight;

      // Save the updated accounts array back to localStorage
      this.saveUserData();

      // Exit edit mode
      this.editMode = false;
    },
    saveUserData() {
      // Validate the data if needed

      // Get the currently logged-in user from localStorage
      const loggedInUser = localStorage.getItem('username');

      // Fetch the existing accounts from localStorage
      const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

      // Find the account with the currently logged-in username
      const loggedInAccount = accounts.find(account => account.username === loggedInUser);

      if (loggedInAccount && this.weight !== null && this.age !== null && this.height !== null) {
        // Update the user data for the current user
        loggedInAccount.weight = this.weight;
        loggedInAccount.height = this.height;
        loggedInAccount.age = this.age;

        // Save the updated accounts array back to localStorage
        localStorage.setItem('accounts', JSON.stringify(accounts));
      } else {
        console.error("Invalid data or unable to find the currently logged-in user in accounts.");
      }
    },
  },
};
</script>


<style scoped>
body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  background-color: #f0f0f0; /* Set your desired background color */
}

.profile-container {
  width: 400px; /* Set your desired width */
  padding: 20px;
  border: 2px solid #333; /* Set your desired border color */
  border-radius: 10px; /* Set your desired border radius */
  background-color: #fff; /* Set your desired background color */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Optional: Add a box shadow */
}

.user-info {
  text-align: center;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

button {
  padding: 10px;
  background-color: #007bff; /* Set your desired button background color */
  color: #fff; /* Set your desired button text color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
}

button:hover {
  background-color: #0056b3; /* Set your desired button background color on hover */
}
</style>

