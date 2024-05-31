document.addEventListener('DOMContentLoaded', () => {
    // Obține stațiile de biciclete folosind API-ul CityBikes
    if (document.getElementById('bike-list')) {
        const bikeList = document.getElementById('bike-list');

        fetch('http://api.citybik.es/v2/networks')
            .then(response => response.json())
            .then(data => {
                data.networks.forEach(network => {
                    const bikeItem = document.createElement('div');
                    bikeItem.classList.add('bike-item');
                    bikeItem.innerHTML = `
                        <h3>${network.name}</h3>
                        <p>${network.location.city}, ${network.location.country}</p>
                    `;
                    bikeList.appendChild(bikeItem);
                });
            })
            .catch(error => console.error('Error fetching bike data:', error));
    }

    // Gestionare formular de rezervare
    if (document.getElementById('reservation-form')) {
        const form = document.getElementById('reservation-form');

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const bikeType = document.getElementById('bike-type').value;
            const pickupLocation = document.getElementById('pickup-location').value;
            const pickupDate = document.getElementById('pickup-date').value;
            const returnDate = document.getElementById('return-date').value;

            if (bikeType && pickupLocation && pickupDate && returnDate) {
                alert(`Bike reserved successfully!\nBike Type: ${bikeType}\nPickup Location: ${pickupLocation}\nPickup Date: ${pickupDate}\nReturn Date: ${returnDate}`);
                form.reset();
            } else {
                alert('Please fill out all fields.');
            }
        });
    }
});
