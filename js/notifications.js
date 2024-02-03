const showNotification = (message, type) => {
      const alertDiv = document.createElement('div');
      alertDiv.classList.add('alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show');
      alertDiv.innerHTML = `
            <strong>${type === 'success' ? 'Success!': 'Error!'}</strong>
            <span>${message}</span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;

      const alertContainer = document.getElementById('alertContainer');
      alertContainer.innerHTML = '';
      alertContainer.appendChild(alertDiv);

      setTimeout(() => {
            alertDiv.classList.remove('show');
      }, 3000);
};

export { showNotification };