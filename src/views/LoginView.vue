<template>
  <div class="container">
    <div class="login-container">
      <div class="login">
        <h1>Login</h1>
        <input type="text" placeholder="username" v-model="username">
        <input type="password" placeholder="password" v-model="password" @keyup.enter="login">
        <div class="button-container">
          <button @click="login">Login</button>
          <button @click="testMode">Test Mode</button>
        </div>
        <p>
          <router-link to="/Signup">
            Don't have an account?
          </router-link>
        </p>
      </div>
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
  methods: {
    login() {
      const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
      const matchedAccount = accounts.find(account => account.username === this.username && account.password === this.password);

      localStorage.removeItem('username');

      if (!matchedAccount) {
        alert("Invalid account");
      } else {
        localStorage.setItem('username', matchedAccount.username);

        if (matchedAccount.age >= 0 && matchedAccount.height >= 0 && matchedAccount.weight >= 0) {
          this.$router.push("/Home");
        } else {
          this.$router.push("/Welcome");
        }
      }
    },
    testMode() {
      let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

      const adminAccount = {
        username: "admin",
        password: "admin",
        age: 30,
        height: 180,
        weight: 75
      };

      const existingAdminAccount = accounts.find(account => account.username === adminAccount.username);

      if (!existingAdminAccount) {
        accounts.push(adminAccount);
        localStorage.setItem('accounts', JSON.stringify(accounts));
      }

      localStorage.setItem('username', adminAccount.username);
      this.$router.push("/Home");
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url('../assets/correr-runing-zapatillas-asfalto-atardecer.jpg') no-repeat center center fixed;
  background-size: cover;
}

.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  padding: 16px;
  background-color: white;
  border: 2px solid #333;
  border-radius: 10px;
  margin: 20px;
}

.login {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
  background-color: white;
}

h1 {
  text-align: center;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
}

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
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background: linear-gradient(to right, #4CAF50, #45a049);
  transition: background 0.3s ease;
}

button:hover {
  background: linear-gradient(to right, #45a049, #4CAF50);
}

body {
  background-color: #7DF9FF;
}

/* Media query for smaller screens */
@media (max-width: 600px) {
  .login-container {
    max-width: 90%;
    padding: 8px;
    margin: 10px;
  }

  .login {
    padding: 10px;
  }

  h1 {
    font-size: 24px;
  }

  input {
    padding: 8px;
    margin: 6px 0;
  }

  .button-container {
    flex-direction: column;
    gap: 5px;
  }

  button {
    padding: 10px 16px;
    font-size: 14px;
  }

  p {
    font-size: 14px;
    margin-top: 12px;
  }

  router-link {
    font-size: 14px;
  }
}

</style>

