document.addEventListener('DOMContentLoaded', () => {
    const videoSubmitForm = document.getElementById('videoSubmitForm');
  
    if (videoSubmitForm) {
      videoSubmitForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const videoName = document.getElementById('videoName').value;
        const videoUrl = document.getElementById('videoUrl').value;
        const videoDescription = document.getElementById('videoDescription').value;
  
        try {
          // Send video submission data to the server using fetch, needs to be checked is sent 
          // to right place
          const response = await fetch('/video/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              videoName,
              videoUrl,
              videoDescription,
            }),
          });
  
          if (response.ok) {
            // Redirect to a success page or display a success message, needs to be checked
            console.log('Video submitted successfully!');
          } else {
            // Handle errors or display error messages, also needs to be checked
            console.error('Error submitting video:', response.statusText);
          }
        } catch (error) {
          console.error('Error submitting video:', error);
        }
      });
    }
  });
  