document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('recipe-form');
  const recipesContainer = document.getElementById('recipes');
  let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

  function saveRecipes() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }

  function renderRecipes() {
    recipesContainer.innerHTML = '';
    recipes.forEach((recipe, index) => {
      const card = document.createElement('div');
      card.className = 'recipe-card';
      card.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        <button onclick="deleteRecipe(${index})">Delete</button>
      `;
      recipesContainer.appendChild(card);
    });
  }

  window.deleteRecipe = function(index) {
    recipes.splice(index, 1);
    saveRecipes();
    renderRecipes();
  };

  // ✅ Merged with Chicken Biryani default image
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    let image = document.getElementById('image-url').value;

    // Set Chicken Biryani as default image if empty
    if (!image) {
      image = "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/chicken-biryani-recipe.jpg";
    }

    recipes.push({ title, ingredients, instructions, image });
    saveRecipes();
    renderRecipes();
    form.reset();
  });

  renderRecipes();
});
