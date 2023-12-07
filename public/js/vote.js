document.addEventListener('DOMContentLoaded', () => {
    // Execute this code after the DOM is fully loaded
  
    // Find all vote forms on the page
    const voteForms = document.querySelectorAll('form[action="/vote"]');
  
    // Attach a submit event listener to each form
    voteForms.forEach((form) => {
      form.addEventListener('submit', async (event) => {
        // Prevent the default form submission
        event.preventDefault();
  
        // Get the challenge ID from the hidden input
        const challengeId = form.querySelector('input[name="challengeId"]').value;
  
        try {
          // Send a POST request to the /vote endpoint with the challenge ID
          const response = await fetch('/vote', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ challengeId }),
          });
  
          if (response.ok) {
            // Handle the success case, for example, you might update the UI to indicate the vote was successful
            alert('Vote submitted successfully!');
  
            // Update the vote count for the current challenge
            updateVoteCount(challengeId);
          } else {
            // Handle the error case
            alert('Failed to submit vote. Please try again.');
          }
        } catch (error) {
          console.error('Error submitting vote:', error);
          alert('An error occurred. Please try again later.');
        }
      });
    });
  
    // Function to update the vote count for a specific challenge
    async function updateVoteCount(challengeId) {
      try {
        // Fetch the updated vote count from the server
        const response = await fetch(`/vote/count/${challengeId}`);
        if (response.ok) {
          // Parse the response JSON
          const { voteCount } = await response.json();
  
          // Update the UI with the new vote count
          const voteCountElement = document.querySelector(`#challenge-${challengeId}-count`);
          if (voteCountElement) {
            voteCountElement.textContent = `Votes: ${voteCount}`;
          }
        } else {
          console.error('Failed to fetch vote count.');
        }
      } catch (error) {
        console.error('Error updating vote count:', error);
      }
    }
  });
  