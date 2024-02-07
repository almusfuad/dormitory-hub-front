import { showNotification } from "./notifications.js";


const login = (event) => {
      event.preventDefault();
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




const register = (event) => {
      event.preventDefault();
      
      // retrieve data
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const firstName = document.getElementById('first_name').value;
      const lastName = document.getElementById('last_name').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm_password').value;
      const phoneNumber = document.getElementById('phone_no').value;
      const profileImage = document.getElementById('image').files[0];

      if (password !== confirmPassword) {
            document.getElementById('password-error').innerHTML = 'Password do not match';
      }

      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('password', password);
      formData.append('phone_no', phoneNumber);
      formData.append('image', profileImage);

      fetch(``)
}

