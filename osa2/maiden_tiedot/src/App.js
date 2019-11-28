import {useState, useEffect} from 'react'
import React from 'react';
import './App.css';
import axios from 'axios';


const Country = (props) => {
    const [detailed, setDetailed] = useState(false);
    const show = () => setDetailed(!detailed);

    return (
        <div>
            {props.country.name}
            <button onClick={() => show()}>show</button>
            {detailed && <CountryDetailed country={props.country}/>}
        </div>
    )
};

const Weather = (props) => {
    return (
        <div>
            <div><b>temperature:</b> {props.weather.current.temperature} Celsius</div>
            <div><img src={props.weather.current.weather_icons[0]}/></div>
            <div><b>wind:</b> {props.weather.current.wind_speed} kph direction {props.weather.current.wind_dir}</div>
        </div>
    )
};

const CountryDetailed = (props) => {
    const WEATHER_API = "http://api.weatherstack.com/current";
    const [weather, setWeather] = useState(null);
    const fetchWeather = async (city) => {
        const url = `${WEATHER_API}?access_key=${process.env.REACT_APP_WEATHERSTOCK_API_KEY}&query=${city}`;
        const result = await axios.get(url);
        setWeather(result.data);
    };


    useEffect(() => {
        if (process.env.REACT_APP_WEATHERSTOCK_API_KEY) {
            fetchWeather(props.country.capital);
        }
    }, [props.country]);


    return (
        <div>
            <h1>{props.country.name}</h1>
            <div>capital {props.country.capital}</div>
            <div>population {props.country.population}</div>
            <div>
                <h3>languages</h3>

                <ul>
                    {props.country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}

                </ul>
                <div><img alt={props.country.name} height={100} src={props.country.flag}/></div>
            </div>
            <div>
                <h2>Weather in {props.country.capital}</h2>
                {weather ? <Weather weather={weather}/>
                    : !process.env.REACT_APP_WEATHERSTOCK_API_KEY ?
                        <div>Please set the WEATHERSTOCK_API_KEY to get weather informationn</div>
                        : <div>loading weather data..</div>}
            </div>
        </div>
    )
};

const Countries = (props) => {
    const LIMIT = 10;
    const single = props.countries.length === 1;
    const tooMany = props.countries.length > LIMIT;
    return (<div>
            {tooMany ?
                <div>Too many matches, specify another filter</div>
                : single ?
                    <CountryDetailed country={props.countries[0]}/>
                    :
                    <div>
                        {props.countries.map(country => <Country key={country.name} country={country}/>)}
                    </div>
            }
        </div>
    )
};

function App() {
    const REMOTE = "https://restcountries.eu/rest/v2/all";
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState('Finland');

    const fetchCountries = async () => {
        const response = await axios.get(REMOTE);
        setCountries(response.data);
    };

    const applyFilter = (countries) => {
        var list = countries.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()));
        // fix the corner case anyway
        const exact = list.filter(c => c.name.toLowerCase() === filter.toLowerCase());
        if (exact.length === 1) {
            return exact;
        }
        return list;
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    return (
        <div>
            <div>find countries <input onChange={(e) => setFilter(e.target.value)} value={filter}/></div>
            <Countries countries={applyFilter(countries)}/>
        </div>
    );
}

export default App;
