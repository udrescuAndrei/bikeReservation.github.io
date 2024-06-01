document.addEventListener('DOMContentLoaded', () => {
    const bikeList = document.getElementById('bike-list');
    const bikeTypeSelect = document.getElementById('bike-type');

    // Fetch data from the CityBikes API
    fetch('https://api.citybik.es/v2/networks')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (bikeList) {
                data.networks.forEach(network => {
                    const bikeItem = document.createElement('div');
                    bikeItem.className = 'bike-item';
                    bikeItem.innerHTML = `
                        <h3>${network.name}</h3>
                        <p>${network.location.city}, ${network.location.country}</p>
                    `;
                    bikeList.appendChild(bikeItem);
                });
            }

            // Simulated bike types for the reservation form
            if (bikeTypeSelect) {
                const bikeTypes = [
                    { id: 1, name: 'Mountain Bike' },
                    { id: 2, name: 'Road Bike' },
                    { id: 3, name: 'Hybrid Bike' },
                    { id: 4, name: 'Electric Bike' },
                    { id: 5, name: 'BMX Bike' }
                ];

                bikeTypes.forEach(bikeType => {
                    const option = document.createElement('option');
                    option.text = bikeType.name;
                    option.value = bikeType.id;
                    bikeTypeSelect.add(option);
                });
            }
        })
        .catch(error => console.error('Error fetching bike data:', error));
});
function searchBikes() {
    // Obține termenul de căutare introdus de utilizator
    var searchTerm = document.getElementById('search-input').value.toLowerCase();

    // Obține lista de biciclete
    var bikes = document.querySelectorAll('.bike-item');

    // Parcurge fiecare bicicletă și ascunde cele care nu se potrivesc cu termenul de căutare
    bikes.forEach(function(bike) {
        var bikeName = bike.querySelector('h3').innerText.toLowerCase();
        if (bikeName.includes(searchTerm)) {
            bike.style.display = 'block';
        } else {
            bike.style.display = 'none';
        }
    });
}
