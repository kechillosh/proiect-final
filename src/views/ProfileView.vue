<template>
  <body>
  <Navbar/>
  <div class="profile-container">
    <section class="user-info">
      <h2>User Information</h2>
      <p><strong>Username:</strong> {{ username }}</p>

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

      <button v-if="!editMode" @click="toggleEditMode">Edit</button>
      <button v-if="editMode" @click="applyChanges">Apply Changes</button>
    </section>
  </div>
  </body>
</template>

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
      editMode: false,
      editedAge: null,
      editedWeight: null,
      editedHeight: null,
    };
  },
  created() {
    const loggedInUser = localStorage.getItem('username');

    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    const loggedInAccount = accounts.find(account => account.username === loggedInUser);

    if (loggedInAccount) {
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
      this.editMode = !this.editMode;

      if (this.editMode) {
        this.editedAge = this.age;
        this.editedWeight = this.weight;
        this.editedHeight = this.height;
      }
    },
    applyChanges() {
      this.age = this.editedAge;
      this.weight = this.editedWeight;
      this.height = this.editedHeight;

      this.saveUserData();

      this.editMode = false;
    },
    saveUserData() {
      const loggedInUser = localStorage.getItem('username');

      const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

      const loggedInAccount = accounts.find(account => account.username === loggedInUser);

      if (loggedInAccount && this.weight !== null && this.age !== null && this.height !== null) {
        loggedInAccount.weight = this.weight;
        loggedInAccount.height = this.height;
        loggedInAccount.age = this.age;

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
  background: url('../assets/50-Beautiful-and-Minimalist-Presentation-Backgrounds-031.jpg');
}

.profile-container {
  width: 400px;
  padding: 20px;
  border: 2px solid #333;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>

