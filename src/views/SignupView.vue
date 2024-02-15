<template>
  <div class="signup-container">
    <div class="Signup">
      <h1>Signup</h1>
      <input type="text" placeholder="Username" v-model="username">
      <input type="password" placeholder="Password" v-model="password">
      <input type="password" placeholder="Confirm Password" v-model="password2">
      <button v-on:click="signup">Register</button>

      <p>
        <router-link to="/">
          Already have an account?
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupView",

  data() {
    return {
      username: "",
      password: "",
      password2: "",
      accounts: []
    };
  },
  methods: {
    signup() {
      if (this.password === this.password2 && this.username.length >= 6) {
        // Check if the username is already taken
        const isUsernameTaken = this.accounts.some(account => account.username === this.username);

        if (isUsernameTaken) {
          alert("Username is already taken. Choose another one.");
        } else {
          // Add the new account to the array
          this.accounts.push({
            username: this.username,
            password: this.password
          });

          // Save the updated array back to localStorage
          localStorage.setItem('accounts', JSON.stringify(this.accounts));

          alert("Account created successfully");
        }
      } else {
        alert("Passwords do not match or the username has fewer than 6 characters.");
      }
    }
  },
  mounted() {
    // Retrieve existing accounts from localStorage when the component is mounted
    this.accounts = JSON.parse(localStorage.getItem('accounts')) || [];
  }
};
</script>

<style scoped>
.signup-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Ensure the container takes at least the full viewport height */
  height: 100vh;
  background: url('src/assets/correr-runing-zapatillas-asfalto-atardecer.jpg') no-repeat center center fixed;
  background-size: cover;

}
/* Container styles */
.Signup {
  max-width: 400px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: #fff; /* Set a non-transparent background color */

  border: 2px solid #333;
  border-radius: 10px;
  margin: 20px;
}

/* Heading styles */
h1 {
  text-align: center;
  color: #333;
}

/* Input styles */
input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Link styles */
p {
  text-align: center;
  margin-top: 16px;
  color: #333;
}

router-link {
  color: #007BFF;
  text-decoration: none;
  font-weight: bold;
}

router-link:hover {
  text-decoration: underline;
}
button {
  display: inline-block;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background: linear-gradient(to right, #4CAF50, #45a049); /* Gradient background */
  transition: background 0.3s ease;
}

button:hover {
  background: linear-gradient(to right, #45a049, #4CAF50); /* Hover effect */
}
</style>
