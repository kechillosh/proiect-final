<template>
  <div class="mainMap">
    <div>
      <div ref="mapContainer" style="width: 50%; height: 600px; border: 1px solid black; margin-top: 20vh; margin-bottom: 10vh; margin-left: 23vw"></div>
      <button v-on:click="getLocation">Start run</button>
      {{ lat }},{{ lng }}
      <div>Traveled Distance: {{ traveledDistance.toFixed(2) }} meters</div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { ref, onMounted } from "vue";
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
        });
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
};
</script>

<style>
.mainMap {
  text-align: center;
  align-items: center;
  justify-content: center;
}
</style>


