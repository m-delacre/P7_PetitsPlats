const searchInput = document.getElementById('search');
let foundRecipe = [];
const filterIngredient = [];
const filterAppareils = [];
const filterUstensils = [];
let from;

function defineFrom() {
  if (foundRecipe.length == 0) {
    from = recipes;
  } else {
    from = foundRecipe;
  }
}

function research(tag) {
  // define from wich array we will research
  defineFrom();
  const fromArray = from;
  if (tag.length >= 3) {
    foundRecipe = [];
    fromArray.forEach((recipe) => {
      // check if the name matches
      if (recipe.name.toLowerCase().includes(tag.toLowerCase()) || recipe.description.toLowerCase().includes(tag.toLowerCase())) {
        if (foundRecipe.indexOf(recipe) === -1) {
          foundRecipe.push(recipe);
        }
      }
      // check if an ingredient matches
      recipe.ingredients.forEach((ingredient) => {
        if (ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())) {
          if (foundRecipe.indexOf(recipe) === -1) {
            foundRecipe.push(recipe);
          }
        }
      });

      /// //////////////////////////
      // not in principal research
      /// //////////////////////////

      // check if apliance matches
      if (recipe.appliance.toLowerCase() == tag.toLowerCase()) {
        if (foundRecipe.indexOf(recipe) === -1) {
          foundRecipe.push(recipe);
        }
      }
      // check if ustensiles matches
      recipe.ustensils.forEach((ustensil) => {
        if (ustensil.toLowerCase().includes(tag.toLowerCase())) {
          if (foundRecipe.indexOf(recipe) === -1) {
            foundRecipe.push(recipe);
          }
        }
      });
    });
    let test = fromArray;
    test.filter(recipe => recipe.name.toLowerCase().includes(tag.toLowerCase()) || recipe.description.toLowerCase().includes(tag.toLowerCase()) || recipe.appliance.toLowerCase() == tag.toLowerCase());
    console.log(test);
  }

  // Show found recipes
  if (foundRecipe.length >= 1) {
    displayRecipes(foundRecipe);
  } else if (foundRecipe.length == 0 && tag.length >= 3) {
    // show not found message because none recipe match the research
    displayNotFound();
  }

  return foundRecipe;
}

function globalResearch() {
  // principal research
  research(searchInput.value.toLowerCase());

  // check every ingredients tag
  const tagIngredients = filterIngredient;
  tagIngredients.forEach((tag) => {
    research(tag);
  });
  // check every appareils tag
  const tagAppareils = filterAppareils;
  tagAppareils.forEach((tag) => {
    research(tag);
  });
  // check every ustensils tag
  const tagUstensils = filterUstensils;
  tagUstensils.forEach((tag) => {
    research(tag);
  });

  if (searchInput.value.length == 0 && filterAppareils.length == 0 && filterIngredient.length == 0 && filterUstensils.length == 0) {
    displayRecipes(recipes);
    foundRecipe = [];
  }
}

searchInput.addEventListener('input', () => {
  research(searchInput.value.toLowerCase());
  globalResearch();
  if (searchInput.value.length == 0) {
    foundRecipe = [];
    research('');
    globalResearch();
  }
  if (searchInput.value.length == 0 && filterAppareils.length == 0 && filterIngredient.length == 0 && filterUstensils.length == 0) {
    displayRecipes(recipes);
    foundRecipe = [];
  }
});
