import {logout} from './auth.js';



const navbarLinks = () => {
    const token = localStorage.getItem('token');
    if(token) {
        document.getElementById('profileLink').style.display = 'block';
        document.getElementById('logoutLink').style.display = 'block';
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('registerLink').style.display = 'none';
    }
    else {
                
        document.getElementById('profileLink').style.display = 'none';
        document.getElementById('logoutLink').style.display = 'none';
        document.getElementById('loginLink').style.display = 'block';
        document.getElementById('registerLink').style.display = 'block';
    }
};



// const logout = () => {
//     console.log(localStorage.getItem('token'));
//     fetch(`https://dormitory-hub.onrender.com/user/logout/`, {
//           method: "GET",
//           headers: {
//                 "Authorization": `Bearer ${localStorage.getItem('token')}`,
//                 'Content-Type': 'application/json'
//           },
//     })
//     .then((res) => {
//           console.log(res.json());
//           if (res.status === 200) {
//                 localStorage.removeItem('token');
//                 window.location.href = "../auth/login.html";
//                 showNotification("Logged out successful.", 'success');

//           }
//           else {

//                 showNotification("Logged out failed.", 'danger');
//           }
//     })
//     .catch((err) => {
//           console.error('Error:', err);
//     });
// };

document.getElementById("logoutLink").addEventListener("click", (event) => {
    event.preventDefault();
    logout();
});


document.addEventListener("DOMContentLoaded", () => {
    navbarLinks();
})



