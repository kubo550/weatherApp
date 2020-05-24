const query = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiid = '&appid=8c9bd199bd76994ee86a9c6413fa453a&units=metric';
const input = document.querySelector('#input');
const btn = document.querySelector('#btn');

const clock = document.querySelector('#clock');
const date = document.querySelector('#date');
const odczuwalna = document.querySelector('#odczuwalna');
const clouds = document.querySelector('#clouds');
const city = document.querySelector('#city');
const opis = document.querySelector('#opis');
const temp = document.querySelector('#temp')
const min = document.querySelector('#min');
const max = document.querySelector('#max');
const errDiv = document.querySelector('#err')

btn.addEventListener('click', callback);
function callback() {
  change(input.value)
  .catch(err => {
    errDiv.classList.remove('hidden');
    console.log('ERROR: '+err);
  })
}
async function getWeather(name) {
  const results = await fetch(query + name + apiid);
  const data = await results.json();
  const info = {
    temp: data.main.temp,
    max: data.main.temp_max,
    min: data.main.temp_min,
    feels: data.main.feels_like,
    name: data.name,
    desc: data.weather[0].description,
    clouds: data.clouds.all
  }
  return info;
}

async function change(name) {
  const data = await getWeather(name)
  errDiv.classList.add('hidden')
  city.innerText = data.name;
  temp.innerText = data.temp.toFixed(0) + '°C';
  max.innerText = data.max.toFixed(0) + '°';
  min.innerText = data.min.toFixed(0) + '°';
  odczuwalna.innerText = data.feels.toFixed(0) + '°';
  opis.innerText = data.desc;
  clouds.innerText =data.clouds+'/100';
}

function currentDate() {
  const today = () =>{
    const d = new Date();
    const day = d.getDate()
    const mh = d.getMonth()
    const yr = d.getFullYear()
    date.innerText = `${day} / ${mh} / ${yr}`;
  }
  today()
  const now = () => {
    const d = new Date();
    const hr = d.getHours();
    const mn = d.getMinutes();
    const outH = (hr < 10)? '0'+ hr: '' + hr;
    const outM = (mn < 10)? '0'+ mn: '' + mn;
    clock.innerHTML = `${outH}:${outM} <i class="fa fa-wifi"></i>`;
  }
  now()
  setInterval(now, 10000);
}
currentDate()
change('kraków')
