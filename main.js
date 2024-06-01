document.addEventListener('DOMContentLoaded', () => {
    const bikeList = document.getElementById('bike-list');
    const bikeTypeSelect = document.getElementById('bike-type');

    // Fetch data from the CityBikes API using HTTPS
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

    // Handle the email form submission on index.html
    const emailForm = document.getElementById('email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', event => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            localStorage.setItem('userEmail', email);
            alert('Email saved! You can now proceed to make a reservation.');
        });
    }

    // Handle the reservation form submission on reservation.html
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', event => {
            event.preventDefault();
            const bikeType = document.getElementById('bike-type').value;
            const email = localStorage.getItem('userEmail') || document.getElementById('email').value;

            // Send the email with the reservation details using EmailJS
            const templateParams = {
                email: email,
                bike_type: bikeType,
            };

            emailjs.send('service_664jv0n', 'template_lm9tmrv', templateParams)
                .then(response => {
                    alert('Reservation email sent successfully!');
                    console.log('SUCCESS!', response.status, response.text);
                }, error => {
                    alert('Failed to send reservation email.');
                    console.log('FAILED...', error);
                });
        });
    }
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