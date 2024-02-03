import { showNotification } from "./notifications.js";


const login = () => {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      fetch(`https://dormitory-hub.onrender.com/user/login/`, {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
      })
      .then((res)=> {
            if(res.status === 200) {
                  return res.json();
            }
            else {
                  showNotification("Logged in failed.", 'danger');
            }
      })
      .then((data) => {
            console.log('Success:', data?.token);
            const token = data?.token;
            if (token) {
                  localStorage.setItem('token', token);
                  window.location.href = '../index.html';
                  showNotification("Logged in successful.", 'success');
            } else {
                  showNotification("Logged in failed.", 'danger');
            }
      })
      .catch((err)=> {
            console.error('Error:', err);
      })
};

document.getElementById('loginBtn').addEventListener('click', login);