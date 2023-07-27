import { defineStore } from "pinia";

export const useStore = defineStore('Store', {
    state: () => ({
        current : {},
        forecast : {}
    }),

    getters: {
        getCurrentData: (state) => state.current,
        getForecastData: (state) => state.forecast
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
                this.current = payload
            } catch (error) {
                console.log(error);
            }
        }
    },
    
    persist: true
})
