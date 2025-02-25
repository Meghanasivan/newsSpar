const apiKey = "499d03534f224e8890dcd1f95376001c";  // Replace with your News API key
const endpoint = 'https://newsapi.org/v2/top-headlines'; // Endpoint for top headlines
const country = 'us';  // You can specify a country code like 'us' for USA, 'in' for India, etc.

// Function to fetch real-time news
async function fetchRealTimeNews() {
    try {
        const response = await fetch(`${endpoint}?country=${country}&apiKey=${apiKey}`);
        const data = await response.json();
        if (data.status === 'ok') {
            renderBreakingNews(data.articles); // Function to render news
        } else {
            console.error('Error fetching news:', data.message);
        }
    } catch (error) {
        console.error('Failed to fetch real-time news:', error);
    }
}

// Function to render breaking news
function renderBreakingNews(articles) {
    const breakingNewsContainer = document.querySelector('.breaking-news-container');
    const loader = document.querySelector('.loader');
    
    // Hide the loader when news is fetched
    loader.classList.add('hide');
    
    breakingNewsContainer.innerHTML = '';  // Clear existing news

    articles.forEach(article => {
        const newsHTML = `
            <div class="news-item">
                <h5><a href="${article.url}" target="_blank">${article.title}</a></h5>
                <p>${article.description}</p>
                <span class="time">${new Date(article.publishedAt).toLocaleTimeString()}</span>
            </div>
        `;
        breakingNewsContainer.innerHTML += newsHTML;
    });
}

// Add event listener to the "Refresh News" button
document.querySelector('.refresh-news-btn').addEventListener('click', () => {
    // Show loader when refreshing
    document.querySelector('.loader').classList.remove('hide');
    fetchRealTimeNews();  // Fetch news when the button is clicked
});

// Fetch news when the page loads
fetchRealTimeNews();
