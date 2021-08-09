<template>
  <MglMap :accessToken="accessToken" :mapStyle="mapStyle">
    <MglGeocoderControl
      :accessToken="accessToken"
      :input.sync="defaultInput"
      @results="handleSearch"
    />
  </MglMap>
</template>

<script>
import { MglMap } from "vue-mapbox";
import MglGeocoderControl from "vue-mapbox-geocoder";

export default {
  name: "App",

  components: {
    MglMap,
    MglGeocoderControl
  },
  data() {
    return {
      accessToken: 'pk.eyJ1Ijoia3JlbmV2a24iLCJhIjoiY2tyOWMwaHU5M3I2djJybnhrdTVkbGRkMyJ9.9ev37MmJWFhSuQ_emwsBEg',
      mapStyle: "mapbox://styles/mapbox/streets-v11",
    };
  },
  methods: {
    handleSearch(event) {
      console.log(event);
    }
  }
};
</script>
