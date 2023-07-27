import { defineStore } from "pinia";

export const useStore = defineStore('Store', {
    state: () => ({
        currentLocationData : {}
    }),

    getters: {
        getCurrentLocationData: (state) => state.currentLocationData
    },

    actions: {
        setCurrentLocationData(payload: any){
            try {
                this.currentLocationData = payload
            } catch (error) {
                console.log(error);
            }
        }
    },
    
    persist: true
})
