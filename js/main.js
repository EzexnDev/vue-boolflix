const app = new Vue({
    el: "#app",
    data: {
        url: "https://api.themoviedb.org/3/search/movie",
        elements: null,
        filteredElements: null,
        filterInput: '',
        filteredGenres: new Set(),
        api_key: '17160c9710e57a9d16ce6468f0d40d54',
        language: 'en-US',
        include_adult: true,
        currentPage: 1,
        totalPages: 0,
        imgSrc: "https://image.tmdb.org/t/p/w500/",
    },

    methods: {
        getMovies() {
            console.log("getMovies");
            let queryParams = {
                api_key: this.api_key,
                language: this.language,
                include_adult: this.include_adult,
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
                });
        },
        setCurrentPage(index) {
            this.currentPage = index;
            this.getMovies();
        },
        truncateTitle(title, length) {
            let suffix = '';
            if (title.length > length) {
                suffix = '…';
            }
            return title.substring(0, length) + suffix;
        }
    }
});