let searchInput = document.getElementById('search');
let OldRecipes = recipes;
let foundRecipe = [];

function research (tag){
    foundRecipe = [];
    if(tag.length >= 3){
        recipes.forEach(recipe =>{
            //check if the name matches
            if(recipe.name.toLowerCase().includes(tag)){
                if(foundRecipe.indexOf(recipe) === -1){
                    foundRecipe.push(recipe);
                }
            }
            //check if an ingredient matches
            recipe.ingredients.forEach((ingredient) =>{
                if(ingredient.ingredient.toLowerCase().includes(tag)){
                    if(foundRecipe.indexOf(recipe) === -1){
                        foundRecipe.push(recipe);
                    }
                }
            })
            //checks if a word in the description matches
            if(recipe.description.toLowerCase().includes(tag)){
                if(foundRecipe.indexOf(recipe) === -1){
                    foundRecipe.push(recipe);
                }
            }
        });
    }else if(tag.length > 0 && tag.length < 3){
        deleteRecipes();
    }

    //Show found recipes
    if(foundRecipe.length >= 1){
        displayRecipes(foundRecipe);
    }else if(foundRecipe.length == 0 && tag.length >= 3){
        //show not found message because none recipe match the research
        displayNotFound();
    }

    return foundRecipe;
}

searchInput.addEventListener('input',()=>{
    research(searchInput.value.toLowerCase());
    if(searchInput.value.length == 0){
        displayRecipes(recipes);
        foundRecipe = [];
    }
})