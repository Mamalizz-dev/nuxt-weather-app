enum ApiTypes {
    Current = 'current.json',
    Forecast = 'forecast.json',
    Search = 'search.json',
}

interface StoreTypes {
    current: any,
    forecast: any,
    search: any
}

export { 
    ApiTypes , StoreTypes
}