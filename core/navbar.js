import {logout} from '../auth/auth.js';


window.addEventListener('load', () => {
      const token = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');

      // console.log('token:', token);

      // Get navbar links
      const loginLink = document.getElementById('loginLink');
      const registerLink = document.getElementById('registerLink');
      const profileLink = document.getElementById('profileLink');
      const logoutLink = document.getElementById('logoutLink');

      // Update navbar based on cookies
      if (user_id && token) {
            // User is logged in
            loginLink.style.display = 'none';
            registerLink.style.display = 'none';
            profileLink.style.display = 'block';
            logoutLink.style.display = 'block';

            logoutLink.addEventListener('click', () => {
                  logout();
                  // localStorage.removeItem('user_id');
                  // localStorage.removeItem('token');
                  // window.location.href = '../index.html';
            });
      } else {
            // User is not logged in
            loginLink.style.display = 'block';
            registerLink.style.display = 'block';
            profileLink.style.display = 'none';
            logoutLink.style.display = 'none';
            }
  });