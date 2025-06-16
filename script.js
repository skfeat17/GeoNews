let home = document.querySelector("#home");
let categoryMenu = document.getElementById("category-menu")
let countryMenu = document.getElementById("country-menu")
let content = document.getElementById("content-box")
let header = document.getElementById("news-header")
if (localStorage.length == 0) {
    let category = localStorage.setItem("category", "general")
    let country = localStorage.setItem("country", "in")
    let countryName = localStorage.setItem("country-name","India")
}


let totalNewsData;

let randIndex = (min, max) => {
    return ((max - min) * Math.random()) + 1
}

function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  

function timeSinceGreatestUnit(dateString) {
    const past = new Date(dateString);
    const now = new Date();

    const diffMs = now - past;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
}

let max = 0;
function filterDataFunc(rawData) {
    let filterData = rawData.filter((data) => {
        if (data.urlToImage === null) {
            return false;
        }
        else {
            max += 1;
            return true;
        }
    })
    return filterData;
}



async function fetchNews() {
    let cat = localStorage.getItem("category")
    let cn = localStorage.getItem("country")
    let country = localStorage.getItem("country-name")
    header.innerText = `${toTitleCase(cat)} News Headlines From ${country}`
    let response = await fetch(`https://saurav.tech/NewsAPI/top-headlines/category/${cat}/${cn}.json`);
    console.log(response.status)
    let data = await response.json()
    totalNewsData = filterDataFunc(data.articles)
    console.log(totalNewsData)
    let ind = randIndex(0, max - 20)
    let displayableNews = totalNewsData.slice(ind, ind + 20)

    displayableNews.map((data) => {
        let card = document.createElement("div");
        card.innerHTML = `<div class="card mt-1" style="width: 19rem;">
  <img src="${data.urlToImage}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.title}</h5>
    <p class="card-text">${data.description}</p>
     <p class="card-text"><small class="text-muted">Last updated ${timeSinceGreatestUnit(data.publishedAt)}</small></p>
  </div>
</div>`
        content.appendChild(card);
    })

}
fetchNews();

const categoryItems = document.querySelectorAll("#category-menu .dropdown-item");

categoryItems.forEach((item) => {
    item.addEventListener("click", function (e) {
        e.preventDefault();
        let selectedCategory = this.textContent.trim();
        console.log(selectedCategory)
        localStorage.setItem("category", selectedCategory.toLowerCase())
        window.location.reload();
    });
});
const countryItems = document.querySelectorAll("#country-menu .dropdown-item");

countryItems.forEach((item) => {
    item.addEventListener("click", function (e) {
        e.preventDefault();
        let selectedCountry = this.textContent.trim();
        console.log(selectedCountry)
        switch (selectedCountry) {
            case "India":
                localStorage.setItem("country", "in")
                localStorage.setItem("country-name", "India")
                break;
            case "Russia":
                localStorage.setItem("country", "ru")
                localStorage.setItem("country-name", "Russia")
                break;
            case "USA":
                localStorage.setItem("country", "us")
                localStorage.setItem("country-name", "USA")

                break;
            case "Australia":
                localStorage.setItem("country", "au")
                localStorage.setItem("country-name", "Australia")
                 
                break;
            case "France":
                localStorage.setItem("country", "fr")
                localStorage.setItem("country-name", "France")

                break;
            case "United Kingdom":
                localStorage.setItem("country", "gb")
                localStorage.setItem("country-name", "United Kingdom")

                break;
            default:
                break;
        }

        window.location.reload();
    });
});
