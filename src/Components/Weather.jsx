import React, { useEffect, useState } from "react";
import './Weather.css'
import axios from 'axios'
const Weather = () => {
  const [data, setData] = useState({})
  const [location, setLocation] = useState("")

  useEffect(() => {
    const fetchDefaultLocation = async () => {
      const defaultLocation = "Ghaziabad"
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=19657ac5a3745f6aa68c734130653be9`
      const response = await axios.get(url)
      setData(response.data)
    }
    fetchDefaultLocation();
  }, [])

  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=19657ac5a3745f6aa68c734130653be9`

    try {
      const response = await axios.get(url)
      if (response.data.cod !== 200) {
        setData({ notFound: true })
      }
      else {
        setData(response.data)
        setLocation('')
        console.log(response.data);
      }
    }
    catch (error) {
      if (error.response && error.response.status === 404) {
        setData({ notFound: true })
      } else {
        console.error("An unexpected error occured", error)
      }
    }
  }

  const handleInputChange = (e) => {
    setLocation(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  }

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return <i className="bx bxs-sun"></i>
      case "Clouds":
        return <i className="bx bxs-cloud"></i>
      case "Rain":
        return <i className="bx bxs-cloud-rain"></i>
      case "Thunderstorm":
        return <i className="bx bxs-cloud-lightning"></i>
      case "Snow":
        return <i className="bx bxs-cloud-snow"></i>
      case "Smoke":
        return <i class='bx bxs-cloud smoke'></i>
      case "Drizzle":
        return <i className="bx bxs-cloud-drizzle"></i>

      case "Haze":
      case 'Mist':
        return <i className="bx bxs-cloud"></i>

      default:
        return <i className="bs bxs-cloud "></i>
    }
  }
  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.name}</div>
        </div>

        <div className="search-location">
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} />
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={search}>
          </i>
        </div>
      </div>

      {/* weather data*/}
      {data.notFound ? (<div className="not-found">Location Not Found 🙂‍↔️😏</div>) :
        (
          <div className="weather-data">
            {data.weather && data.weather[0] && getWeatherIcon(data.weather[0].main)}

            <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
            <div className="temp">{data.main ? `${Math.floor(data.main.temp)}°` : null}</div>
          </div>
        )}

    </div>
  )
}
export default Weather;