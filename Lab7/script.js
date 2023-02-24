const apiKey = 'cb263a9ed6988851a2ee09f0fe224e91';
const MAX_WEATHERS = 10;
const weatherDivs = [];
const weatherNames = new Set();

const createWeatherDiv = (data) => {
  const { name } = data;
  if (!name) {
    alert('City not found.');
    return null;
  }

  if (weatherNames.has(name.toLowerCase())) {
    alert('This city has already been added!');
    return null;
  }

  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const weatherDiv = document.createElement('div');
  weatherDiv.id = name.toLowerCase();
  weatherDiv.classList.add('weather', 'loading');
  weatherDiv.innerHTML = `
    <h1 class="city">Weather in ${name}</h1>
    <h2 class="temp">${temp} °C </h2>
    <div class="flex">
      <img src="http://openweathermap.org/img/wn/${icon}.png" alt="" class="icon" />
      <p class="description">${description}</p>
    </div>
    <p class="humidity">Humidity: ${humidity}% </p>
  `;

  weatherNames.add(name.toLowerCase());
  return weatherDiv;
};

const displayWeather = (data) => {
  const weatherDiv = createWeatherDiv(data);
  if (weatherDiv) {
    weatherDivs.unshift(weatherDiv);
    if (weatherDivs.length > MAX_WEATHERS) {
      const deletedDiv = weatherDivs.pop();
      document.getElementById(deletedDiv.id).remove();
      weatherNames.delete(deletedDiv.id);
    }
    document.querySelector('#weathers').prepend(weatherDiv);
    localStorage.setItem('weathers', JSON.stringify([...weatherNames]));
  }
};

const downloadWeatherFromApi = async (city) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert('An error occurred while fetching weather data.');
  }
};

const getCity = () => {
  const searchBar = document.querySelector('.search-bar').value;
  downloadWeatherFromApi(searchBar);
};

document.querySelector('.search button').addEventListener('click', getCity);
document.querySelector('.search-bar').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    getCity();
  }
});

const weathersSaved = new Set(JSON.parse(localStorage.getItem('weathers')));
weathersSaved.forEach((element) => {
  downloadWeatherFromApi(element);
});
