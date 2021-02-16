<template>
  <div class="search">
    <input
      class="search-input"
      type="text"
      placeholder="Search for a Show"
      ref="search"
      v-model="inputSearch"
    />
    <!-- Rendering the search results-->
    <!-- Using v-closable to detect outside clicks and close the search results list -->
    <div
      class="results"
      v-if="!loading && inputSearch.length > 2"
      v-closable="{ exclude: ['search'], handler: 'closeResult' }"
    >
    <div v-if="results.length > 0">
      <div class="result" v-for="(result, index) in results" :key="index">
        <!-- <router-link :to="{ name: 'Details', params: { showId: result.id } }"> -->
          <div class="data-result" @click="handleSearch(result.id)">
            <img v-if="result.image" :src="result.image.medium" alt="thumbnail" />
            <p v-if="result.name">{{ result.name }}</p>
          </div>
        <!-- </router-link> -->
      </div>
      </div>
      <div v-if="!loading && inputSearch.length > 2 && results.length == 0">No Results</div>
    </div>
  </div>
</template>

//
<script>
import { showSearch } from "../api.js";
import { debounce } from "lodash";
export default {
  name: "Search",
  data() {
    return {
      inputSearch: "",
      results: [],
      shows: [],
      error: "",
      loading: true,
    };
  },
  // watching the inputSearch query and hitting the search api when there is a change in the query
  watch: {
    inputSearch(newSearch) {
      if (newSearch.length >= 3) {
        this.searchShow();
      }
    },
  },
  methods: {
    //using debounce to reduce the number of function calls on search query change
    searchShow: debounce(function() {
      this.loading = true;
      showSearch(this.inputSearch)
        .then(({ data }) => (this.results = data.map((result) => result.show)))
        .catch((err) => {
          this.error = err;
        });
      this.loading = false;
    }, 200),
    handleSearch: function(id){
      this.inputSearch = "";
      this.results = [];
      this.$router.push({ name: 'Details', params: { showId: id } });
    },
    //function corresponding to v-closable. Resetting the search query to close the search result on outside clicks.
    closeResult: function() {
      this.inputSearch = "";
    },
  },
};
</script>

<style scoped>
.search {
  position: relative;
}
.search-input {
  width: 260px;
  height: 25px;
  border: 2px solid #000;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  padding: 2px 5px;
  font-family: "EB Garamond", serif;
  font-size: 18px;
}
.results {
  border: 2px solid #000;
  position: absolute;
  top: 10;
  right: 10;
  width: 260px;
  background-color: #fff;
  border-radius: 5px;
  max-height: 400px;
  overflow-y: auto;
}
.data-result {
  text-align: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  border: 3px solid #fff;
  padding: 2px;
  cursor: pointer;
}
.data-result:hover{
  background-color: rgb(201, 171, 4);
  }
img {
  width: 50px;
  margin-right: 5px;
}
p {
  margin-left: 5px;
  text-align: left;
}
</style>
