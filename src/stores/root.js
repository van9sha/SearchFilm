import {defineStore} from "pinia";
import {shallowRef} from "vue";
import axios from "axios";
import {API_KEY, BASE_FILMS_URL} from "@/constants";


export const useRootStore = defineStore('root', {
    state: () => ({
        filmInfo: [],
        filmName: ''
    }),
    actions: {
        async getFilm() {
            const options = {
                method: 'GET',
                url: 'https://moviesdatabase.p.rapidapi.com/titles/search/title/Fury',
                params: {
                    exact: 'true',
                    titleType: 'movie',
                    limit: '5'
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
        }

    }
})