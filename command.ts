import { CountriesLocalService } from './countries-local.service';

let countriesServices = new CountriesLocalService();

function getByCountryCode(countryCode): Promise<any> {
    let countryInfo = countriesServices.getByCountryCode(countryCode);

    if (countryInfo != null && countryInfo != undefined) {
      return new Promise((resolve, reject) => {
        resolve(countryInfo);
      });
    }

    const apiUrl = `https://restcountries.com/v2/alpha/${countryCode}`;

    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const { latlng } = data; // Extract latitude and longitude from the response
        
        countryInfo = {}
        countryInfo.Latitude = latlng[0];
        countryInfo.Longitude = latlng[1];

        return countryInfo;
      })
      .catch(error => console.error(error));
  }