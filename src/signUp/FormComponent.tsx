import { useState, FormEvent } from "react";
import { City, Country, State } from "./FormTypes";
import { useForm } from "./FormHook";
import "./styles.css";

function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    city: "",
    email: "",
    password: "",
  });

  const { countries, states, cities } = useForm(formData);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div className="formContainer">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
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
            {countries.map((country: Country) => (
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
            <option value="">Select state</option>
            {states.map((state: State) => (
              <option key={state.state_name} value={state.state_name}>
                {state.state_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>City:</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          >
            <option value="">Select city</option>
            {cities.map((city: City) => (
              <option key={city.city_name} value={city.city_name}>
                {city.city_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
