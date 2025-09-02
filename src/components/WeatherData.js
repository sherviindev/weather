import React from 'react'

const WeatherData = (props) => {

  // تبدیل تایم‌استمپ یونیکس به ساعت و دقیقه
  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };

  // اسکرول به سمت راست
  const sideRight = () =>{
    const slider = document.getElementById('scrolledItem');
    if (slider) slider.scrollLeft += 300;
  }

  // اسکرول به سمت چپ
  const sideLeft = () =>{
    const slider = document.getElementById('scrolledItem');
    if (slider) slider.scrollLeft -= 300;
  }

  return (
    <div className='weatherData'>
      {/* بخش دمای فعلی و آیکون */}
      <div className='currtemp'>
        <div className='tempAndLogo'>
          <div>
            <img src={`assets/${props.weather.icon}.svg`} width={200} alt='icon'/>
          </div>
          <div>
            {Math.round(props.weatherData.temp)}&deg;C
            <p>{props.weather.description}</p>
          </div>
        </div>

        {/* اطلاعات باد و دمای حداقل و حداکثر */}
        <div className='windData'>
          <p>{props.lang ? 'Wind: ' : 'باد: '}<span>{props.windData.speed}&nbsp;mph</span></p>
          <p>{props.lang ? 'Min Temp: ' : 'کمینه دما: '}<span>{Math.round(props.weatherData.temp_min)}&deg;C</span></p>
          <p>{props.lang ? 'Max Temp: ' : 'بیشینه دما: '}<span>{Math.round(props.weatherData.temp_max)}&deg;C</span></p>
        </div>
      </div>

      {/* پیش‌بینی و جزئیات بیشتر */}
      <div id='scrolledItem' className='forcastdata'>
        <div>
          <p>{props.lang ? 'SUNRISE' : 'طلوع خورشید'}</p>
          <img src={'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/sunrise.svg'} width={100} alt='icon'/>
          <p>{getTime(props.city.sunrise)}</p>
        </div>
        <div>
          <p>{props.lang ? 'HUMIDITY' : 'رطوبت'}</p>
          <img src={'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/humidity.svg'} width={100} alt='icon'/>
          <p>{props.weatherData.humidity}&nbsp;mm</p>
        </div>
        <div>
          <p>{props.lang ? 'WIND' : 'باد'}</p>
          <img src={'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind.svg'} width={100} alt='icon'/>
          <p>{props.windData.speed}&nbsp;mph</p>
        </div>
        <div>
          <p>{props.lang ? 'PRESSURE' : 'فشار'}</p>
          <img src={'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/pressure-low.svg'} width={100} alt='icon'/>
          <p>{props.weatherData.pressure}&nbsp;mb</p>
        </div>
        <div>
          <p>{props.lang ? 'SUNSET' : 'غروب خورشید'}</p>
          <img src={'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/sunset.svg'} width={100} alt='icon'/>
          <p>{getTime(props.city.sunset)}</p>
        </div>
      </div>

      {/* کپی‌رایت و دکمه‌های اسکرول */}
      <p className='copyright'>&copy; shervin 2025</p>
      <p onClick={sideRight} className='rigtharrow'>&gt;</p>
      <p onClick={sideLeft} className='leftarrow'>&lt;</p>
    </div>
  );
}

export default WeatherData;
