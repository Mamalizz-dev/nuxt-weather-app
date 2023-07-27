import { useStore } from "~/stores"

export const useHomeService = () => {
    
// state

    const store = useStore()

// methods

    const setHomeCurrentData = (data: any) => {
        store.setCurrentData(data)
    }

    const setHomeForecastData = (data: any) => {
        store.setForecastData(data)
    }

// computed

    const homeCurrentData = computed(() => store.getCurrentData)
    const homeforecastData = computed(() => store.getCurrentData)




    return {
        setHomeCurrentData,
        homeCurrentData,
        setHomeForecastData,
        homeforecastData
    }
}