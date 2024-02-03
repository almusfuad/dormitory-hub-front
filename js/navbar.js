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