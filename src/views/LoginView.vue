
<template>
  <div class="login-container">
<div class="login">
  <h1>Login</h1>
  <input type="text" placeholder="username" v-model="username">
  <input type="password" placeholder="password" v-model="password">
  <button v-on:click="Login">Login</button>
  <p>
    <router-link to="/Signup">
      Don't have an account?
    </router-link>
  </p>
</div>
  </div>

</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods:{
    Login() {
      const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
      const matchedAccount = accounts.find(account => account.username === this.username && account.password === this.password);

      if (matchedAccount) {
        // Clear previous user data
        localStorage.removeItem('username');

        // Store only the username in localStorage
        localStorage.setItem('username', this.username);

        // Redirect to the Home page or perform any other action
        this.$router.push("/Welcome");
      } else {
        alert("Invalid credentials");
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Ensure the container takes at least the full viewport height */

}
/* Container styles */
.login {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
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
body{
  background-color: #7DF9FF;
}
</style>




