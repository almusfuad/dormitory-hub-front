import { showNotification } from "./notifications.js";


const login = () => {
      console.log('login clicked');
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
                  window.location.href = '/index.html';
                  showNotification("Logged in successful.", 'success');
            } else {
                  showNotification("Logged in failed.", 'danger');
            }
      })
      .catch((err)=> {
            console.error('Error:', err);
      })
};


const register = () => {
      
      // retrieve data
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const firstName = document.getElementById('first_name').value;
      const lastName = document.getElementById('last_name').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm_password').value;
      const phoneNumber = document.getElementById('phone_no').value;
      const profileImage = document.getElementById('image').files[0];

      const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

      // validate password
      if (password !== confirmPassword) {
            document.getElementById('password-error').innerHTML = 'Password do not match';
      }
      else if (!regex.test(password)) {
            document.getElementById('password-error').innerHTML = 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be at least 8 characters long';
      } 
      else {
            document.getElementById('password-error').innerHTML = '';
      }

      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('password', password);
      formData.append('phone_no', phoneNumber);
      formData.append('image', profileImage);

      fetch(`https://dormitory-hub.onrender.com/user/register/`)
      .then((res) => {
            if(res.ok) {
                  showNotification('Registration Successful. Check your email for confirm email.');
                  window.location.href = '/auth/login.html';
                  return res.json();
            }
            else {
                  showNotification('Registration Failed');
            }
      })
      .catch((err) => {
            console.log('Registration error:', err);
      })

};

document.addEventListener('DOMContentLoaded', function() {
      const loginBtn = document.getElementById('loginBtn');
      if (loginBtn) {
          loginBtn.addEventListener('click', function(event) {
              event.preventDefault();
              login();
          });
      }
  
      const registerBtn = document.getElementById('registerBtn');
      if (registerBtn) {
          registerBtn.addEventListener('click', function(event) {
              event.preventDefault();
              register();
          });
      }
  });

