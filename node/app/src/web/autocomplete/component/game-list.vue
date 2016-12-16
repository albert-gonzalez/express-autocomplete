<template>
  <div id="game-list" class="row">
    <div class="column small-12">
      <label>Search a game:
        <input class="large" v-on:keyup="search" type="text" placeholder="Your search"/>
      </label>
      <table class="hover">
        <tbody>
          <tr v-for="game in games">
            <td>
              <a target="_blank" v-bind:href="game.site_detail_url">{{ game.name }}</a>
            </td>
          </tr>
        </tbody>
      </table>
      <h3 v-if="!games.length">No results found :(</h3>
    </div>
  </div>
</template>

<script>
import qwest from "qwest";
import { debounce } from "lodash";

function makeRequest(event) {
console.log(event);
  qwest.get(`/api/games/autocomplete?q=${event.target.value}`)
    .then((xhr, response) => {
      this.games = response.data;
  });
}

export default {
  data() {
    return {
        games: []
    }
  },
  methods: {
    search: debounce(function (event) {
      makeRequest.bind(this)(event);
    }, 500)
  }
}
</script>

<style lang="scss">
  @import "../../style/common";
.example {
  color: red;
}
</style>