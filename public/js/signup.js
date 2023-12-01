document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('#signupForm');
  
    if (signupForm) {
      signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        const confirmPassword = document.querySelector('#confirm-password').value;
  
        if (password !== confirmPassword) {
          // Display an error message if passwords do not match
          console.error('Passwords do not match');
          return;
        }
  
        try {
          // Send signup data to the server using fetch
          const response = await fetch('/signup', {
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
            console.error('Signup failed:', responseData.error);
            // Display error message to the user if needed
          }
        } catch (error) {
          console.error('Error signing up:', error);
        }
      });
    }
  });
  