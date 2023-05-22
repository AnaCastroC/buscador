import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const MiApi = ({apiData}) => {

const [countries, setCountries] = useState([]);// estado que almacena el array de paises que se obtiene de la API
const [searchedCountry, setSearchedCountry] = useState(""); //estado que almacena el valor que ingresa el usuario en el input S
const [sortOption, setSortOption] = useState("1"); //estado que almacena el valor que selecciona el usuario en el select

//hook que se ejecuta cuando se monta el componente y cuando se actualiza el estado apiData
//se encarga de almacenar en el estado countries el array de paises que se obtiene de la API
useEffect(() => {setCountries(apiData)}, [apiData]); 



//funcion para realizar el filtro de los paises por nombre a partir del valor que ingresa el usuario en el input
const filteredCountries = countries.filter((country) => {
    const searchedValue = searchedCountry.toLowerCase();
    return (country.name?.toLowerCase().includes(searchedValue) ||
            country.capital?.toLowerCase().includes(searchedValue)||
            country.population?.toString().includes(searchedValue)
    );

});


// funcion que toma como argumento el array de paises filtrados y retorna un nuevo array ordenado segun la opcion que selecciona el usuario en el select (el estado sortOption)
  const sortCountries = (countries) => {
    const sortedCountries = [...countries];
    if (sortOption === "1") { // Orden ascendente A-Z
      sortedCountries.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "2") { // Orden descendente Z-A
      sortedCountries.sort((a, b) => b.name.localeCompare(a.name));
    }
    return sortedCountries;
  };

//se almacena en la constante sortedCountries el array de paises ordenados  
const sortedCountries = sortCountries(filteredCountries);

//funcion que captura el valor que ingresa el usuario en el input y lo almacena en el estado searchedCountry
const handleChangeSearch = (event) => { 
  setSearchedCountry(event.target.value);
  console.log(event.target.value);
  
}

// funcion que captura el valor de la opcion que selecciona el usuario en el select y lo almacena en el estado sortOption
const handleChangeSort = (event) => {
    setSortOption(event.target.value);
  };

    return(
        <div className="row mt-3" >
            <nav className="navbar navbar-dark bg-dark row">
                <a className="navbar-brand col-2 m-3">Países y sus banderas</a>
                <div className="container-fluid col-5">
                <form  className="d-flex" role="search">
                <select className="form-select me-2" id="select" aria-label="Default select example" onChange={handleChangeSort}>         
                    <option value="1">Orden ascendente A-Z</option>
                    <option value="2">Orden descendente Z-A</option>
                </select>
                    <input className="form-control me-2" type="search" placeholder="Buscar país" aria-label="Search" onChange={handleChangeSearch}/>
                </form>
                </div>
            </nav>
                   <div className="row d-flex justify-content-around"> 
                        {sortedCountries.map( (country) => (
                            <div className="card m-2 col-2"  key={country.numericCode}>
                                <img src={country.flag} style={{ height: "130px", maxWidth: "200px"}} className="card-img-top ps-1 mt-3" alt={country.name}/>
                                <div className="card-body">
                                    <h4 className="card-text">{country.name}</h4>
                                    <h6 className="card-text">Capital: {country.capital}</h6>
                                    <p className="card-text" style={{ fontSize: '11px' }}>Población: {country.population} personas</p>
                                </div>
                            </div>))}   
                    </div>
        </div>     
    )

}

export default MiApi;