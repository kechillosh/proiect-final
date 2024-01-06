<template>
  <div class="mainMap">
    <Navbar/>
    <div>
      <div ref="mapContainer" style="width: 50%; height: 600px; border: 1px solid black; margin-top: 12vh; margin-left: 25vw"></div>
      <div class="run-info">
      <button v-on:click="startRun" v-if="!run">Start run</button>
      <button v-on:click="endRun" v-if="run">End run</button>
      {{ lat }},{{ lng }} <br>
      Traveled Distance: {{ traveledDistance.toFixed(2) }} meters <br>
        <span>{{ timeElapsed }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { ref, onMounted, watch } from "vue";
import L from "leaflet";

export default {
  name: "HomeView",
  components: { Navbar },
  data() {
    return {
      lat: ref(0),
      lng: ref(0),
      map: ref(null),
      markerStart: ref(null),
      markerEnd: ref(null),
      traveledDistance: ref(0),
      mapContainer: ref(null),
      run: ref(false),
      startTime: ref(null),
      timeElapsed: ref("00:00:00"),
    };
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          const newLat = position.coords.latitude;
          const newLng = position.coords.longitude;

          // Set the starting point
          this.lat = newLat;
          this.lng = newLng;

          // Update the map view
          this.map.setView([newLat, newLng], 17);

          // Update the starting marker position or create a new one if it doesn't exist
          if (this.markerStart) {
            this.markerStart.setLatLng([newLat, newLng]);
          } else {
            this.markerStart = L.marker([newLat, newLng]).addTo(this.map);
          }

          // Calculate and display the distance
          if (this.markerEnd) {
            this.traveledDistance = this.markerEnd.getLatLng().distanceTo([newLat, newLng]);
          }

          // Update the end marker position or create a new one if it doesn't exist
          if (this.markerEnd) {
            this.markerEnd.setLatLng([newLat, newLng]);
          } else {
            this.markerEnd = L.marker([newLat, newLng]).addTo(this.map);
          }

          // Start the timer when the run begins
          if (this.run) {
            this.updateElapsedTime();
          }
        });
      }
    },
    startRun() {
      this.run = true;
      this.startTime = new Date().getTime();
      this.updateElapsedTime();
      this.getLocation();
    },
    endRun() {
      this.run = false;
    },
    updateElapsedTime() {
      if (this.run) {
        const currentTime = new Date().getTime();
        const elapsedTimeInSeconds = Math.floor((currentTime - this.startTime) / 1000);
        const hours = Math.floor(elapsedTimeInSeconds / 3600);
        const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
        const seconds = elapsedTimeInSeconds % 60;
        this.timeElapsed = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        // Schedule the next update
        requestAnimationFrame(() => this.updateElapsedTime());
      }
    },
  },
  mounted() {
    if (this.$refs.mapContainer) {
      this.mapContainer = this.$refs.mapContainer;
      this.map = L.map(this.mapContainer).setView([51.505, -0.09], 13);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);
    }
  },
  watch: {
    run(newValue) {
      if (newValue) {
        this.startTime = new Date().getTime();
        this.updateElapsedTime();
      }
    },
  },
};
</script>

<style>

.run-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

button {
  padding: 12px 20px;
  font-size: 18px;
  margin: 10px 0;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

span {
  font-weight: bold;
  font-size: 20px;
}
</style>





