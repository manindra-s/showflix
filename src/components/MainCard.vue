<template>
  <div v-if="popularShows">
    <div class="shows">
      <div class="show-card" v-for="(show, index) in popularShows" :key="index">
        <div class="show-image">
          <img :src="show.image.medium || show.image.original" alt="Image" />
        </div>
        <div class="show-main">
          <router-link :to="{ name: 'Details', params: { showId: show.id } }"
            ><h3 id="name" class="data-name">{{ show.name }}</h3></router-link
          >
          <div class="info">
            <h4 id="language" class="data-language">{{ show.language }}</h4>
            <h4 id="rating" class="data-rating">{{ show.rating.average }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainCard",
  props: {
    popularShows: Array,
  },
};
</script>

<style scoped>
.shows {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  margin: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
.show-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
}
/* .show-image > img {
  min-width: 230px;
  max-height: 280px;
}
.show-main {
  min-width: 200px;
} */
h3,
h4 {
  margin: 5px 8px 10px 8px;
}
.info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#rating {
  border-radius: 5px;
  color: #fff;
  background-color: rgb(172, 147, 6);
  padding: 1px 5px;
}
</style>
