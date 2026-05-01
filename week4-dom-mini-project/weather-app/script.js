const cityInput      = document.getElementById('cityInput');
const searchBtn      = document.getElementById('searchBtn');
const loading        = document.getElementById('loading');
const weatherContent = document.getElementById('weatherContent');
const errorEl        = document.getElementById('error');

const WEATHER_ICONS = {
    sunny: '☀️', clear: '☀️', 'partly cloudy': '⛅', cloudy: '☁️',
    overcast: '☁️', mist: '🌫️', fog: '🌫️', rain: '🌧️',
    drizzle: '🌦️', snow: '❄️', sleet: '🌨️', thunder: '⛈️', blizzard: '🌨️',
};

function getIcon(desc) {
    const d = desc.toLowerCase();
    return Object.entries(WEATHER_ICONS).find(([k]) => d.includes(k))?.[1] ?? '🌡️';
}

function showLoading() { loading.style.display = 'block'; weatherContent.style.display = 'none'; errorEl.style.display = 'none'; }
function showError(msg) { loading.style.display = 'none'; weatherContent.style.display = 'none'; errorEl.style.display = 'block'; errorEl.textContent = msg; }

function showWeather(data) {
    const c    = data.current_condition[0];
    const area = data.nearest_area[0];
    const day  = data.weather[0];

    document.getElementById('cityName').textContent    = `${area.areaName[0].value}, ${area.country[0].value}`;
    document.getElementById('weatherIcon').textContent  = getIcon(c.weatherDesc[0].value);
    document.getElementById('temperature').textContent  = `${c.temp_C}°C`;
    document.getElementById('description').textContent  = c.weatherDesc[0].value;
    document.getElementById('feelsLike').textContent    = `${c.FeelsLikeC}°C`;
    document.getElementById('humidity').textContent     = `${c.humidity}%`;
    document.getElementById('wind').textContent         = `${c.windspeedKmph} km/h`;
    document.getElementById('minmax').textContent       = `${day.maxtempC}° / ${day.mintempC}°`;

    loading.style.display = 'none'; weatherContent.style.display = 'block'; errorEl.style.display = 'none';
}

async function fetchWeather(city) {
    showLoading();
    try {
        const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
        if (!res.ok) throw new Error('도시를 찾을 수 없습니다.');
        showWeather(await res.json());
    } catch (err) {
        showError(`⚠️ ${err.message || '날씨 정보를 불러올 수 없습니다.'}`);
    }
}

searchBtn.addEventListener('click', () => { const c = cityInput.value.trim(); if (c) fetchWeather(c); });
cityInput.addEventListener('keydown', e => { if (e.key === 'Enter') { const c = cityInput.value.trim(); if (c) fetchWeather(c); } });

fetchWeather('Seoul');
