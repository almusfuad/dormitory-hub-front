const getParams = () => {
      const param = new URLSearchParams(window.location.search).get("slug");
      console.log(param);

      const title = document.getElementById("title");
      title.innerHTML = param;

      fetch(`https://dormitory-hub.onrender.com/dormitories/list/?slug=${param}`)
            .then((res) => res.json())
            .then((data) => {
                  console.log(data);
                  showDetails(data);
                  
            })
            .catch((err) => {
                  console.error(err);
            });
};


const showDetails = (data) => {

      const dormitoryDetails = document.getElementById('details-container');
                  dormitoryDetails.innerHTML = `
                  <div class="col-5 details-img">
                        <img src="${data[0]?.image}" alt="Dormitory Image">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookNowModal">
                              Book Now
                        </button>
                  </div>
                  <div class="col-7 details-text">
                        <h1><strong>${data[0]?.name}</strong></h1>
                        <div class="facilities-type">
                              <h3><strong>Facilities: </strong>${data[0]?.facilities}</h3>
                              <h3><strong>Type: </strong>${data[0]?.dormitory_type}</h3>
                        </div>
                        <h3><Strong>Address: </Strong>${data[0]?.address}</h3>
                        <div class="costs">
                              <h3><strong>Per Night: </strong>$ ${data[0]?.cost_per_night}</h3>
                              <h3><strong>Per Month: </strong>$ ${data[0]?.cost_per_month}</h3>
                        </div>
                        <h3><strong>Available Seats: </strong>${data[0]?.available_seats}</h3>
                  </div>
                  `;
                  const bookingForm = document.getElementById('bookingForm');
                  bookingForm.addEventListener('submit', (event) => {
                        event.preventDefault();
                  });
};


getParams();