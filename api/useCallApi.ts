import { useHomeService } from '~/composables/useHomeServices'

export const useCallApi = () => {
    
    const currentLoading = ref<boolean>(true)
    const forecastLoading = ref<boolean>(true)
    const searchLoading = ref<boolean>(false)
    const {setHomeCurrentData, setHomeForecastData, setHomeSearchData } = useHomeService()


    const getCurrentDataFromApi = (location: string) => {
        currentLoading.value = true
        return new Promise((resolve: any, reject: any) => {
            try {           
                useLazyFetch<any>(`http://api.weatherapi.com/v1/current.json?key=2b9d02bcfdf14c5d84a53749230201&q=${location}&aqi=no`).then((response: any) => {
                    const { data } = response
                    setHomeCurrentData(toRaw(data.value))
                    currentLoading.value = false
                    resolve(data)
                })
            } catch (error) {
                reject(error)
                console.log(error)
            }
        })
    }

    const getForecastDataFromApi = (location: string) => {
        forecastLoading.value = true
        return new Promise((resolve: any, reject: any) => {
            try {           
                useLazyFetch<any>(`/api/forecast?location=${location}`).then((forecastData) => {
                    if(!! forecastData){
                        setHomeForecastData(forecastData)
                        forecastLoading.value = false
                        resolve(forecastData)
                    }
                })
            } catch (error) {
                reject(error)
                console.log(error)
            }
        })
    }
    
    
    return {
        getCurrentDataFromApi,
        currentLoading,
        getForecastDataFromApi,
        forecastLoading
    }
}