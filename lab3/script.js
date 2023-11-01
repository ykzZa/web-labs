const userContainer = document.getElementById('user-container');
const loadMoreButton = document.getElementById('load-more');

function fetchUserData() {
    fetch('https://randomuser.me/api')
        .then(response => response.json())
        .then(data => {
            const user = data.results[0];
            const picture = user.picture.large;
            const cell = user.cell;
            const country = user.location.country;
            const email = user.email;
            const coordinates = `${user.location.coordinates.latitude}, ${user.location.coordinates.longitude}`;

            const userElement = document.createElement('div');
            userElement.classList.add('user-info');
            userElement.innerHTML = `
                <p><strong>Picture:</strong> <img src="${picture}" alt="User Picture"></p>
                <p><strong>Cell:</strong> ${cell}</p>
                <p><strong>Country:</strong> ${country}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Coordinates:</strong> ${coordinates}</p>
            `;

            userContainer.appendChild(userElement);
        })
        .catch(error => console.error('Error:', error));
}

loadMoreButton.addEventListener('click', fetchUserData);

fetchUserData();
