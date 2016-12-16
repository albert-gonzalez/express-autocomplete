import Vue from 'vue';
import GameList from './component/game-list.vue';

new Vue({
    el: '#game-list',
    render: h => h(GameList)
});