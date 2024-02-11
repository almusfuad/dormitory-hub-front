const getUserDetails = () => {
      const title = document.getElementById('title');
      const token = localStorage.getItem('token');
      const url = `https://dormitory-hub.onrender.com/user/profile/`;
      if(token) {
            fetch(url, {
                  method: 'GET',
                  headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                  }
            })
            .then((res) => res.json())
            .then((data) => {
                  console.log(data);
                  title.innerHTML = data[0]?.slug;
                  const leftPanel = document.getElementById('left-panel');
                  const rightPanel = document.getElementById('right-panel');
                  leftPanel.innerHTML = `
                  <div class="profile-image-username mb-3">
                        <img id="profile-img" src="${data[0]?.image}" alt="user-image">
                        <h6 id="profile-username" class="text-center text-white">${data[0]?.user.username}</h6>
                  </div>
                  <div id="transaction">
                        <p class="text-white-50 pb-0 mb-0">Transaction:</p>
                        <button type="button" class="btn text-start p-0 m-0 text-white" id="depositButton" data-toggle="modal" data-target="#depositModal">Deposit</button>
                        <button type="button" class="btn text-start p-0 m-0 text-white" id="withdrawButton" data-toggle="modal" data-target="#withdrawModal">Withdraw</button>

                  </div>
                  <div class="user-management d-flex flex-column">
                        <p class="text-white-50 pb-0 mb-0">User:</p>
                        <a href="">Edit Profile</a>
                        <a href="">Change Password</a>
                        <a href="">Logout</a>
                  </div>
                  `;

                  rightPanel.innerHTML =`
                  <div class="account d-flex justify-content-between align-items-center">
                        <h6><strong>Account no: </strong>${data[0]?.account_no}</h6>
                        <p><strong>Balance: </strong>${data[0]?.balance}</p>
                  </div>
                  <br>
                  <div class="profile-info">
                        <h6><strong>Full name: </strong>${data[0]?.user?.first_name} ${data[0]?.user?.last_name}</h6>
                        <h6><strong>Email: </strong>${data[0]?.user?.email}</h6>
                        <h6><strong>Phone-no: </strong>${data[0]?.phone_no}</h6>
                  </div>
                  <br>
                  <div class="transaction-info table-responsive table-striped-columns">
                        <table class="table">
                              <thead>
                                    <tr>
                                    <th>Transaction Date</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    </tr>
                              </thead>
                              <tbody class="custom-bg-color">
                                    <!-- Transaction rows will be dynamically added here -->
                              </tbody>
                        </table>
                  </div>
                  `;

                  // Add event listener for deposit button
                  const depositButton = document.getElementById('depositButton');
                  depositButton.addEventListener('click', () => {
                  $('#depositModal').modal('show');
                  });

                  // Add event listener for withdraw button
                  const withdrawButton = document.getElementById('withdrawButton');
                  withdrawButton.addEventListener('click', () => {
                  $('#withdrawModal').modal('show');
                  });
            })
      }
      else {
            window.location.href = '/auth/login.html';
      }
};


const getAllTransaction = () => {
      const token = localStorage.getItem('token');
      const url = `https://dormitory-hub.onrender.com/transactions/all/`;
      fetch(url, {
            method: 'GET',
            headers: {
                  'Authorization': `Token ${token}`,
                  'Content-Type': 'application/json',
            }
      })
      .then((res) => res.json())
      .then((data) => {
            console.log(data);

            // sort transactions by timestamp in descending order
            data.sort((a, b) => {
                  return new Date(b.timestamp) - new Date(a.timestamp);
            });

            const tbody = document.querySelector('.transaction-info tbody');
            tbody.innerHTML = '';

            data.forEach((transaction) => {
                  // convert timestamp to date string
                  const date = new Date(transaction?.timestamp);
                  const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;


                  const row = document.createElement('tr');
                  row.innerHTML = `
                  <td>${dateString}</td>
                  <td>${transaction?.transaction_type}</td>
                  <td>${transaction?.amount}</td>
                  `;
                  tbody.appendChild(row);
            })
      })
      .catch((err) => {
            console.error(err);
      });
};

getAllTransaction();
getUserDetails();