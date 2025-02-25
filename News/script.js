// Constants"499d03534f224e8890dcd1f95376001c"
const API_KEY = "499d03534f224e8890dcd1f95376001c";
const url = "https://newsapi.org/v2/everything?q=";

// Fetch News Data
async function fetchData(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching news data:", error);
        return { articles: [] };
    }
}

// Render News
function renderMain(arr) {
    let mainHTML = "";
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].urlToImage) {
            mainHTML += `
            <div class="card">
                <a href=${arr[i].url}>
                    <img src=${arr[i].urlToImage} loading="lazy" />
                    <h4>${arr[i].title}</h4>
                    <div class="publishbyDate">
                        <p>${arr[i].source.name}</p>
                        <span>•</span>
                        <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                    </div>
                    <div class="desc">
                        ${arr[i].description}
                    </div>
                </a>
                <button onclick="toggleKeyPoints(${i}, \`${arr[i].content || arr[i].description || ''}\`)">Show Key Points</button>
                <ul id="keyPoints-${i}" class="hidden"></ul>
            </div>`;
        }
    }
    document.querySelector("main").innerHTML = mainHTML;
}

// Extract Key Points from Content
function extractKeyPoints(text) {
    if (!text || text.length < 50) return ["No key points available."];

    const sentences = text.split(". ");
    if (sentences.length <= 3) return sentences;

    const keywords = ["important", "significant", "key", "major", "impact", "effect", "increase", "decrease", "study", "report", "research"];
    
    let scoredSentences = sentences.map(sentence => {
        let score = keywords.reduce((acc, word) => acc + (sentence.toLowerCase().includes(word) ? 1 : 0), 0);
        return { sentence, score };
    });

    scoredSentences.sort((a, b) => b.score - a.score);
    return scoredSentences.slice(0, 3).map(item => item.sentence.trim() + ".");
}

// Toggle Key Points Visibility
function toggleKeyPoints(index, content) {
    let keyPoints = extractKeyPoints(content);
    let keyPointsHTML = keyPoints.map(point => `<li>• ${point}</li>`).join(""); // Add bullet points

    let keyPointsList = document.getElementById(`keyPoints-${index}`);
    keyPointsList.innerHTML = keyPointsHTML;
    keyPointsList.classList.toggle("hidden");

    // Ensure the list is properly styled
    keyPointsList.style.listStyleType = "none";
    keyPointsList.style.paddingLeft = "10px";
}

// Search Functionality
async function Search(query) {
    const data = await fetchData(query);
    renderMain(data.articles);
}

// Event Listeners
document.getElementById("searchForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = document.getElementById("searchInput").value;
    const data = await fetchData(query);
    renderMain(data.articles);
});

document.getElementById("searchFormMobile").addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = document.getElementById("searchInputMobile").value;
    const data = await fetchData(query);
    renderMain(data.articles);
});

// Open Notepad
function openNotepad() {
    window.location.href = "notepad.html";
}

// Weather API
const WEATHER_API_KEY = "699d5b44188c6da0e9452cb858fd4941";

async function fetchWeather(lat, lon) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        
        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].description;
        document.getElementById("weather").innerHTML = `${temp}°C, ${condition}`;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("weather").innerHTML = "Weather data unavailable";
    }
}

function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            () => {
                document.getElementById("weather").innerHTML = "Location Denied";
            }
        );
    } else {
        document.getElementById("weather").innerHTML = "Geolocation Not Supported";
    }
}

// Call Weather Function on Page Load
window.onload = getWeather;

// Open Quiz Page
function openQuizPage() {
    window.open("quiz_selection.html", "_blank");
}

  
