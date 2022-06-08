let searchInput = document.getElementById('search');
let OldRecipes = recipes;

function research (tag){
    //si tag est dans (verif une a une les recettes)
    //push dans found si il y a une correspondance
    //return found
    let foundRecipe = [];
    if(tag.length >= 2){
        recipes.forEach(recipe =>{
            //verify if the recipe name or appliance match the search
            if(recipe.name.toLowerCase().includes(tag) || recipe.appliance.toLowerCase().includes(tag)){
                if(foundRecipe.indexOf(recipe) === -1){
                    foundRecipe.push(recipe);
                }
            }
            //verify if one of the ingredients name match the search
            recipe.ingredients.forEach((ingredient) =>{
                if(ingredient.ingredient.toLowerCase().includes(tag)){
                    if(foundRecipe.indexOf(recipe) === -1){
                        foundRecipe.push(recipe);
                    }
                }
            })
            //veirfy if one of the ustansils match the search
            recipes.forEach((recipe) => {
                recipe.ustensils.forEach((ustensil) =>{
                    if(ustensil.toLowerCase().includes(tag)){
                        if(foundRecipe.indexOf(recipe) === -1){
                            foundRecipe.push(recipe);
                        }
                    }
                })
            });
        })
    }
    return foundRecipe;
}

searchInput.addEventListener('change',()=>{
    console.log(research(searchInput.value.toLowerCase()));
})