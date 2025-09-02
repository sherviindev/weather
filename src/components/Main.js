import React, { useEffect, useRef, useState } from 'react';
import searchIcon from './search.svg';
import WeatherData from './WeatherData';
import linkIcon from './external-link.svg';

const Main = () => {
  const inputValue = useRef();
  const [cityName, setCityName] = useState(""); 
  const [error, setError] = useState(true);
  const [lang, setLang] = useState(true);
  const [myData, setMyData] = useState([]);
  const [cityDetails, setCityDetails] = useState([]);
  const [dataWeather, setDataWeather] = useState([]);
  const [windData, setWindData] = useState([]);

  const APP_KEY = "8c413e7dc43650da400e75bc77c10407";

  // گرفتن شهر با IP
  useEffect(() => {
    if (!cityName) { // فقط اگر cityName خالی باشد
      fetch('http://ip-api.com/json')
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success' && data.city) {
            setCityName(data.city);
          } else {
            setCityName(""); // هیچ fallback
          }
        })
        .catch(() => setCityName("")); // هیچ fallback
    }
  }, [cityName]);

  // گرفتن اطلاعات آب‌وهوا وقتی cityName یا lang تغییر کند
  useEffect(() => {
    if (!cityName) return;
    (async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${APP_KEY}&units=metric&lang=${lang ? 'en' : 'fa'}`
        );
        const data = await response.json();
        if (response.ok) {
          setCityDetails(data.city);
          setMyData(data.list[0].main);
          setDataWeather(data.list[0].weather[0]);
          setWindData(data.list[0].wind);
          setError(true);
        } else {
          setError(false);
        }
      } catch (err) {
        console.error(err);
        setError(false);
      }
    })();
  }, [cityName, lang]);

  const onkeydownHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setCityName(inputValue.current.value);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setCityName(inputValue.current.value);
  };

  return (
    <div className='box'>
      <div className='cityName'>
        {error ? (
          <p>
            {cityDetails.name}, {cityDetails.country}
            <a href={`https://en.wikipedia.org/wiki/${cityDetails.name}`} target="_blank" rel="noreferrer">
              <img src={linkIcon} alt='link'/>
            </a>
          </p>
        ) : (
          <p className='invalid'>{lang ? 'Invalid City Name' : 'نام شهر معتبر نیست'}</p>
        )}
        <div className='search'>
          <input
            type='text'
            ref={inputValue}
            onKeyDown={onkeydownHandler}
            placeholder={lang ? 'City Name' : 'نام شهر'}
          />
          <img
            style={{ cursor: 'pointer' }}
            onClick={onSubmitHandler}
            src={searchIcon}
            alt='searchIcon'
          />
        </div>
      </div>

      <WeatherData
        weatherData={myData}
        weather={dataWeather}
        city={cityDetails}
        lang={lang}
        windData={windData}
      />

      <p onClick={() => setLang(!lang)} className='translater'>
        {lang ? 'فارسی ' : 'Eng '}
      </p>
    </div>
  );
};

export default Main;

