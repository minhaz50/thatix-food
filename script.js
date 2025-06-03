let currentRecipes = [];

async function fetchRecipes(search = "") {
  document.getElementById("recipeLoader").style.display = "flex";
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
  );
  const data = await res.json();
  const meals = data.meals || [];
  currentRecipes = meals.map((meal) => ({
    title: meal.strMeal,
    desc: meal.strInstructions.substring(0, 100) + "...",
    img: meal.strMealThumb,
    fullDesc: meal.strInstructions,
  }));
  displayRecipes(currentRecipes);
  document.getElementById("recipeLoader").style.display = "none";
}

function displayRecipes(recipeList) {
  const container = document.getElementById("recipeGrid");
  const noResults = document.getElementById("noResults");
  container.innerHTML = "";

  if (recipeList.length === 0) {
    noResults.style.display = "block";
    return;
  } else {
    noResults.style.display = "none";
  }

  recipeList.forEach((r, index) => {
    const card = `
    <div class="recipe-card">
      <img src="${r.img}" alt="${r.title}" />
      <div class="recipe-content">
        <h3>${r.title}</h3>
        <p>${r.desc}</p>
        <button onclick="showPopup(${index})">View Details</button>
      </div>
    </div>
  `;
    container.innerHTML += card;
  });
}
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function () {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
};

scrollTopBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function searchRecipes() {
  const term = document.getElementById("searchInput").value;
  fetchRecipes(term);
}

function showPopup(index) {
  const recipe = currentRecipes[index];
  document.getElementById("popupImg").src = recipe.img;
  document.getElementById("popupTitle").textContent = recipe.title;
  document.getElementById("popupDesc").textContent = recipe.fullDesc;
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Initial fetch
window.onload = () => fetchRecipes();
