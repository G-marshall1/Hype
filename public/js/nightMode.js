  console.log('nightMode.js loaded');
document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleNightMode');
    const body = document.body;
    // Check if the user has a theme preference stored
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        body.classList.add(storedTheme);
    }
    toggleButton.addEventListener('click', function () {
        // Toggle the 'night-mode' class on the body
        body.classList.toggle('night-mode');
        // Check if the 'night-mode' class is present and save the theme preference
        const isNightMode = body.classList.contains('night-mode');
        localStorage.setItem('theme', isNightMode ? 'night-mode' : '');
        console.log('Night mode toggled');
    });
}); 