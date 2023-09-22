// useForm.ts
import { useState, useEffect, useMemo } from 'react';
import { getCountries, getStates, getCities } from '../utils/api';

export function useForm(formData: {
  firstName: string,
  lastName: string,
  country: string,
  state: string,
  city: string,
  email: string,
  password: string
}) {
  const [countriesList, setCountriesList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        setCountriesList(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const data = await getStates(formData.country);
        setStatesList(data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    if (formData.country) {
      fetchStates();
    }
  }, [formData.country]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCities(formData.state);
        setCitiesList(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    if (formData.state) {
      fetchCities();
    }
  }, [formData.state]);

  return useMemo(() => {
    return {
      countries: countriesList,
      states: statesList,
      cities: citiesList,
    };
  }, [countriesList, statesList, citiesList]);
}
