import React, {useState, useEffect} from 'react';
import styles from "./Search.module.css";

export default function Search() {
    const [country, setCountry] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(()=>{
        fetch("https://restcountries.com/v3.1/all")
        .then((response)=> response.json())
        .then((data)=>setCountry(data))
        .catch((error)=>{
            console.log("Error in fetching countries: ", error);
        })
    },[])

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredCountries = country.filter((country) => (
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  return (
    <div className={styles.container}>
        <div className={styles.input}>
            <input type="text" placeholder="Search for countries..." value={searchTerm} onChange={handleChange} />
        </div>
        
        <div className={styles.countryContainer}>
            {filteredCountries.map((country) => (
                <div className={styles.countryCard} key={country.cca3}>
                    <img className={styles.flag} src={country.flags.png} alt={country.cca3}/>
                    <h2>{country.name.common}</h2>
                </div>
            ))}
        </div>
      
    </div>
  )
}
