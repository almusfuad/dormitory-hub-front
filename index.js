
const dormitoryList = () => {
      fetch('https://dormitory-hub.onrender.com/dormitory/list/', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers as needed
            },
        })
      .then((res) => res.json())
      .then((data) => {
            console.log(data);
            renderDormitories(data);
      });
}

const renderDormitories = (dormitories) => {
      dormitories?.forEach((dormitory) => {
            const parent = document.getElementById('dormitoryList');
            const div = document.createElement('div');
            div.classList.add('dormitory-card');
            div.innerHTML = `
            <div class="dormitory-card d-flex p-3 border rounded">
            <div class="d-flex me-3">
                  <img class="dormitory-image img-fluid rounded" src="${dormitory?.image}" alt="Dormitory Image">
            </div>
            <div class="d-flex flex-column">
                  <h3 class="dormitory-name mb-3">${dormitory?.name}</h3>
                  <p class="dormitory-type"><strong>Type:</strong> ${dormitory?.dormitory_type}</p>
                  <p class="dormitory-price"><strong>Facilities:</strong> ${dormitory?.facilities}</p>
            </div>
            </div>
            `;
            
            // after clicking on cards a new details page will be created
            parent.appendChild(div);
            
            div.addEventListener('click', () => {
                  window.open(`./details/details.html?id=${dormitory?.id}`, '_blank');
            });
            
      });
};

dormitoryList();
