import { defineStore } from "pinia";
import { StoreTypes } from "~/types/types";

export const useStore = defineStore('Store', {
    state: () => ({
        current : {},
        forecast : {},
        search : []
    } as StoreTypes ),

    getters: {
        getCurrentData: (state) => state.current,
        getForecastData: (state) => state.forecast,
        getSearchData: (state) => state.search
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
        }
    },
    
    persist: true
})
