document.getElementById('viewSourceBtn').addEventListener('click', function () {
  const repoUrl = document.getElementById('repoUrl').value;
  if (repoUrl) {
    fetchRepo(repoUrl);
  } else {
    alert('Please enter a GitHub repository URL.');
  }
});

function fetchRepo(repoUrl) {
  const apiUrl = `https://api.github.com/repos/${repoUrl}/contents`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Repository not found or invalid URL');
      }
      return response.json();
    })
    .then(data => {
      displayCode(data);
    })
    .catch(error => {
      console.error('Error fetching repository:', error);
      alert(error.message);
    });
}

function displayCode(files) {
  const codeDisplay = document.getElementById('codeDisplay');
  codeDisplay.innerHTML = ''; // Clear previous code

  files.forEach(file => {
    if (file.type === 'file') {
      const fileLink = document.createElement('a');
      fileLink.href = file.download_url;
      fileLink.target = '_blank';
      fileLink.textContent = file.name;
      codeDisplay.appendChild(fileLink);
      codeDisplay.appendChild(document.createElement('br'));
    }
  });
}
