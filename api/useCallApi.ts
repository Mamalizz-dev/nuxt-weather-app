export const useCallApi = () => {
    
    const currentLoading = ref<boolean>(true)
    const forecastLoading = ref<boolean>(false)
    const searchLoading = ref<boolean>(false)


    const getCurrentDataFromApi = () => {

        return new Promise((resolve: any, reject: any) => {

        })

        const { data : currentData} = await useLazyFetch<any>(`http://api.weatherapi.com/v1/current.json?key=2b9d02bcfdf14c5d84a53749230201&q=shiraz&aqi=no`)
        if(!!currentData.value){
            setHomeCurrentData(currentData.value)
            currentPending.value = false
        }
    }
    
    
    return {

    }
}