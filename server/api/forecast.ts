import { ApiTypes } from '~/types/types'

export default defineEventHandler((event) => {

    const { location } = getQuery(event)

    const { API_KEY, BASE_URL } = useRuntimeConfig()

    return $fetch(`${BASE_URL}/${ApiTypes.Forecast}?key=${API_KEY}&q=${location}&days=1&aqi=no&alerts=no`, {
        method: 'POST'
    })

})