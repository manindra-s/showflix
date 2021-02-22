<template
  ><div class="Home">
    <Header />
    <div v-if="error" class="error">
      <h3 class="data-error">
        Uh Oh! Seems the server is sleeping and not responding. Loading shows
        from temporary data.
      </h3>
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
        v-for="genre in showGenres.slice(0, 5)"
        :key="genre.name"
        class="genre"
      >
        <h3>
          {{ genre.title }}
        </h3>
        <div>
          <MainCard v-bind:popularShows="genre.shows.slice(0, 6)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import MainCard from "@/components/MainCard";

import { fetchAllShows } from "@/api.js";
import showData from "@/showData.js";

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
  created() {
    fetchAllShows()
      .then(({ data }) => (this.shows = data))
      .catch((err) => {
        this.error = err;
        const newShows = showData.map((shows) => shows.show);
        this.shows = newShows;
        this.popularShows = this.sortShows(this.shows).slice(0, 12);
      });

    this.popularShows = this.sortShows(this.shows).slice(0, 12);
  },
  //Extracting unique genres from the fetched shows using javascript's new Set method.
  computed: {
    genreTitles() {
      const filterGenres = this.shows.map((shows) => shows.genres);
      return [...new Set(filterGenres.flat())]; //returning list of unique genres from all shows
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
    sortShows(shows) {
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-transform: capitalize;
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
