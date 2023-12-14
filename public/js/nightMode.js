console.log('nightMode.js loaded');
document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleNightMode');
  
    toggleButton.addEventListener('click', function () {
        console.log('Button clicked');
      document.body.classList.toggle('night-mode');
      console.log('Night mode toggled');
    });
  });
  