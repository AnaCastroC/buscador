import MiApi from "./components/MiApi";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [data, setData] = useState([]); //estado que almacenará los datos entregados por la API
  const urlApi = 'https://restcountries.com/v2/all'//url de la API

  //hook useEffect para que la API se ejecute sólo en el montaje del componente useEffect(()=>{...},[])
  useEffect(() => {
  const fetchData = async () => {
    try{const response = await fetch(urlApi);
    const data = await response.json();
    setData(data);
    console.log(urlApi);
    return;
    } catch (error) {
    alert(error);}
  } 
fetchData();}, []);

  return (
    <div style={{minHeight: "100vh"}}>
      <MiApi apiData={data} />
      <footer className="d-flex flex-row-reverse" >
        <p>@Ana</p>
      </footer>
    </div>
  );
}

export default App;
