<template>
  <div class="search">
    <input
      class="search-input"
      type="text"
      placeholder="Search for a Show"
      ref="search"
      v-model="inputSearch"
      @blur="closeResult"
    />
    <!-- Rendering the search results-->
    <div class="results" v-if="inputSearch.length > 2">
      <div v-if="isLoadingResults">
        Loading
      </div>
      <div v-else-if="!isLoading && results.length && !isLoadingResults">
        <div class="result" v-for="(result, index) in results" :key="index">
          <div class="data-result" @mousedown="handleSearch(result.id)">
            <img
              v-if="result.image"
              :src="result.image.medium"
              alt="thumbnail"
            />
            <img v-else src="http://placehold.jp/150x150.png" alt="thumbnail" />
            <p>{{ result.name }}</p>
          </div>
        </div>
      </div>
      <div v-else-if="!isLoading && !results.length && !isLoadingResults">
        No Such Show Exits
      </div>
    </div>
  </div>
</template>

//
<script>
import { fetchShowSearch } from "@/api.js";
import { throttle } from "lodash";
export default {
  name: "Search",
  data() {
    return {
      inputSearch: "",
      results: [],
      shows: [],
      error: "",
      isLoading: true,
      isLoadingResults: false,
    };
  },
  // watching the inputSearch query and hitting the search api when there is a change in the query
  watch: {
    inputSearch(newSearch) {
      if (newSearch.length > 2) {
        this.searchShow();
      }
    },
  },

  methods: {
    //using throttle to reduce the number of function calls on search query change
    searchShow: throttle(function() {
      this.isLoading = true;
      this.isLoadingResults = true;
      fetchShowSearch(this.inputSearch)
        .then(({ data }) => (this.results = data.map((result) => result.show)))
        .catch((err) => {
          this.error = err;
        });
      this.isLoading = false;
      this.isLoadingResults = false;
    }, 300),

    handleSearch(id) {
      this.inputSearch = "";
      this.results = [];
      this.$router.push({ name: "Details", params: { showId: id } });
    },

    //Resetting the search query to close the search result on outside clicks.
    closeResult() {
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
  padding: 2px 5px;
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
.data-result:hover {
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
