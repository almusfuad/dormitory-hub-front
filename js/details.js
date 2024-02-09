const getParams = () => {
      const param = new URLSearchParams(window.location.search).get("slug");
      console.log(param);

      fetch(`https://dormitory-hub.onrender.com/dormitories/list/?slug=${param}`)
            .then((res) => res.json())
            .then((data) => {
                  console.log(data);
                  const dormitoryDetails = document.getElementById('details-container');
                  const div = document.createElement('div');
                  dormitoryDetails.innerHTML = `
                  <div class="col-5 details-img">
                        <img src="${data[0]?.image}" alt="Dormitory Image">
                        <button >Book Now</button>
                  </div>
                  <div class="col-7 details-text">
                        <h2><strong>${data[0]?.name}</strong></h2>
                        <div class="facilities-type">
                              <h3><strong>Facilities: </strong>${data[0]?.facilities}</h3>
                              <h3><strong>Type: </strong>${data[0]?.dormitory_type}</h3>
                        </div>
                        <h3><Strong>Address: </Strong>${data[0]?.address}</h3>
                        <div class="costs">
                              <h3><strong>Per Night: </strong>$ ${data[0]?.per_night}</h3>
                              <h3><strong>Per Month: </strong>$ ${data[0]?.per_month}</h3>
                        </div>
                        <h3><strong>Available Seats: </strong>${data[0]?.available_seats}</h3>
                  </div>
                  `;
            })
            .catch((err) => {
                  console.error(err);
            });
};


const details = (slug) => {

      console.log(slug);
      
      fetch(`https://dormitory-hub.onrender.com/dormitories/list/?slug=${slug}`)
            .then((res) => res.json())
            .then((data) => {
                  console.log(data);
                  const queryParams = new URLSearchParams(data.slug).toString();
                  window.location.href =  `dormitory/dormitory_details.html?${queryParams}`;
            })
            .catch((err) => {
                  console.error(err);
            })
};

getParams();