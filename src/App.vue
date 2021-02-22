<template>
  <div class="app">
    <!-- Using keep-alive to retaing the scroll position and also cache the data-->
    <!-- Using $route.fullPath to let router-view replace the component instaed of reusing it-->
    <keep-alive><router-view :key="$route.fullPath"></router-view></keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=EB+Garamond:wght@400;500;600&family=Lobster&display=swap");

body {
  margin: 0px;
  background-color: rgb(224, 224, 224);
}
.app {
  font-family: "EB Garamond", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
}
a,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  cursor: pointer;
  color: #000;
}
</style>
