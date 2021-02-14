<template>
  <div class="header">
    <router-link :to="{ name: 'Home' }"><h1>ShowFlix</h1></router-link>
    <Search />
  </div>
</template>

<script>
import Search from "./Search.vue";
export default {
  name: "Header",
  components: {
    Search,
  },
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
}
h1 {
  margin: 0;
  font-family: "Lobster", cursive;
  color: rgb(172, 147, 6);
  letter-spacing: 2px;
}
@media only screen and (max-device-width: 414px) {
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h1 {
    margin: 8px 0;
  }
}
</style>
