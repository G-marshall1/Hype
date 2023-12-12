const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/videoPost`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target && event.target) {
    const hasDataId = event.target.hasAttribute('data-id');
    if (hasDataId) {
    const id = event.target.getAttribute('data-id')

  const response = await fetch(`/api/videoPost/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete Post');
    }
  }
}
};
document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleNightMode');

  toggleButton.addEventListener('click', function () {
    document.body.classList.toggle('night-mode');
  });
});

document
  .querySelector('.form.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);

