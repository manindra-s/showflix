<template>
  <div>
    <h1>Seasons</h1>
    <div v-if="seasonInfo.length > 0" class="seasons">
      <div
        class="season-card"
        v-for="season in seasonInfo"
        :key="season.number"
      >
        <a class="season-title" :href="season.url" target="_blank"
          >Season {{ season.number }}</a
        >
        <h3>
          <span>Episodes:</span>
          <span class="episode">{{ season.episodeOrder || "NA" }}</span>
        </h3>
        <h3><span>Premiere Date: </span>{{ season.premiereDate || "NA" }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SeasonDetails",
  props: {
    seasonInfo: Array,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.season-card {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: #fff;
  text-align: left;
  margin-bottom: 20px;
}
h1 {
  color: #fff;
  text-align: left;
  margin-left: 20px;
  text-decoration: underline;
}
.season-card > h3,
a {
  margin: 2px 30px 2px 20px;
}
.season-title {
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 1px 3px;
  font-weight: bold;
}
a,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  cursor: pointer;
  color: #000;
}

@media only screen and (max-device-width: 414px) {
  .season-card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .season-title {
    max-width: 220px;
  }
  h1 {
    text-align: center;
  }
  .season-card > h3,
  a {
    margin: 2px 10px;
  }
}
</style>
