const apiKey = 'Eab2t6CHbCoSNNu0vbJfExgpvRlez8G9xasAY0ba';

document.getElementById('fetchDataButton').addEventListener('click', () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!startDate || !endDate) {
        alert('Por favor, insira ambas as datas.');
        return;
    }

    // Formate as datas para o formato desejado (ano/mês/dia)
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formattedStartDate}&end_date=${formattedEndDate}&api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erro na solicitação: ' + response.statusText);
            }
        })
        .then(data => {
            console.log(data);
            const NeatEarth = data.near_earth_objects;
            const closestNeatEarth = [];
        
            for (const day in NeatEarth) {
              for (const asteroid of NeatEarth[day]) {
                const name = asteroid.name;
                const distance = asteroid.close_approach_data[0].miss_distance.kilometers;
                closestNeatEarth.push([name, distance]);
              }
            }
        
            closestNeatEarth.sort((a, b) => a[1] - b[1]);
        
        for (let i = 0; i < 10; i++) {
          let NewDivAll = document.createElement("div");
          NewDivAll.classList.add("mudarText");
          NewDivAll.innerHTML = `
              <li>
                  <p class="nome">${i+1}º: ${closestNeatEarth[i][0]}</p>
                  <p>${closestNeatEarth[i][1]} Km</p>
              </li>
          `;
        
          // Selecione a div existente com id "container"
          let containerDiv = document.getElementById("all-aste-two");
        
          // Adicione a div criada como filho da div existente
          containerDiv.appendChild(NewDivAll);
        }
        })
        .catch(error => console.error('Erro:', error));
});

// Função para formatar a data como "ano/mês/dia"
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adiciona zero à esquerda, se necessário
  const day = date.getDate().toString().padStart(2, '0'); // Adiciona zero à esquerda, se necessário
  return `${year}-${month}-${day}`;
}

