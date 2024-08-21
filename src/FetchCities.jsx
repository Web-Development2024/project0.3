const fetchCities = async () => {
    try {
      const response = await fetch('https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab');
      if (!response.ok) {
        throw new Error('Failed to fetch cities');
      }
      const data = await response.json();
      return data.result.records.map(city => ({
        label: city['שם_ישוב'],
        value: city['שם_ישוב']
      }));
    } catch (error) {
      console.error('Error fetching cities:', error);
      return []; // Return an empty array in case of error
    }
  };
  
  export default fetchCities;
  