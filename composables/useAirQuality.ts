export const useAirQuality = (airQualityData: any) => {
    const { co, no2, o3, so2, pm2_5, pm10, 'us-epa-index': usEpaIndex, 'gb-defra-index': gbDefraIndex } = airQualityData;

    // Determine the maximum value of pollutants to assess the overall risk
    const maxPollutantValue = Math.max(co, no2, o3, so2, pm2_5, pm10);

    // Define thresholds for different risk levels (you can adjust these as needed)
    const lowRiskThreshold = 50;
    const moderateRiskThreshold = 100;

    // Calculate the percentage of the maximum pollutant value relative to the maximum risk value
    const maxRiskValue = 100;
    const healthRiskPercent = (maxPollutantValue / maxRiskValue) * 100;

    // Assess the health risk based on the maximum pollutant value
    let healthRiskText;
    if (maxPollutantValue <= lowRiskThreshold) {
        healthRiskText = "Low health risk";
    } else if (maxPollutantValue <= moderateRiskThreshold) {
        healthRiskText = "Moderate health risk";
    } else {
        healthRiskText = "High health risk";
    }

    // Return the health risk text and percentage rounded to two decimal places
    return {
        text: healthRiskText,
        percent: healthRiskPercent.toFixed(2),
    };
}
  