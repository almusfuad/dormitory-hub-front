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




const logout = () => {
      console.log(localStorage.getItem('token'));
      fetch(`https://dormitory-hub.onrender.com/user/logout/`, {
            method: "GET",
            headers: {
                  "Authorization": `Token ${localStorage.getItem('token')}`,
                  'Content-Type': 'application/json'
            },
      })
      .then((res) => {
            console.log(res.json());
            if (res.status === 200) {
                  localStorage.removeItem('token');
                  window.location.href = "../auth/login.html";
                  showNotification("Logged out successful.", 'success');

            }
            else {

                  showNotification("Logged out failed.", 'danger');
            }
      })
      .catch((err) => {
            console.error('Error:', err);
      });
};
document.addEventListener("DOMContentLoaded", () => {
      document.getElementById('loginBtn').addEventListener('click', login);
});

export { logout };


