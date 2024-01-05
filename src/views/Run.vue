<template>
  <div class="mainMap">
    <div>
    <div ref="mapContainer" style="width: 50%; height: 600px; border: 1px solid black; margin-top: 20vh;margin-bottom: 10vh;margin-left: 23vw"></div>
      <button v-on:click="getLocation">Start run</button>
      {{lat}},{{lng}}
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
  const mapContainer = ref(null);

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          lat.value = position.coords.latitude;
          lng.value = position.coords.longitude;
          map.value.setView([lat.value, lng.value], 13);
        });
      }
    };


  onMounted(() => {
  if (mapContainer.value) {
  map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map.value);
}
});

  return {
  lat,
  lng,
  getLocation,
  map,
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