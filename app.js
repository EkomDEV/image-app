const accessKey = "uFbA0f4JKBw19o-xLZ1lPicdORwjXSZeFgBYtGnjTwk";

const formEl = document.querySelector('form');
const searchInputEl = document.getElementById('search-input');
const searchResultsEl = document.querySelector('.search-results');
const showMoreButtonEl = document.getElementById('show-more-button');

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = searchInputEl.value;
    
    if (!inputData) {
        console.log('Please enter a search term');
        return;
    }

    try {
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (page === 1) {
            searchResultsEl.innerHTML = '';
        }

        const results = data.results;

        results.forEach(result => {
            // Create image container
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('search-result');
            
            // Create image link
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = '_blank';

            // Create image element
            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description;

            // Create description paragraph
            const descriptionPara = document.createElement('p');
            descriptionPara.textContent = result.alt_description || 'No description available';
            descriptionPara.classList.add('image-description');

            // Assemble the elements
            imageLink.appendChild(image);
            imageWrapper.appendChild(imageLink);
            imageWrapper.appendChild(descriptionPara); // Add description after the link
            searchResultsEl.appendChild(imageWrapper);
        });

        page++;
        if (data.total_pages > page) {
            showMoreButtonEl.style.display = 'block';
        }
    } catch (error) {
        console.error('Error fetching images:', error);
        searchResultsEl.innerHTML = '<p>Error fetching images. Please try again later.</p>';
    }
}

// Form submit event handler
formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

// Show more button event handler
showMoreButtonEl.addEventListener('click', () => {
    searchImages();
});

// Hide show more button initially
showMoreButtonEl.style.display = 'none';