import { ApiTypes } from "~/types/types"

export default defineEventHandler((event) => {
    const { query } = getQuery(event)

    const { API_KEY, BASE_URL } = useRuntimeConfig()

    return $fetch(`${BASE_URL}/${ApiTypes.Search}?key=${API_KEY}&q=${query}`, {method: 'POST'})
})