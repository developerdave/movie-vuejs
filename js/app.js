
Vue.component('movie-list', {
    template: '#movie-list-template',
    data() {
        return {
            /** Movie API Key */
            apiKey: movieConfig.common.api_key,

            /** Holds movies */
            movies: []
        }
    },
    methods: {
        /**
         * Retrieve list of movies currently playing
         * in the cinema.
         */
        getNowPlaying() {
            var self = this;
            theMovieDb.movies.getNowPlaying({'language': 'en-GB', 'region': 'GB'}, function(data){
                self.movies = JSON.parse(data).results;
                console.log(self.movies);
            }, function(error) {
                console.log('An error occurred: ' + error);
            });
        },

        getPosterPath(posterPath) {
            return theMovieDb.common.getImage({size: 'w185', file: posterPath});
        }
     },
    created() {
        theMovieDb.common.api_key = this.apiKey;
        this.getNowPlaying();
    }
});

/**
 * Initialize Vue.
 */
new Vue({
    el: '#app'
});
