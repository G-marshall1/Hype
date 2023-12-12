

document.addEventListener('DOMContentLoaded', function () {
  const nightModeButton = document.getElementById('toggleNightMode');
  const body = document.body;

  // Check the user's night mode preference from localStorage
  const isNightMode = localStorage.getItem('nightMode') === 'true';

  // Apply night mode if the preference is true
  if (isNightMode) {
    body.classList.add('night-mode');
  }

  // Toggle night mode on button click
  nightModeButton.addEventListener('click', function () {
    body.classList.toggle('night-mode');

    // Update the user's night mode preference in localStorage
    const newNightModeValue = body.classList.contains('night-mode');
    localStorage.setItem('nightMode', newNightModeValue.toString());
  });
});
