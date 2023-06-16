// ----------- FUNCION 1 -----------
function consultarClima() {
    const ciudad = document.getElementById('ciudad').value;
    const API_KEY = 'a9ef25a9c0d4e146741a3970169327cf'; // Sustituye "tu_api_key" por tu propia API key (ClimaYaz)de OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`;

fetch(url)
.then(response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error en la respuesta de la API');
  }
})

.then(data => {
  // Mostrar resultado en la tabla
  const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
  const fila = tabla.insertRow();
  fila.insertCell().innerHTML = data.name;
  fila.insertCell().innerHTML = `${(data.main.temp - 273.15).toFixed(1)}°C`;
  fila.insertCell().innerHTML = data.weather[0].description;
  fila.insertCell().innerHTML = data.weather.icon;

})
.catch(error => {
  console.error('Error al consultar el clima', error);
});
}

//----------- FUNCION 2 ------------ CIUDADES
function consultarClimas() {
    const ciudades = document.getElementById('ciudades').value.split(',').map(ciudad => ciudad.trim());
    const API_KEY = 'a9ef25a9c0d4e146741a3970169327cf'; // Sustituye "tu_api_key" por tu propia API key (ClimaYaz)de OpenWeatherMap

    Promise.all(ciudades.map(ciudad => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`;
        return fetch(url).then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error en la respuesta de la API');
          }
        });
      }))
      .then(data => {
        // Mostrar resultados en la tabla
        const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
        data.forEach(ciudad => {
          const fila = tabla.insertRow();
          fila.insertCell().innerHTML = ciudad.name;
          fila.insertCell().innerHTML = `${(ciudad.main.temp - 273.15).toFixed(1)}°C`;
          fila.insertCell().innerHTML = ciudad.weather[0].description;
          fila.insertCell().innerHTML = ciudad.weather.icon;
        });
      })
      .catch(error => {
        console.error('Error al consultar el clima', error);
      });
}

// ----------- FUNCION LIMPIAR -----------
function limpiarTabla() {
    // Mostrar resultado en la tabla
    const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody');
    for(let i = 0; i<tabla.length; i++)
    {
        tabla[i].innerHTML = "";
    }
}

// ----------- API PARA LISTA DE CIUDADES -----------
fetch('https://restcountries.com/v2/all')
.then(response => response.json())
.then(data => {

const selectElement = document.getElementById('ciudad');
data.forEach((contry) => {
  const optionElement = document.createElement('option');
  optionElement.value = contry.name;
  optionElement.textContent = contry.name;
  optionElement.appendChild (optionElement);
});

selectElement.addEventListener ('change', (event) => {
  document.getElementById('ciudad').value = event.target.value;
  consultarClima();
  obtenerHora();
});

})
.catch(error => console.error ('Error:', error));