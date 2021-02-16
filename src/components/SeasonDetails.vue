<template>
  <div>
    <h1>Seasons</h1>
    <div v-if="seasonInfo.length > 0" class="seasons">
      <div
        class="season-card"
        v-for="season in seasonInfo"
        :key="season.number"
      >
        <h3 class="season-title">Season {{ season.number }}</h3>
        <h3><span>Episodes:</span> <span class="episode">{{ season.episodeOrder || "NA" }}</span></h3>
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
  margin-left: 10px;
  text-decoration: underline;
}
.season-card > h3 {
  margin: 2px 30px 2px 10px;
}
.season-title {
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 1px 3px;
}
@media only screen and (max-device-width: 414px) {
  .season-card {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  h1 {
    text-align: center;
  }
  .season-card > h3 {
  margin: 2px 10px;
}
}
</style>
