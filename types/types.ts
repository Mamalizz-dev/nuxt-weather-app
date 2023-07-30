enum ApiTypes {
    Current = 'current.json',
    Forecast = 'forecast.json',
    Search = 'search.json',
}

interface StoreTypes {
    current: any,
    forecast: any,
    search: any,
    savedLocations: any
}

export { 
    ApiTypes , StoreTypes
}