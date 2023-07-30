import { useUserLocation } from '~/utils/useUserLocation'
import { useCallApi } from '~/api/useCallApi'


export const useGetLocationData = () => {

    const { getUserLocation } = useUserLocation()
    const { getCurrentDataFromApi, getForecastDataFromApi, currentLoading, forecastLoading } = useCallApi()
    const { $gsap: gsap, $Draggable: Draggable } = useNuxtApp();

    const getCurrentLocationData = () => {
        const timeline = gsap.timeline({defaults: {duration: 1}});

        getUserLocation().then((cityName) => {
            getCurrentDataFromApi(cityName).then(() => {
                timeline.fromTo('.degree', { opacity: 0, blur: 1, scale:.95 }, { opacity: 1, blur: 0, scale: 1 })
            }).then(() => {
                getForecastDataFromApi(cityName).then(() => {
                    timeline.fromTo('.hotbar', { y: '100%' }, { y: '0%', ease: 'Bounce.easeOut'})
                    timeline.from('.hourly' , { opacity: 0, stagger: 0.2,  duration: 1})
                })
            })
        })
    }

    const getSelectedLocationData = (cityName: string) => {
        const timeline = gsap.timeline({defaults: {duration: 1}});

        getCurrentDataFromApi(cityName).then(() => {
            timeline.fromTo('.degree', { opacity: 0, blur: 1, scale:.95 }, { opacity: 1, blur: 0, scale: 1 })
        }).then(() => {
            getForecastDataFromApi(cityName).then(() => {
                timeline.fromTo('.hotbar', { y: '100%' }, { y: '0%', ease: 'Bounce.easeOut'})
                timeline.from('.hourly' , { opacity: 0, stagger: 0.2,  duration: 1})
            })
        })
    }

    return {
        getCurrentLocationData,
        getSelectedLocationData,
        currentLoading,
        forecastLoading
    }
}