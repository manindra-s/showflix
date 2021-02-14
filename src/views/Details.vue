<template>
  <div>
    <Header />
    <!-- Checking if showInfo object has data-->
    <div v-if="Object.keys(showInfo).length > 0">
      <div
        class="details"
        :style="{
          backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.85),
      rgba(0, 0, 0, 0.85)
    ),url(${showInfo.image.original})`,
        }"
      >
        <!-- Rendering season details, cast details of a show through DetailsMain, SeasonDetails, CastDetails components-->
        <details-main :showInfo="showInfo" />
        <season-details :seasonInfo="seasonInfo" />
        <Cast :castInfo="castInfo" />
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header";
import DetailsMain from "../components/DetailsMain";
import Cast from "../components/Cast";
import SeasonDetails from "../components/SeasonDetails";

import { showDetails, castDetails, seasonDetails } from "../api.js";

export default {
  name: "Details",
  components: {
    DetailsMain,
    Cast,
    SeasonDetails,
    Header,
  },
  data() {
    return {
      showInfo: {},
      castInfo: [],
      seasonInfo: [],
    };
  },
  //beforeRouteUpdate is used to reuse the same component(details) but update the data if there is change in the route params.
  beforeRouteUpdate(to, from, next) {
    this.loadShowDetails(to.params.showId);
    next();
  },
  //loading the show details, cast details and season details of the show based on the id sent through route params.
  created() {
    this.loadShowDetails(this.$route.params.showId);
  },
  methods: {
    loadShowDetails: async function(id) {
      await showDetails(id).then(({ data }) => (this.showInfo = data));
      //fetching and extracting cast person information from cast details.
      await castDetails(id).then(
        ({ data }) => (this.castInfo = data.map((cast) => cast.person))
      );
      //fetching all season details of the show.
      await seasonDetails(id).then(({ data }) => (this.seasonInfo = data));
    },
  },
};
</script>
<style scoped>
.details {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
