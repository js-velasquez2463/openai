import React, { useState, useEffect } from "react";

function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    city: "",
    email: "",
    password: ""
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    // Obtener el token de acceso universal
    fetch("https://www.universal-tutorial.com/api/getaccesstoken", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "api-token":
          "OtBahzcXeaFN676_Dyyiq-yXO4sJUwWrrBq5PRCHbjn12kvZxFOeQtc0UkTVdliyKAM",
        "user-email": "js.velasquez2463@gmail.com"
      }
    })
      .then((response) => {
        const resp = response.json();
        return resp;
      })
      .then((data) => {
        console.log("respp2", data);
        setToken(data.auth_token);
      })
      .catch((error) => {
        console.error("Error al obtener el token:", error);
      });
  }, []);

  useEffect(() => {
    console.log("token", token);
    // Obtener la lista de estados
    if (!!token) {
      fetch("https://www.universal-tutorial.com/api/countries", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      })
        .then((response) => {
          const resp = response.json();
          return resp;
        })
        .then((data) => {
          console.log("esta dataa", data);
          setCountries(data);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de estados:", error);
        });
    }
  }, [token]);

  useEffect(() => {
    // Obtener la lista de ciudades basada en el estado seleccionado
    console.log("countryy", formData.country);
    if (token && formData.country) {
      fetch(
        `https://www.universal-tutorial.com/api/states/${formData.country}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        }
      )
        .then((response) => {
          const resp = response.json();
          return resp;
        })
        .then((data) => {
          console.log("dataaa", data);
          setStates(data);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de estados:", error);
        });
    }
  }, [formData.country, token]);

  useEffect(() => {
    // Obtener la lista de ciudades basada en el estado seleccionado
    if (token && formData.state) {
      console.log("formData.state", formData.state);
      fetch(`https://www.universal-tutorial.com/api/cities/${formData.state}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      })
        .then((response) => {
          const resp = response.json();
          return resp;
        })
        .then((data) => {
          console.log("dataaa", data);
          setCities(data);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de ciudades:", error);
        });
    }
  }, [formData.state, token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Country:</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country.country_name} value={country.country_name}>
                {country.country_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>State:</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar estado</option>
            {states.map((state) => (
              <option key={state.state_name} value={state.state_name}>
                {state.state_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Ciudad:</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar ciudad</option>
            {cities.map((city) => (
              <option key={city.city_name} value={city.city_name}>
                {city.city_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default SignupForm;
