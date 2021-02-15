<template
  ><div class="Home">
    <Header />
    <div v-if="error" class="error">
      <h1 class="data-error">
        Something is Not Quite Right. Please Reload The Page
      </h1>
    </div>
    <!-- Rendering popular shows through MainCard component-->
    <div v-if="popularShows.length" class="popular-section">
      <h2 class="data-popular"><span>Popular Shows</span></h2>
      <MainCard v-bind:popularShows="popularShows" />
    </div>
    <!-- Rendering Genres and popular shows in each genre through MainCard component-->
    <div v-if="showGenres.length" class="genre-section">
      <h2><span>Popular Shows Based On Genre</span></h2>
      <div
        v-for="genre in showGenres.slice(0, 6)"
        :key="genre.name"
        class="genre"
      >
        <h3>
          {{ genre.title }}
        </h3>
        <div>
          <MainCard v-bind:popularShows="genre.shows.slice(0, 10)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import MainCard from "../components/MainCard";

import { allShows } from "../api.js";

export default {
  name: "Home",
  components: {
    Header,
    MainCard,
  },
  data() {
    return {
      shows: [],
      popularShows: [],
      error: "",
    };
  },
  //fetching all shows in the created hook and sorting them based on the rating into popularShows
  async created() {
    await allShows()
      .then(({ data }) => (this.shows = data))
      .catch((err) => {
        this.error = err;
      });
    this.popularShows = this.sortShows(this.shows).slice(1, 16);
  },
  //Extracting unique genres from the fetched shows using javascript's new Set method.
  computed: {
    genreTitles() {
      const filterGenres = this.shows.map((shows) => shows.genres);
      // const genres = filterGenres.flat();
      return Array.from(new Set(filterGenres.flat())); //returning list of unique genres from all shows
    },
    showGenres() {
      return this.genreTitles.map((genre) => {
        //Filtering shows based on the genre
        const genreShows = this.shows.filter((show) =>
          show.genres.includes(genre)
        );
        //returning the genre title and shows filtered above after sorting them as per their rating
        return {
          title: genre,
          shows: this.sortShows(genreShows),
        };
      });
    },
  },
  methods: {
    //method to sort the shows based on their rating
    sortShows: function(shows) {
      return shows
        .filter((show) => show.rating.average)
        .sort((a, b) => (a.rating.average < b.rating.average ? 1 : -1));
    },
  },
};
</script>

<style>
.Home {
  position: relative;
}
.error {
  position: absolute;
  top: 30vh;
  left: 25vw;
}
.genre > h3 {
  text-align: left;
  margin-left: 30px;
  font-weight: 700;
  font-size: 25px;
  text-transform: uppercase;
  letter-spacing: 4px;
}
.popular-section,
.genre-section {
  margin: 20px 0;
}
.popular-section > h2 > span,
.genre-section > h2 > span {
  padding: 3px 5px;
  border-radius: 5px;
  color: #fff;
  background-color: rgb(172, 147, 6);
  text-transform: uppercase;
  letter-spacing: 2px;
}
</style>
