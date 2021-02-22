<template>
  <div>
    <Header />
    <div class="back-section">
      <router-link class="back" :to="{ name: 'Home' }">Go To Home</router-link>
    </div>
    <!-- Checking if showInfo object has data-->

    <div v-if="!isLoading && Object.keys(showInfo).length">
      <div
        class="details"
        :style="{
          backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.8)
    ),url(${imageSrc})`,
        }"
      >
        <!-- Rendering season details, cast details of a show through DetailsMain, SeasonDetails, CastDetails components-->
        <DetailsMain :showInfo="showInfo" />
        <SeasonDetails :seasonInfo="seasonInfo" />
        <Cast :castInfo="castInfo" />
      </div>
    </div>
    <div v-if="error"><h1>No Such Show Exists</h1></div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import DetailsMain from "@/components/DetailsMain";
import Cast from "@/components/Cast";
import SeasonDetails from "@/components/SeasonDetails";

import {
  fetchShowDetails,
  fetchCastDetails,
  fetchSeasonDetails,
} from "../api.js";

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
      isLoading: true,
      imageSrc: "",
      error: "",
    };
  },
  //loading the show details, cast details and season details of the show based on the id sent through route params.
  created() {
    this.loadShowDetails(this.$route.params.showId);
  },
  methods: {
    loadShowDetails(id) {
      this.isLoading = true;
      fetchShowDetails(id)
        .then(({ data }) => {
          this.showInfo = data;
          this.setBackgroundImage(this.showInfo);
        })
        .catch((err) => (this.error = err));

      //fetching and extracting cast person information from cast details.
      fetchCastDetails(id)
        .then(({ data }) => (this.castInfo = data.map((cast) => cast.person)))
        .catch((err) => (this.error = err));

      //fetching all season details of the show.
      fetchSeasonDetails(id)
        .then(({ data }) => (this.seasonInfo = data))
        .catch((err) => (this.error = err));
      this.isLoading = false;
    },
    setBackgroundImage(shows) {
      if (shows.image != null) {
        this.imageSrc = shows.image.original || shows.image.medium;
      }
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
.back-section {
  display: flex;
  justify-content: flex-start;
}
.back {
  text-decoration: underline;
  width: 110px;
  margin: 5px 0px;
}
@media only screen and (max-device-width: 414px) {
  .back-section {
    display: flex;
    justify-content: center;
  }
}
</style>
