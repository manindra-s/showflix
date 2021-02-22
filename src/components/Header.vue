<template>
  <div class="header">
    <router-link :to="{ name: 'Home' }">ShowFlix</router-link>
    <Search />
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
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
a {
  margin: 0;
  margin-top: 2px;
  font-family: "Lobster", cursive;
  font-size: 25px;
  letter-spacing: 3px;
  padding: 3px 5px;
  border-radius: 5px;
  color: #fff;
  background-color: rgb(172, 147, 6);
}
@media only screen and (max-device-width: 414px) {
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  a {
    margin: 8px 0;
  }
}
</style>
