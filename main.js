let form = document.querySelector('form');
let h1 = document.querySelector('h1');
let h2 = document.querySelector('h2');
let p = document.querySelector('p');
let img = document.querySelector('img');
let input = document.querySelector('input');
let card = document.querySelector('.weather_info')
let tableDiv = document.querySelector('.forecast_info')




const fetchData = async (e) => {
  e.preventDefault();
  try{
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2a46f3329662436b980124810251504&q=${input.value}&days=5&aqi=yes&alerts=yes`);
  const data = await response.json();
  h1.innerText = data.current.temp_c + '°C';
  h2.innerText = data.location.name;
  p.innerText = data.current.condition.text;
  img.setAttribute('src', data.current.condition.icon);
  card.style = "display:flex"
  tableDiv.style = "display:block"
  const tableValue = data.forecast.forecastday;
  const tableData = tableValue.map(value => {
    return (
      `<tr>
             <td>${value.date}</td>
             <td>${value.day.maxtemp_c + '°C'}</td>
             <td>${value.day.mintemp_c + '°C'}</td>
             <td>${value.day.avgtemp_c + '°C'}</td>
             <td>${value.day.avghumidity}</td>
             <td>${value.day.condition.text}</td>
             <td><img src="${value.day.condition.icon}"></td>
          </tr>`
    );
  }).join('');

  const tableBody = document.querySelector("#tableBody");
  tableBody.innerHTML = tableData;
  }
  catch(error){
    window.alert("please provide valid city name");
  }
  form.reset();
}
form.addEventListener("submit", fetchData);
// fetchData();

