import { useStore } from "~/stores"

export const useHomeService = () => {
    
// state

    const store = useStore()

// methods

    const setHomeCurrentLocationData = (data: any) => {
        store.setCurrentLocationData(data)
    }

// computed

    const homeCurrentLocationData = computed(() => store.getCurrentLocationData)




    return {
        setHomeCurrentLocationData,
        homeCurrentLocationData
    }
}