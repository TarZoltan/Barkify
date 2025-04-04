const breedSelect = document.getElementById('breedSelect');
const newDogBtn = document.getElementById('newDogBtn');
const dogImage = document.getElementById('dogImage');
const loadingText = document.getElementById('loadingText');


fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
        Object.keys(data.message).forEach(breed => {
            let option = document.createElement('option');
            option.value = breed;
            option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
            breedSelect.appendChild(option);
        });
    });


function fetchDogImage() {
    let breed = breedSelect.value;
    let url = breed ? `https://dog.ceo/api/breed/${breed}/images/random` : 'https://dog.ceo/api/breeds/image/random';
    
    loadingText.style.display = 'block';
    dogImage.classList.add('loading');
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            dogImage.src = data.message;
            dogImage.classList.remove('loading');
            loadingText.style.display = 'none';
        });
}

const themeToggle = document.getElementById('themeToggle');


if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️ Light Mode';
}


themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️ Light Mode';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙 Dark Mode';
    }
});


newDogBtn.addEventListener('click', fetchDogImage);

fetchDogImage();