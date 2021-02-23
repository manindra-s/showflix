<template>
  <div class="show-details">
    <div v-if="Object.keys(showInfo).length" class="top">
      <h1 class="show-name">{{ showInfo.name }}</h1>
      <h3 class="show-genres">{{ showInfo.genres.join(" | ") }}</h3>
      <div class="details-row">
        <h3>Premiered: {{ showInfo.premiered || "NA" }}</h3>
        <h3 class="show-status">Status: {{ showInfo.status || "NA" }}</h3>
        <h3>Language: {{ showInfo.language || "NA" }}</h3>
        <h3>
          Rating:
          <span class="show-rating">{{ showInfo.rating.average || "NA" }}</span>
        </h3>
      </div>
      <p class="show-summary" v-html="showInfo.summary"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsMain",
  props: {
    showInfo: Object,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.show-details {
  color: #fff;
}
h1 {
  font-size: 50px;
  font-family: "Lobster", cursive;
  text-align: center;
  letter-spacing: 4px;
  margin-top: 10px;
}
.show-genres {
  text-align: left;
  margin-left: 20px;
}
.details-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 10px;
}
.details-row > h3 {
  margin: 5px 30px 5px 20px;
}
.show-summary {
  margin: 20px;
  padding: 10px;
  background-color: #fff;
  color: #000;
  font-size: 100%;
  box-shadow: rgba(205, 205, 162, 0.25) 0px 50px 100px -20px,
    rgba(255, 255, 255, 0.3) 0px 30px 60px -30px,
    rgba(245, 218, 191, 0.35) 0px -2px 6px 0px inset;
}
.show-rating {
  border-radius: 5px;
  color: #fff;
  background-color: rgb(172, 147, 6);
  padding: 1px 8px;
}
@media only screen and (max-device-width: 414px) {
  .details-row {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .details-row > h3 {
    margin: 5px 0px;
  }
  .show-genres {
    text-align: center;
    margin-left: 0px;
  }
  h1 {
    text-align: center;
  }
}
</style>
