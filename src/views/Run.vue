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
  name: "HomeView.vue",
  components: { Navbar },
  setup() {
    const lat = ref(0);
    const lng = ref(0);
    const map = ref(null);
    const markerStart = ref(null);
    const markerEnd = ref(null);
    const traveledDistance = ref(0);
    const mapContainer = ref(null); // Add this line

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          const newLat = position.coords.latitude;
          const newLng = position.coords.longitude;

          // Set the starting point
          lat.value = newLat;
          lng.value = newLng;

          // Update the map view
          map.value.setView([newLat, newLng], 17);

          // Update the starting marker position or create a new one if it doesn't exist
          if (markerStart.value) {
            markerStart.value.setLatLng([newLat, newLng]);
          } else {
            markerStart.value = L.marker([newLat, newLng]).addTo(map.value);
          }

          // Calculate and display the distance
          if (markerEnd.value) {
            traveledDistance.value = markerEnd.value.getLatLng().distanceTo([newLat, newLng]);
          }

          // Update the end marker position or create a new one if it doesn't exist
          if (markerEnd.value) {
            markerEnd.value.setLatLng([newLat, newLng]);
          } else {
            markerEnd.value = L.marker([newLat, newLng]).addTo(map.value);
          }
        });
      }
    };

    onMounted(() => {
      if (mapContainer.value) {
        map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map.value);
      }
    });

    return {
      lat,
      lng,
      getLocation,
      map,
      traveledDistance,
      markerStart,
      markerEnd,
      mapContainer,
    };
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
