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
                        <p class="text-white-50 pb-0 mb-0">User management:</p>
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
                  <div class="profile-info">
                        <h6><strong>Full name: </strong>${data[0]?.user?.first_name} ${data[0]?.user?.last_name}</h6>
                        <h6><strong>Email: </strong>${data[0]?.user?.email}</h6>
                        <h6><strong>Phone-no: </strong>${data[0]?.phone_no}</h6>
                  </div>
                  <div class="transaction-info">
                        <table>
                              <thead>
                                    <tr>
                                    <th>Transaction Date</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    </tr>
                              </thead>
                              <tbody>
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


const deposit = () => {
      const depositAmount = document.getElementById('depositAmount').value;
      const url = `https://dormitory-hub.onrender.com/user/deposit/`;
      const token = localStorage.getItem('token');
      fetch(url, {
            method: 'POST',
            headers: {
                  'Authorization': `Token ${token}`,
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                  'amount': depositAmount,
            })
      })
      .then((res) => res.json())
      .then((data) => {
            console.log(data);
            if(data.status === 'success') {
                  showNotification('Deposit successful.', 'success');
                  $('#depositModal').modal('hide');
                  getUserDetails();
            }
            else {
                  showNotification('Deposit failed.', 'danger');
            }
      })
      .catch((err) => {
            console.error(err);
      });
}

getUserDetails();