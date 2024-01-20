const getProfileInfo = () => {
      const user_id = localStorage.getItem('user_id');
      console.log(user_id);
      const token = localStorage.getItem('token');

      fetch(`https://dormitory-hub.onrender.com/user/${user_id}`)
      .then((res) => {
      if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
      })
      .then((data) => {
            const profileInfo = document.getElementById('profile-info');
            const addressInfo = document.getElementById('address-info');

            localStorage.setItem('info_id', data?.basicinformation?.id);
            
            if (data?.basicinformation?.id){
                  // render dynamic profile info
                  profileInfo.innerHTML = `
                  <p><strong>Account no:</strong> ${data?.basicinformation?.account_no}</p>
                  <p><strong>Full name:</strong> ${data?.basicinformation?.user?.first_name} ${data?.basicinformation?.user?.last_name}</p>
                  <p><strong>Phone no:</strong> ${data?.basicinformation?.phone_no}</p>
                  <p><strong>Gender:</strong> ${data?.basicinformation?.gender_type}</p>
                  `;
      
                  // render dynamic address info
                  addressInfo.innerHTML = `
                  <p><strong>Address:</strong> ${data?.basicinformation?.street_address}, ${data?.basicinformation?.postal_code}, ${data?.basicinformation?.city}</p>
                  <p><strong>Institution:</strong> ${data?.basicinformation?.institution_name}<span>(${data?.basicinformation?.institution_type})</span></p>
                  <p><strong>Institution address:</strong> ${data?.basicinformation?.institution_address}</p>
                  `;
      
                  document.getElementById('pro-img').src = data?.basicinformation?.image;
                  document.getElementById('balance').innerHTML = data?.basicinformation?.balance;
            } else {
                  window.location.href = "./update_profile.html";
            }

      })
      .catch((error) => {
            console.error('Fetch error:', error);
      });
      
};



window.submitTransaction = () => {
      const token = localStorage.getItem('token');
      var transactionType = document.getElementById('transactionType').value;
      var amount = document.getElementById('amount').value;
  
      fetch('https://dormitory-hub.onrender.com/transactions/deposit-withdraw/', {
          method: "POST",
          headers: {
		'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
	},
          body: JSON.stringify({
              "transaction_type": transactionType,
              "amount": amount
          })
      })
      .then((res) => res.json())
      .then((data) => {
          console.log(data);
      });
  };

const eventListeners = () => {
      const token = localStorage.getItem('token');
      // Create a variable to store the reference to the modal
      var transactionModal = new bootstrap.Modal(document.getElementById('transactionModal'));
  
      document.querySelectorAll(".mb-2[data-bs-toggle='modal']").forEach((element) => {
          element.addEventListener('click', (e) => {
              var transactionType = e.target.getAttribute('data-transaction-type');
              document.getElementById('transactionModalLabel').innerText =
                  transactionType.charAt(0).toUpperCase() + transactionType.slice(1) + ' Form';
              document.getElementById('transactionType').value = transactionType;
  
              // Show the modal
              transactionModal.show();
          });
      });

  
      document.getElementById('transactionForm').addEventListener('submit', (event) => {
          event.preventDefault();
  
          var transactionType = document.getElementById('transactionType').value;
          var amount = document.getElementById('amount').value;
  
          console.log(transactionType);
          console.log(amount);
  
          // Hide the modal
          transactionModal.hide();
      });
  
      // Listen for the modal hidden event
      document.getElementById('transactionModal').addEventListener('hidden.bs.modal', function () {
          // Reset the form when the modal is hidden
          document.getElementById('transactionForm').reset();
      });
  };  
eventListeners();

  
getProfileInfo();