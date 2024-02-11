import { showNotification } from "./notifications.js";

const deposit = () => {
      console.log("deposit function is clicked");
      const depositAmount = document.getElementById('depositAmount').value;
      const url = `https://dormitory-hub.onrender.com/transactions/deposit-withdraw/`;
      const token = localStorage.getItem('token');
      fetch(url, {
            method: 'POST',
            headers: {
                  'Authorization': `Token ${token}`,
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                  "transaction_type": "deposit",
                  'amount': depositAmount,
            })
      })
      .then((res) => res.json())
      .then((data) => {
            console.log(data);
            if(data.status === 'success') {
                  showNotification('Deposit successful.', 'success');
                  
            }
            else {
                  showNotification('Deposit failed.', 'danger');
            }
      })
      .catch((err) => {
            console.error(err);
      })
      .finally(()=> {
            $('#depositModal').modal('hide');
      });
};


const withdraw = () => {
      console.log('Withdraw function clicked');
      const withdrawAmount = document.getElementById('withdrawAmount').value;
      const url = `https://dormitory-hub.onrender.com/transactions/deposit-withdraw/`;
      const token = localStorage.getItem('token');
      fetch(url, {
            method: 'POST',
            headers: {
                  'Authorization': `Token ${token}`,
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                  "transaction_type": "withdraw",
                  'amount': withdrawAmount,
            })
      })
      .then((res) => res.json())
      .then((data) => {
            console.log(data);
            if(data.status === 'success') {
                  showNotification('Withdraw successful.', 'success');
                  
            }
            else {
                  showNotification('Withdraw failed.', 'danger');
            }
      })
      .catch((err) => {
            console.error(err);
      })
      .finally(()=> {
            $('#withdrawModal').modal('hide');
      });
}


const depositButton = document.getElementById('depositButton');
const withdrawButton = document.getElementById('withdrawButton');

depositButton.addEventListener('click', (e) => {
      e.preventDefault();
      deposit();
});


withdrawButton.addEventListener('click', (e) => {
      e.preventDefault();
      withdraw();
});

