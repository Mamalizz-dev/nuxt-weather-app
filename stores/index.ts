import { defineStore } from "pinia";
import { StoreTypes } from "~/types/types";
import { useSessionStorage, useLocalStorage } from "@vueuse/core";

export const useStore = defineStore('store', {
    state: () => ({
        current : useSessionStorage('current', {}),
        forecast : useSessionStorage('forecast', {}),
        search : useSessionStorage('search', []),
        savedLocations : useLocalStorage('saved-locations', []),
    } as StoreTypes ),

    getters: {
        getCurrentData: (state) => state.current,
        getForecastData: (state) => state.forecast,
        getSearchData: (state) => state.search,
        getSevedLocations: (state) => state.savedLocations
    },

    actions: {

        setCurrentData(payload: any){
            try {
                this.current = payload
            } catch (error) {
                console.log(error);
            }
        },

        setForecastData(payload: any){
            try {
                this.forecast = payload
            } catch (error) {
                console.log(error);
            }
        },

        setSearchData(payload: any){
            try {
                this.search = payload
            } catch (error) {
                console.log(error);
            }
        },

        setSavedLocations(payload: any){
            try {
                this.savedLocations.push(payload)
            } catch (error) {
                console.log(error);
            }
        }
    },
    
    persist: false
})
