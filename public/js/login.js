document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginForm');
  
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
  
        try {
          // Send login data to the server using fetch
          const response = await fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
            }),
          });
  
          if (response.ok) {
            // Redirect to the home page or a success page
            window.location.href = '/';
          } else {
            // Handle errors or display error messages
            const responseData = await response.json();
            console.error('Login failed:', responseData.error);
            // Display error message to the user if needed
          }
        } catch (error) {
          console.error('Error logging in:', error);
        }
      });
    }
  });
  