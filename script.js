// Fullscreen functionality
const fullscreenBtn = document.getElementById('fullscreen-btn');

fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullscreenBtn.textContent = 'Exit Fullscreen';
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            fullscreenBtn.textContent = 'Fullscreen';
        }
    }
});

const searchBtn = document.getElementById('search-btn');
const searchQuery = document.getElementById('search-query');
const resultsContainer = document.getElementById('results-container');
const bookModal = document.getElementById('book-modal');
const closeBtn = document.querySelector('.close-btn');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalAuthors = document.getElementById('modal-authors');
const modalDescription = document.getElementById('modal-description');

searchBtn.addEventListener('click', () => {
    const query = searchQuery.value;
    if (query) {
        fetchBooks(query);
    }
});

function fetchBooks(query) {
    const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => displayResults(data.items))
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(books) {
    resultsContainer.innerHTML = ''; // Clear previous results

    books.forEach(book => {
        const bookInfo = book.volumeInfo;
        const thumbnail = bookInfo.imageLinks?.thumbnail || 'placeholder.jpg'; // Fallback to a placeholder image
        const title = bookInfo.title;
        const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author';
        const description = bookInfo.description ? bookInfo.description : 'No description available';

        const bookItem = document.createElement('div');
        bookItem.classList.add('result-item');

        bookItem.innerHTML = `
            <img src="${thumbnail}" alt="${title}">
            <h3>${title}</h3>
            <p>${authors}</p>
        `;

        // Add event listener to open modal with book details
        bookItem.addEventListener('click', () => {
            modalTitle.textContent = title;
            modalImg.src = thumbnail;
            modalAuthors.textContent = authors;
            modalDescription.textContent = description;
            bookModal.style.display = 'block';
        });

        resultsContainer.appendChild(bookItem);
    });
}

// Close the modal when the user clicks on the close button
closeBtn.addEventListener('click', () => {
    bookModal.style.display = 'none';
});

// Close the modal when the user clicks outside of the modal
window.addEventListener('click', (event) => {
    if (event.target === bookModal) {
        bookModal.style.display = 'none';
    }
});


