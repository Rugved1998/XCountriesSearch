import { useEffect, useState } from "react";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error while fetching data: ", err));
  }, []);

  const flagStyle = { height: "100px", width: "100px" };
  const cardStyle = {
    width: "200px",
    border: "1px solid black",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    minHeight: "100vh",
  };
  const searchbarStyle={
    display:"flex",
    justifyContent:"center",
    backgroundColor:"#DCDCDC"
  }
  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <div style={searchbarStyle}> 
        <input size="50"
        type="text"
        placeholder="Search for a country"
        onChange={handleSearch}
        value={searchTerm}
      /></div>
    <div style={containerStyle}>
     
     
      
      {filteredCountries.length === 0 ? (
        <p>No countries match the search term</p>
      ) : (
        filteredCountries.map((country) => (
          <div key={country.cca3} className="countryCard" style={cardStyle}>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              style={flagStyle}
            />
            <h2>{country.name.common}</h2>
          </div>
        ))
      )}
    </div>
     </div>
  );
}
