let searchInput = document.getElementById('search');
let foundRecipe = [];
let filterIngredient = [];
let filterAppareils = [];
let filterUstensils = [];
let from;

function defineFrom(){
    if(foundRecipe.length == 0){
        from = recipes;
    }else{
        from = foundRecipe;
    }
}

function research (tag){
    //define from wich array we will research
    defineFrom();
    let fromArray = from;
    if(tag.length >= 3){
        foundRecipe = [];
        fromArray.forEach(recipe =>{
            //check if the name matches
            if(recipe.name.toLowerCase().includes(tag.toLowerCase()) || recipe.description.toLowerCase().includes(tag.toLowerCase())){
                if(foundRecipe.indexOf(recipe) === -1){
                    foundRecipe.push(recipe);
                }
            }
            //check if an ingredient matches
            recipe.ingredients.forEach((ingredient) =>{
                if(ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())){
                    if(foundRecipe.indexOf(recipe) === -1){
                        foundRecipe.push(recipe);
                    }
                }
            })

            /////////////////////////////
            //not in principal research
            /////////////////////////////

            //check if apliance matches
            if(recipe.appliance.toLowerCase() == tag.toLowerCase()){
                if(foundRecipe.indexOf(recipe) === -1){
                    foundRecipe.push(recipe);
                }
            }
            //check if ustensiles matches
            recipe.ustensils.forEach((ustensil) =>{
                if(ustensil.toLowerCase().includes(tag.toLowerCase())){
                    if(foundRecipe.indexOf(recipe) === -1){
                        foundRecipe.push(recipe);
                    }
                }
            })
        });
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

function globalResearch(){
    //check every ingredients tag
    let tagIngredients = filterIngredient;
    tagIngredients.forEach((tag)=>{
        research(tag)
    });
    //check every appareils tag
    let tagAppareils = filterAppareils;
    tagAppareils.forEach((tag)=>{
        research(tag)
    });
    //check every ustensils tag
    let tagUstensils = filterUstensils;
    tagUstensils.forEach((tag)=>{
        research(tag)
    });

    if(searchInput.value.length == 0 && filterAppareils.length == 0 && filterIngredient.length == 0 && filterUstensils.length == 0 ){
        displayRecipes(recipes);
        foundRecipe = [];
    }
}

searchInput.addEventListener('input',()=>{
    research(searchInput.value.toLowerCase());
    globalResearch();
    if(searchInput.value.length == 0){
        foundRecipe = [];
        research('');
        globalResearch();
    }
    if(searchInput.value.length == 0 && filterAppareils.length == 0 && filterIngredient.length == 0 && filterUstensils.length == 0 ){
        displayRecipes(recipes);
        foundRecipe = [];
    }
});