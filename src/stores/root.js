import {defineStore} from "pinia";
import {shallowRef} from "vue";
import axios from "axios";
import {API_KEY, BASE_FILMS_URL} from "@/constants";


export const useRootStore = defineStore('root', {
    state: () => ({
        filmInfo: [],
        filmName: '',
        filmsSearch:[],
        genreCase:'',
        topFilms250:[],
        list:shallowRef('most_pop_movies'),
    }),
    actions: {
        async getFilm() {
            const options = {
                method: 'GET',
                url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${this.filmName}`,
                params: {

                    titleType: 'movie',
                    limit: '20',
                    sort: 'year.decr',
                    list: 'most_pop_movies',
                    info: 'base_info'

                },
                headers: {
                    'X-RapidAPI-Key': '69636914a6mshed648cbb5127466p1d9a31jsndd0ef5c5e50e',
                    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                this.filmInfo = response?.data?.results
                console.log(this.filmInfo);
            } catch (error) {
                console.log(error);
            }
        },
        async getStartedFilm(){
            const options = {
                method: 'GET',
                url: 'https://moviesdatabase.p.rapidapi.com/titles/random',
                params: {
                    genre: this.genreCase,
                    info: 'base_info',
                    limit: '12',
                    list: this.list,

                },
                headers: {
                    'X-RapidAPI-Key': '69636914a6mshed648cbb5127466p1d9a31jsndd0ef5c5e50e',
                    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                this.filmInfo = response?.data?.results
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        },

    }
})