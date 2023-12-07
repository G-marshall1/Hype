document.addEventListener('DOMContentLoaded', () => {
    // Execute this code after the DOM is fully loaded
  
    // Fetch the list of past winning videos from the server
    fetch('/api/videos') // Assuming your server provides an API endpoint to get the list of videos
      .then((response) => response.json())
      .then((videos) => {
        // Check if there are videos available
        if (videos.length > 0) {
          // Create an unordered list element
          const ul = document.createElement('ul');
  
          // Iterate over the videos and create list items
          videos.forEach((video) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${video.title}</strong> - Uploaded by ${video.User.username}`;
            ul.appendChild(li);
          });
  
          // Append the list to the section
          document.querySelector('section h2').insertAdjacentElement('afterend', ul);
        } else {
          // No videos available
          const p = document.createElement('p');
          p.textContent = 'No past winning videos available.';
          document.querySelector('section').appendChild(p);
        }
      })
      .catch((error) => {
        console.error('Error fetching videos:', error);
        // Handle the error case
        const p = document.createElement('p');
        p.textContent = 'An error occurred while fetching videos. Please try again later.';
        document.querySelector('section').appendChild(p);
      });
  });