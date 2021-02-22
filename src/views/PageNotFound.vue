<template>
  <div>
    <Header />
    <!-- Rendering 404 Error Page in case of invalid route-->
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <router-link :to="{ name: 'Home' }"
        ><h2>
          Click Here To Go To <span>ShowFlix</span> Home Page
        </h2></router-link
      >
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "PageNotFound",
  components: {
    Header,
  },
};
</script>

<style scoped>
.not-found {
  margin: auto;
}
span {
  text-decoration: underline;
  font-family: "Lobster", cursive;
  color: rgb(172, 147, 6);
  letter-spacing: 2px;
}
</style>
