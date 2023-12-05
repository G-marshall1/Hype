document.addEventListener('DOMContentLoaded', () => {
  // Example: Fetch data from the server and update the UI
  fetch('/api/someData')
    .then(response => response.json())
    .then(data => {
      // Update the UI with the fetched data
      console.log(data);
      // Modify the UI using the fetched data, for example:
      document.querySelector('.profile-box h2').textContent = data.userProfile.username;
      document.querySelector('.profile-box p').textContent = `Crowns: ${data.userProfile.crowns}`;
    })
    .catch(error => console.error('Error fetching data:', error));
  
  // Example: Handle form submission
  const form = document.getElementById('exampleForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      // Gather form data
      const formData = new FormData(form);

      // Example: Send form data to the server using fetch
      fetch('/api/submitForm', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server
        console.log(data);
      })
      .catch(error => console.error('Error submitting form:', error));
    });
  }

  // Add more client-side functionality as needed
});
