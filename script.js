const apiKey = "0280dc4f8bcbc22a415d274486b1b420";
const template = document.getElementById("template-news-card");
const cardsContainer = document.getElementById("cards-container");

async function fetchData(category = "general") {
  const response = await fetch(
    `https://gnews.io/api/v4/top-headlines?topic=${category}&token=${apiKey}`
  );
  const data = await response.json();
  return data.articles;
}

function renderNewsCard(article) {
  const cardClone = template.content.cloneNode(true);
  const card = cardClone.querySelector(".card");
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.image || "https://via.placeholder.com/400x200";
  newsTitle.textContent = article.title || "No Title";
  newsSource.textContent = `${article.source.name || "Unknown Source"} ${
    article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ""
  }`;
  newsDesc.textContent = article.description || "No description available";

  card.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });

  return cardClone;
}

async function loadNews(category) {
  const articles = await fetchData(category);
  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    const card = renderNewsCard(article);
    cardsContainer.appendChild(card);
  });
}

function onNavItemClick(category) {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => item.classList.remove("active"));

  const activeNavItem = document.getElementById(category);
  activeNavItem.classList.add("active");

  loadNews(category);
}

document.getElementById("search-button").addEventListener("click", async () => {
    const searchText = document.getElementById("search-text").value;
    if (searchText.trim() !== "") {
      const articles = await fetchData(searchText);
      cardsContainer.innerHTML = "";
  
      articles.forEach((article) => {
        const card = renderNewsCard(article);
        cardsContainer.appendChild(card);
      });
    }
  });

function reload() {
  loadNews("general");
}

loadNews("general");
