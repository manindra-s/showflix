<template>
  <div v-if="popularShows.length">
    <div class="shows">
      <div class="show-card" v-for="(show, index) in popularShows" :key="index">
        <router-link :to="{ name: 'Details', params: { showId: show.id } }">
          <div class="show-image">
            <img :src="show.image.medium || show.image.original" alt="Image" />
          </div>
          <div class="show-main">
            <h3 id="name" class="data-name">{{ show.name }}</h3>
            <div class="info">
              <h4 id="language" class="data-language">{{ show.language }}</h4>
              <h4 id="rating" class="data-rating">{{ show.rating.average }}</h4>
            </div>
          </div>
        </router-link>
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
  data() {
    return {};
  },
};
</script>

<style scoped>
.shows {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  margin: 5px;
  background-color: rgb(236, 234, 201);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
.show-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 7px;
  padding: 3px;
  border: 1px solid rgb(236, 234, 201);
}
.show-card:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
h3,
h4 {
  margin: 5px 8px 2px 8px;
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
a,
img {
  width: 100%;
}
@media only screen and (max-device-width: 414px) {
  .show-card {
    border-bottom: 1px solid rgb(172, 147, 6);
  }
  #name {
    margin: 5px 1px 2px 1px;
    max-height: 36px;
  }
}
@media only screen and (max-device-width: 360px) {
  .shows {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  #name {
    margin: 5px 1px 2px 1px;
    max-height: 36px;
    font-size: 20px;
    font-size: 16px;
  }
}
</style>
