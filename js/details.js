import { showNotification } from './notifications.js';

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
                  checkBookingPermission(param);
                  
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
                        <button type="button" id="booking-button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookNowModal">
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
                        $('#bookNowModal').modal('hide');
                        const dormitoryId = data[0]?.id;
                        createBooking(dormitoryId);
                  });



};


const checkBookingPermission = (dormitorySlug) => {
      const url = `https://dormitory-hub.onrender.com/booking/permission/${dormitorySlug}/`;
      const token = localStorage.getItem("token");
      const bookingButton = document.getElementById("booking-button");
      
      console.log("Token: ", token);

      if(token === null) {
            bookingButton.disabled = true;
            return;
      }

            fetch(url, {
                  method: "GET",
                  headers: {
                        "Authorization": `Token ${token}`,
                  }
            })
            .then((res) => {
                  if (!res.ok) {
                        throw new Error("Failed to fetch booking permission");
                    }
                  return res.json();
            })
            .then((data) => {
                  console.log("Booking permission:", data);
      
                  if(data.booking_exists){
                        bookingButton.disabled = true;
                  }
                  else{
                        bookingButton.disabled = false;
                  }

            })
            .catch((error) => {
                  console.log("Error checking booking permission:", error);
                  bookingButton.disabled = true;
            });
      

};

const createBooking = (dormitoryId) => {
      console.log("Creating booking...");
      const url = `https://dormitory-hub.onrender.com/booking/create/`;
      const token = localStorage.getItem("token");

      const number_of_days = document.getElementById("number_of_days").value;
      const number_of_months = document.getElementById("number_of_months").value;
      const number_of_seats = document.getElementById("number_of_seats").value;

      const formData = {
            dormitory: dormitoryId,
            number_of_days: number_of_days,
            number_of_months: number_of_months,
            number_of_seats: number_of_seats,
      }

      fetch(url, {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json',
                  "Authorization": `Token ${token}`
            },
            body: JSON.stringify(formData)
      })
      .then((res) => {
            if (!res.ok) {
                  showNotification("Booking created failed", 'error');
                  throw new Error("Failed to create booking.");
            }
            else
            {
                  showNotification("Booking created successfully", 'success');
            
            }
            return res.json();
      })
      .then(data => {
            console.log("Booking created successfully", data);
      })
      .catch(error => {
            console.error("Error creating booking:",error);
      });
}


getParams();