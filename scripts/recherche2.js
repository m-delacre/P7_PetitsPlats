const searchInput = document.getElementById('search');
let foundRecipe = [];
const filterIngredient = [];
const filterAppareils = [];
const filterUstensils = [];
let from;

function defineFrom() {
  if (foundRecipe.length === 0) {
    from = recipes;
  } else {
    from = foundRecipe;
  }
}

function research(tag) {
  // define from wich array we will research
  defineFrom();
  const fromArray = from;
  let i = 0;
  let y = 0;
  foundRecipe = [];
  if (tag.length >= 3) {
    while (i < fromArray.length) {
      // check name and description
      if (fromArray[i].name.toLowerCase().includes(tag.toLowerCase()) || fromArray[i].description.toLowerCase().includes(tag.toLowerCase())) {
        if (foundRecipe.indexOf(fromArray[i]) === -1) {
          foundRecipe.push(fromArray[i]);
        }
      }
      // check every ingredients
      while (y < fromArray[i].ingredients.length) {
        if (fromArray[i].ingredients[y].ingredient.toLowerCase().includes(tag.toLowerCase())) {
          if (foundRecipe.indexOf(fromArray[i]) === -1) {
            foundRecipe.push(fromArray[i]);
          }
        }
        y += 1;
      }

      /// //////////////////////////
      // not in principal research
      /// //////////////////////////

      // check if apliance matches
      if (fromArray[i].appliance.toLowerCase() === tag.toLowerCase()) {
        if (foundRecipe.indexOf(fromArray[i]) === -1) {
          foundRecipe.push(fromArray[i]);
        }
      }
      // check if ustensiles matches
      fromArray[i].ustensils.forEach((ustensil) => {
        if (ustensil.toLowerCase().includes(tag.toLowerCase())) {
          if (foundRecipe.indexOf(fromArray[i]) === -1) {
            foundRecipe.push(fromArray[i]);
          }
        }
      });

      // next recipe
      i += 1;
    }
  }

  // Show found recipes
  if (foundRecipe.length >= 1) {
    displayRecipes(foundRecipe);
  } else if (foundRecipe.length === 0 && tag.length >= 3) {
    // show not found message because none recipe match the research
    displayNotFound();
  }

  return foundRecipe;
}

function globalResearch() {
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

  if (searchInput.value.length === 0 && filterAppareils.length === 0 && filterIngredient.length === 0 && filterUstensils.length === 0) {
    displayRecipes(recipes);
    foundRecipe = [];
  }
}

searchInput.addEventListener('input', () => {
  research(searchInput.value.toLowerCase());
  globalResearch();
  if (searchInput.value.length === 0) {
    foundRecipe = [];
    research('');
    globalResearch();
  }
  if (searchInput.value.length === 0 && filterAppareils.length === 0 && filterIngredient.length === 0 && filterUstensils.length === 0) {
    displayRecipes(recipes);
    foundRecipe = [];
  }
});
