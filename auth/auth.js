const registration = () => {
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
      }
      const userData = {
            username: username,
            email: email,
            password: password,
      };
      fetch('https://dormitory-hub.onrender.com/user/register/', {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
      })
            .then((response) => response.json())
            .then((data) => {
                  console.log('Success:', data);
                  alert('Registration successful. Please check your mail for activate your account.');
                  window.location.href = 'login.html';
            })
            .catch((error) => {
                  console.error('Error:', error);
            });
};


const login = () => {
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById("loginPassword").value;

      if (!username || !password) {
            alert('Please enter your email and password');
            return;
      }
      const loginData = {
            username: username,
            password: password,
      }
      fetch('https://dormitory-hub.onrender.com/user/login/', {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
      }).then((response) => response.json())
      .then((data) => {
            // console.log('Success:', data);

            if (data.user_id && data.token) {
                  localStorage.setItem('user_id', data.user_id);
                  localStorage.setItem('token', data.token);

                  // redirect
                  window.location.href = "../index.html";
            }
      }).catch((error) => {
            console.error('Error:', error);
      });
};

const logout = () => {
      fetch("https://dormitory-hub.onrender.com/user/logout/", {
            method: "GET",
            headers: {
                  "Content-Type": "application/json",
            },
      })
      .then((response) => {
            // Clear local storage
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');

            // Redirect
            window.location.href = '../auth/login.html';
      });
};

// add event listener
document.addEventListener('DOMContentLoaded', () => {
      const loginButton = document.getElementById('loginButton');
      const registerButton = document.getElementById('registerButton');

      if (loginButton) {
            loginButton.addEventListener('click', login);
      }

      if (registerButton) {
            registerButton.addEventListener('click', registration);
      }
});

export {logout, registration, login}