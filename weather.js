document.addEventListener('DOMContentLoaded', () => {
    const city = document.getElementsByClassName('input')[0];
    const btn = document.getElementsByClassName('submit')[0];
    const weather_details = document.getElementById('details');
    const city_name = document.getElementById('city_name');
    const temp = document.getElementById('temp');
    const desc = document.getElementById('desc');
    const error = document.getElementById('error-msg');
    const API_KEY = '26f98773552f3c99671ecd4e878cf382';

    btn.addEventListener('click', async () => {
        const input_city = city.value.trim(); 
        if (!input_city) {
            displayError('Please enter a valid city name.');
            return;
        }

        try {
            const weather_data = await fetchWeatherData(input_city);
            showOnScreen(weather_data);
            console.log(weather_data)
            city.value = ''
        } catch (err) {
            displayError('City not found. Kindly check the spelling');
        }
        city.value = ''
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch weather data.');
        }

        const data = await response.json();
        return data;
    }

    function showOnScreen(weather_data) {
        city_name.textContent = `City: ${weather_data.name}`;
        temp.textContent = `Temperature: ${weather_data.main.temp}°C`;
        desc.textContent = `Description: ${weather_data.weather[0].description}`;

        weather_details.classList.remove('hidden');
        error.classList.add('hidden');
    }

    function displayError(message) {
        error.textContent = message;
        error.classList.remove('hidden');
        weather_details.classList.add('hidden');
    }
});
