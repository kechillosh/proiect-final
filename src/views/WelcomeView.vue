<template>
  <div class="preLoader" v-if="showLoader">
    <div class="icon">  <Icon width="60px"
        icon="noto:person-running-facing-right-medium-skin-tone"/>

    </div>
  </div>
  <div class="container">
    <div class="content">
      <h1>Welcome to My Running App!</h1>
      <h2>Please Introduce Data About Yourself</h2>

      <div class="custom-form">
        <div class="form-field">
          <label for="weight">Weight (kg):</label>
          <input v-model="weight" type="number" required>
        </div>

        <div class="form-field">
          <label for="height">Height (cm):</label>
          <input v-model="height" type="number" required>
        </div>

        <div class="form-field">
          <label for="age">Age:</label>
          <input v-model="age" type="number" required>
        </div>

        <button @click="saveUserData">Continue</button>
      </div>
    </div>
  </div>
</template>

<script>

import { Icon } from '@iconify/vue';
export default {
  name: "WelcomeView",
  components: {Icon},
  data() {
    return {
      showLoader: true,
      weight: null,
      height: null,
      age: null,
    };
  },
  methods: {
    saveUserData() {
      // Validate the data if needed

      // Get the currently logged-in user from localStorage
      const loggedInUser = localStorage.getItem('username');

      // Fetch the existing accounts from localStorage
      const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

      // Find the account with the currently logged-in username
      const loggedInAccountIndex = accounts.findIndex(account => account.username === loggedInUser);

      if (loggedInAccountIndex !== -1 && this.weight !== null && this.age !== null && this.height !== null) {
        // Update the user data for the current user
        accounts[loggedInAccountIndex].weight = this.weight;
        accounts[loggedInAccountIndex].height = this.height;
        accounts[loggedInAccountIndex].age = this.age;

        // Save the updated accounts array back to localStorage
        localStorage.setItem('accounts', JSON.stringify(accounts));
        this.$router.push("/Home");
      } else {
        console.error("Invalid data or unable to find the currently logged-in user in accounts.");
      }
    },
  },
  created() {
    // Simulate loading delay (you can replace this with actual data loading logic)
    setTimeout(() => {
      this.showLoader = false; // Set showLoader to false after the delay
    }, 1500); // Adjust the duration as needed
  },
};
</script>

<style scoped>
.icon{
  position: fixed;
  top: 50%;
  left: 50%;
  animation: loading 2s linear infinite; /* Adjust the duration and other parameters as needed */
}
body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  overflow: hidden;
  color: #fff;
  font-family: 'Arial', sans-serif;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url('src/assets/correr-runing-zapatillas-asfalto-atardecer.jpg') no-repeat center center fixed; /* Replace with the correct path to your image */
  background-size: cover;
}

.content {
  text-align: center;
  max-width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.7); /* Adjust the opacity to control brightness */
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
}

.custom-form {
  margin-top: 20px;
}

.form-field {
  margin-bottom: 15px;
}

.form-field label {
  display: block;
  margin-bottom: 8px;
  font-size: 18px;
}

.form-field input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

button {
  background-color: #2ecc71;
  color: white;
  padding: 12px 20px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #27ae60;
}

.preLoader {
  background: #cfd8d6; /* Change to a color that contrasts with your icon */
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





