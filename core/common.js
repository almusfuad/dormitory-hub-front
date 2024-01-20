// jQuery
var jqueryScript = document.createElement('script');
jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
document.head.appendChild(jqueryScript);

// Bootstrap CSS
var linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
document.head.appendChild(linkElement);

// Bootstrap JS (includes Popper.js)
var bootstrapScript = document.createElement('script');
bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
document.head.appendChild(bootstrapScript);