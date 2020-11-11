import moment from 'moment';

const baseURL = 'https://api.openweathermap.org/data/2.5/';
const appId = 'get on openweathermap.org';

export const GetCurrentWeather = async (city) => {
  const response = await fetch(
    `${baseURL}weather?q=${city}&units=metric&lang=pt_br&appid=${appId}`
  );
  const currentWeather = await response.json();
  return currentWeather;
};

export const GetNextWeekForecast = async (city) => {
  const currentWeather = await GetCurrentWeather(city);
  if (currentWeather && currentWeather.coord) {
    const { lat, lon } = currentWeather.coord;
    const response = await fetch(
      `${baseURL}onecall?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&exclude=current,minutely,hourly&appid=${appId}`
    );
    const forecast = await response.json();
    if (forecast && forecast.daily) {
      const coord = { lat, lon };
      forecast.daily.pop();
      return forecastApiToApp(forecast.daily, coord);
    }
  }
};

const forecastApiToApp = (forecastData, coord) => {
  const result = [];
  forecastData.forEach((f) => {
    result.push({
      ...coord,
      date: moment(f.dt * 1000),
      weekDay: getWeekDay(f.dt),
      sunrise: moment(f.sunrise * 1000),
      sunset: moment(f.sunset * 1000),
      temperature: { ...f.temp },
      pressure: f.pressure,
      humidity: f.humidity,
      clouds: f.clouds,
      weather: Array.isArray(f.weather)
        ? { ...f.weather[0] }
        : { ...f.weather },
      wind: {
        speed: f.wind_speed,
        deg: f.wind_deg,
      },
    });
  });
  return result;
};

const getWeekDay = (timeStamp) => {
  switch (moment(timeStamp * 1000).isoWeekday()) {
    case 1:
      return 'SEG';
    case 2:
      return 'TER';
    case 3:
      return 'QUA';
    case 4:
      return 'QUI';
    case 5:
      return 'SEX';
    case 6:
      return 'SAB';
    case 7:
      return 'DOM';
    default:
      return '';
  }
};
