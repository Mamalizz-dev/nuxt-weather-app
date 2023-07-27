import { ApiTypes } from '~/types/types'

export default defineEventHandler(async(event: any) => {
    
    const { location } = getQuery(event)

    const { BASE_URL, API_KEY } = useRuntimeConfig()

    return await $fetch(`${BASE_URL}/${ApiTypes.Current}?key=${API_KEY}&q=${location}&aqi=yes`, {
        method: 'POST'
    })

})  