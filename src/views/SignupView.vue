
<template>
  <div class="Signup">
    <h1>Signup</h1>
    <input type="text" placeholder="Username">
    <input type="text" placeholder="Password">
    <input type="text" placeholder="Confirm Password">
    <button>Register</button>

    <p>
      <router-link to="/">
        Already have an account?
      </router-link>
    </p>
  </div>

</template>

<script>
export default {
  name:"SignupView"
}

</script>

<style scoped>
/* Container styles */
.Signup {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
