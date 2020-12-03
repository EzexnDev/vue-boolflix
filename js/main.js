const app = new Vue({
    el: "#app",
    data: {
        url: "https://api.themoviedb.org/3/search/movie",
        tvUrl: 'https://api.themoviedb.org/3/search/tv',
        elements: null,
        filteredElements: null,
        filterInput: '',
        filteredGenres: new Set(),
        apiKey: '17160c9710e57a9d16ce6468f0d40d54',
        language: 'en-US',
        includeAdult: true,
        currentPage: 1,
        totalPages: 0,
        imgSrc: "https://image.tmdb.org/t/p/w500/",
        fullStar: false,
    },

    methods: {
        getMovies() {
            console.log("getMovies");
            let queryParams = {
                api_key: this.apiKey,
                language: this.language,
                adult: this.includeAdult,
                page: this.currentPage,
            };
            if (!this.filterInput.isEmpty) {
                queryParams.query = this.filterInput;
            }
            axios
                .get(this.url, {
                    params: queryParams
                })
                .then(response => {
                    this.elements = response.data.results;
                    this.totalPages = response.data.total_pages;
                    this.currentPage = response.data.page;
                    axios
                        .get(this.tvUrl, {
                            params: queryParams
                        })
                        .then(response2 => {
                            this.elements = this.elements.concat(response2.data.results);
                            this.totalPages + (response2.data.total_pages);
                            console.log(response2.data.results);
                        });
                });
        },
        getTvSeries() {
            console.log("getMovies");
            let queryParams = {
                api_key: this.apiKey,
                language: this.language,
                adult: this.includeAdult,
                page: this.currentPage,
            };
            if (!this.filterInput.isEmpty) {
                queryParams.query = this.filterInput;
            }
        },
        setCurrentPage(index) {
            this.currentPage = index;
            this.getMovies();
        },
        // truncateTitle(title, length) {
        //     let suffix = '';
        //     if (title.length > length) {
        //         suffix = '…';
        //     }
        //     return title.substring(0, length) + suffix;
        // },
        getImage(posterPath) {
            if (posterPath && posterPath != null) {
                return this.imgSrc + posterPath;
            }
            return "nopreview.png";
        },
        getStarClass(index, vote) {

            console.log(Math.ceil(vote / 2));
            return index <= Math.ceil(vote / 2) ? 'fas fa-star' : 'far fa-star';
        }
    }
});