export const useUserLocation = () => {

    const config = useRuntimeConfig()

    const getUserLocation = async () => {

        try {
            // Check if geolocation is supported by the browser
            if ('geolocation' in navigator) {
                const position: any = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                // Use the geolocation coordinates to fetch the city name from a reverse geocoding API
                const { latitude, longitude } = position?.coords;
                const apiKey = config.public.OPEN_WEATHER_API_KEY;
                const apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;

                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data && data.length > 0) {
                    return data[0].name;
                }
            } else {
                console.error('Geolocation is not available in this browser.');
            }
        } catch (error) {
            if (error instanceof GeolocationPositionError) {
                console.error('Geolocation error code:', error.code);
                console.error('Geolocation error message:', error.message);
            } else {
                console.error('Error fetching user location:', error);
            }
        }
    }

    return {
        getUserLocation
    }
}