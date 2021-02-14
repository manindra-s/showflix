<template>
  <div>
    <h1>Cast</h1>
    <div v-if="castInfo.length > 0" class="cast">
      <div
        class="cast-card"
        v-for="(cast, index) in castInfo.slice(0, 10)"
        :key="index"
      >
        <div v-if="cast.image">
          <img :src="cast.image.original || cast.image.medium" alt="Image" />
        </div>
        <h4 v-if="cast.name">{{ cast.name }}</h4>
      </div>
    </div>
    <div class="no-data" v-else>No Cast Found</div>
  </div>
</template>

<script>
export default {
  name: "CastDetails",
  props: {
    castInfo: Array,
  },
};
</script>

<style scoped>
.cast {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  color: #fff;
}
h1 {
  color: #fff;
  text-align: left;
  text-decoration: underline;
}
.cast-card {
  margin: 10px;
}
.cast-card > div > img {
  width: 225px;
  height: 300px;
}
@media only screen and (max-device-width: 414px) {
  h1 {
    text-align: center;
  }
}
</style>
