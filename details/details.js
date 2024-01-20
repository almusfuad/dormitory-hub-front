import { getIdFunction } from "../core/set_get.js";


getIdFunction().then((dormitoryId) => {
            dormitoryDetails(dormitoryId);
    })

const dormitoryDetails = (dormitoryId) => {
    const user_id = localStorage.getItem('user_id');
      fetch(`https://dormitory-hub.onrender.com/dormitory/list/${dormitoryId}/`)
      .then((res) => res.json())
      .then((data) => {
            console.log(data);
                  const parent = document.getElementById('details');
                  const div = document.createElement('div');
                  div.classList.add('details-card');
                  div.innerHTML = `
                      <div class="details-card d-flex mb-3">
                          <div class="d-flex flex-column">
                              <img class="img-details" src="${data?.image}" alt="">
                              <h2>${data?.name}</h2>
                          </div>
                          <div>
                              <div class="d-flex ms-3">
                                  <p class="me-3"><strong>Location: </strong>Khulna</p>
                                  <p class="me-3"><strong>Type: </strong>${data?.dormitory_type}</p>
                                  <p class="me-3"><strong>Facility: </strong>${data?.facilities}</p>
                              </div>
                              <div class="m-3">
                                  <p><strong>Address: </strong>${data?.address}</p>
                                  <p><strong>Available seats: </strong>${data?.available_seats}</p>
                                  <p><strong>Cost per Day: </strong>${data?.cost_per_night}</p>
                                  <p><strong>Cost per month: </strong>${data?.cost_per_month}</p>
                                  ${user_id ? `<button type="button" id="bookingButton" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookingModal"
                                  style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
                                  Make Booking
                              </button>` : ''}
                                  
                              </div>
                          </div>
                      </div>
                  `;
            parent.appendChild(div);

            // add event listener to the booking button
            const bookingButton = document.getElementById('bookingButton');
            if (bookingButton) {
                const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'), {
                    backdrop: 'static',
                });

                bookingButton.addEventListener('click', () => {
                    // Check if the modal instance already exists
                    if (!bookingModal._isShown) {
                        // If not, create and show the modal
                        bookingModal.show();
                    }
                });

                // Event listener for when the modal is hidden
                bookingModal._element.addEventListener('hidden.bs.modal', function () {
                    // Dispose of the modal when it's closed
                    bookingModal.dispose();
                });
            }
      }); 
};


export {dormitoryDetails}
