const info_id = localStorage.getItem('info_id');
console.log(info_id);


const postProfileInfo = () => {
      const form = document.getElementById('userForm');
      // collect form data
      const jsonData = {};
      
      form.addEventListener('submit', (event) => {
            event.preventDefault();
            
            
            const formData = new FormData(form);

            // convert Form Data to json
            formData.forEach((value, key) => {
                  jsonData[key] = value;
            });
      });


      fetch(`https://dormitory-hub.onrender.com/user/profile/`, {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
      })
      .then((res) => {
            if (!res.ok) {
                  throw new Error(`HTTP error! Status: ${res.status}`);
            }
      })
      .then((data) => {
            // console.log('API Response:', data);
            window.location.href = './profile.html';
      })
      .catch((error) => {
            console.log(error);
      });
};

const updateProfileInfo = () => {
      const jsonData = {};
      form.addEventListener('submit', (event) => {
            event.preventDefault();

            // collect form data
            const formData = new FormData(form);

            // convert form data to json
            formData.forEach((value, key) => {
                  jsonData[key] = value;
            });
      });

      fetch(`https://dormitory-hub.onrender.com/user/profile/${info_id}/`, {
            method: 'PUT',
            headers: {
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
      })
      .then((res) => {
            if (!res.ok) {
                  throw new Error(`HTTP error! Status: ${res.status}`);
            }
      })
      .then((data) => {
            // console.log('API Response:', data);
            window.location.href = './profile.html';
      })
      .catch((error) => {
            console.log(error);
      });
};


const getProfileInfo = () => {
      fetch(`https://dormitory-hub.onrender.com/user/profile/${info_id}/`)
      .then((res) => res.json())
      .then((data) => {
            document.getElementById('first_name').value = data?.user?.first_name;
            document.getElementById('last_name').value = data?.user?.last_name;
            document.getElementById('gender_type').value = data?.gender_type;
            // Get the file input and the element to display the file name
            const fileInput = document.getElementById('image');
            const selectedFileNameElement = document.getElementById('selectedFileName');

            // Add an event listener to the file input to update the displayed file name
            fileInput.addEventListener('change', () => {
            const selectedFileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'No file selected';
            selectedFileNameElement.textContent = selectedFileName;
            });
            document.getElementById('phone_no').value = data?.phone_no;
            document.getElementById('street_address').value = data?.street_address;
            document.getElementById('city').value = data?.city;
            document.getElementById('postal_code').value = data?.postal_code;
            document.getElementById('institution_type').value = data?.institution_type;
            document.getElementById('institution_name').value = data?.institution_name;
            document.getElementById('institution_address').value = data?.institution_address;
      })
      .catch((error) => {
            console.log('Error fetching profile info:', error);
      });
};

const initializePage = () => {
      if(info_id) {
            getProfileInfo();
            document.getElementById('updateButton').style.display = 'block';
            document.getElementById('saveButton').style.display = 'none';
      } else {
            document.getElementById('updateButton').style.display = 'none';
            document.getElementById('saveButton').style.display = 'block';
      }
};

initializePage();
