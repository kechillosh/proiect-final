<template>
  <div class="app-container">
    <Navbar/>

    <div class="content-container">
      <h1 class="welcome-message">Welcome {{user}}</h1>
      <div class="message">
      <p>
        🏃‍♀️ Ready for triumph? Lace up, challenge yourself, and set the pace for a healthier you. <br> Join our running community, break records, and make your mark on the leaderboard.<br> It's about dedication, progress, and the joy of pushing limits. Take the first step, click below, and let the adventure unfold.<br> Your accomplishments await! 🚀
      </p>
        <button class="run-button">Run Now</button>
      </div>

      <div class="leaderboard-container">
        <h1>Leaderboard</h1>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name:"HomeView.vue",
  components: {Navbar},
  data () {
    return {
      user: localStorage.getItem("username")
    }
  }
}
</script>

<style>
.message{
  text-align: center;
  position: relative;
  top: 40vh; /* Move down by 20 pixels */
  left: 10px; /* Move left by 10 pixels */
  color: #333;
  font-size: 20px;
  padding: 25px;
}
  .app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

  .content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

  .welcome-message {
    text-align: center;
  position: relative;
  top: 40vh; /* Move down by 20 pixels */
  left: 10px; /* Move left by 10 pixels */
}

  .leaderboard-container {
  position: relative;
  top: 10vh;
  left: 42vw;
    height: 400px;
    width: 300px;
    text-align: center;
    outline: 2px solid black;
}
  body {
    background-color: #badcff;
  }

.run-button {
  background-color: green; /* Lime green button color */
  color: white; /* Text color for the button */
  padding: 10px 20px; /* Adjust padding as needed */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Smooth transition effect */
  margin-top: 17px;

}

.run-button:hover {
  background-color: darkgreen; /* Dark green color on hover */
}

</style>
