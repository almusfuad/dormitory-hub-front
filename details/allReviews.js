import { getIdFunction } from "../core/set_get.js";

getIdFunction().then((dormitoryId) => {
      allReviews(dormitoryId);
});

const allReviews = (dormitoryId) => {
      fetch(`https://dormitory-hub.onrender.com/dormitory/${dormitoryId}/reviews/`)
      .then((res) => res.json())
      .then((data) =>{
            console.log(data);
            document.getElementById("total-reviews").textContent = data.length;
            data.forEach((review) => {
                  const parent = document.getElementById("reviews");
                  const div = document.createElement("div");
                  div.classList.add("review-card");
                  div.innerHTML =`
                  <div class="review-card">
                              <div class="d-flex">
                                    <div class="d-flex flex-column">
                                          <img class="reviewer-img" src="" alt="">
                                          <p><strong>Reviewer Name</strong></p>
                                    </div>
                                    <div class="d-flex flex-column ms-4">
                                          <p><strong>Give: </strong>${review.rating} stars</p>
                                          <p><strong>Review: </strong>${review.comment}</p>
                                    </div>
                              </div>
                  </div>
                  `;
                  parent.appendChild(div);
            });
            
      });
};



