<template>
  <body>
  <Navbar/>
  <div class="profile-container">
    <section class="user-info" v-if="showProfile">
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

    <section class="about-us" v-else>
      <h2>About Us</h2>
      <p>Welcome to RunTracker, your ultimate running companion app! Our mission is to help runners of all levels track their progress, stay motivated, and achieve their fitness goals.</p>
      <p>With RunTracker, you can:</p>
      <ul>
        <li>Log your runs and monitor your performance over time.</li>
        <li>Set personal goals and track your progress towards achieving them.</li>
        <li>Join a community of like-minded runners and share your achievements.</li>
        <li>Access personalized training plans and expert advice.</li>
        <li>Analyze your running data with detailed statistics and insights.</li>
      </ul>
      <p>Whether you're training for your first 5K, aiming to set a new personal best, or just looking to stay active, RunTracker is here to support you every step of the way.</p>
      <p>Thank you for choosing RunTracker. Let's hit the road and run towards a healthier, happier you!</p>
    </section>

    <button class="toggle-view-button" @click="toggleView">
      <Icon width="25px" icon="material-symbols:arrow-circle-right-rounded" color="black"/>
    </button>
  </div>
  </body>
</template>


<script>
import Navbar from "@/components/Navbar.vue";
import {Icon} from "@iconify/vue";

export default {
  name: "ProfileView",
  components: {Icon, Navbar},
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
      showProfile: true,  // New data property to control view
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
    toggleView() {
      this.showProfile = !this.showProfile;
      const container = document.querySelector('.profile-container');
      if (container) {
        container.classList.toggle('expanded', !this.showProfile);
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
  position: relative;
  width: 400px;
  padding: 20px;
  border: 2px solid #333;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
}

.profile-container.expanded {
  width: 600px; /* or any desired width */
}

.user-info,
.about-us {
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

.toggle-view-button {
  position: absolute;
  right: -40px; /* Adjust to position button on the right of the container */
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.about-us p,
.about-us ul {
  text-align: left;
  margin: 10px 0;
}

.about-us ul {
  list-style-type: disc;
  padding-left: 20px;
}
</style>





