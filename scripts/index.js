//Create the recipe card
function createRecipe(recipe){
    let recipeSection = document.getElementById("recipeSection");

    //The card
    const article = document.createElement('article');
    article.setAttribute('class','recipeCard');
    //Top of the card
    const top = document.createElement('div');
    top.setAttribute('class','recipeCard--photo');
    article.appendChild(top);
    //Bot of the card
    const bot = document.createElement('div');
    bot.setAttribute('class','recipeCard--info');
    article.appendChild(bot);
    //the bottom details of the card
    //top info section
    const topInfo = document.createElement('div');
    topInfo.setAttribute('class','recipeCard--info--topInfo');
    bot.appendChild(topInfo);
    //title part
    const titleSection = document.createElement('div');
    titleSection.setAttribute('class','recipeCard--info--topInfo--title');
    topInfo.appendChild(titleSection);
    const title = document.createElement('p');
    title.innerText = recipe.name;
    titleSection.appendChild(title);
    //time part
    const timeSection = document.createElement('div');
    timeSection.setAttribute('class','recipeCard--info--topInfo--time');
    topInfo.appendChild(timeSection);
    //icon
    const icon = document.createElement('i');
    icon.setAttribute('class','fa-regular fa-clock timeIcon');
    timeSection.appendChild(icon);
    //time
    const time = document.createElement('p');
    time.setAttribute('class','timeText');
    time.innerText = `${recipe.time} min`;
    timeSection.appendChild(time);
    //bot info section
    const botInfo = document.createElement('div');
    botInfo.setAttribute('class','recipeCard--info--botInfo');
    bot.appendChild(botInfo);
    //ingredients
    const ingredientSection = document.createElement('div');
    ingredientSection.setAttribute('class','recipeCard--info--botInfo--ingredients');
    botInfo.appendChild(ingredientSection);

    recipe.ingredients.forEach(ingredient => {
        const ingredientP = document.createElement('p');
        ingredientP.innerHTML = displayIngredient(ingredient);
        ingredientSection.appendChild(ingredientP);
    });

    //description
    const descriptionSection = document.createElement('div');
    descriptionSection.setAttribute('class','recipeCard--info--botInfo--description');
    const description = document.createElement('p');
    description.innerText = recipe.description;
    descriptionSection.appendChild(description);
    botInfo.appendChild(descriptionSection);
    
    //link
    recipeSection.appendChild(article);
}

//Add the ingredients to the card
function displayIngredient(ingredient){
    let myIngredient = '';
    if(ingredient.quantity && ingredient.unit){
        myIngredient = `<em>${ingredient.ingredient}</em> : ${ingredient.quantity} ${ingredient.unit}`;
    } else if(ingredient.quantity && ingredient.unit == undefined){
        myIngredient = `<em>${ingredient.ingredient}</em> : ${ingredient.quantity}`;
    }else{
        myIngredient = `<em>${ingredient.ingredient}</em>`
    }
    return myIngredient;
}

//Display all the recipes
function displayRecipes(recipes) {
    recipes.forEach((recipe) => {
        createRecipe(recipe);
    });
}

//Ingredient management

//Get the ingredients from all recipes in an array and remove duplicates
function getIngredients(){
    let Listeingredients = [];
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) =>{
            if(Listeingredients.indexOf(ingredient.ingredient) === -1){
                Listeingredients.push(ingredient.ingredient);
            }
        })
    });

    return Listeingredients;
}

//Create the list of ingredients under the ingredient button
function createListeIngredients(){
    const underSection = document.getElementById('underIngredients');
    let ingredients = getIngredients();
    for(let i=0; i<ingredients.length; i++){
        let newIngredientP = document.createElement('p');
        console.log(ingredients[i])
        newIngredientP.innerText = ingredients[i];
        underSection.appendChild(newIngredientP);
    }
}

//device management

////Get the devices from all recipes in an array and remove duplicates
function getAppareils(){
    let ListeAppareils = [];
    recipes.forEach((recipe) => {
        if(ListeAppareils.indexOf(recipe.appliance) === -1){
            ListeAppareils.push(recipe.appliance);
        }
    });

    return ListeAppareils;
}

//Create the list of device under the ingredient button
function createListeAppareils(){
    const underSection = document.getElementById('underAppareils');
    let appareils = getAppareils();
    for(let i=0; i<appareils.length; i++){
        let newAppareil = document.createElement('p');
        console.log(appareils[i])
        newAppareil.innerText = appareils[i];
        underSection.appendChild(newAppareil);
    }
}

//Ustensiles management

//Get the ustensiles from all recipes in an array and remove duplicates
function getUstensiles(){
    let ListeUstensiles = [];
    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) =>{
            if(ListeUstensiles.indexOf(ustensil) === -1){
                ListeUstensiles.push(ustensil);
            }
        })
    });

    return ListeUstensiles;
}

//Create the list of ustensiles under the ustensiles button
function createListeUstensiles(){
    const underSection = document.getElementById('underUstensiles');
    let ustensiles = getUstensiles();
    for(let i=0; i<ustensiles.length; i++){
        let newUstensileP = document.createElement('p');
        console.log(ustensiles[i])
        newUstensileP.innerText = ustensiles[i];
        underSection.appendChild(newUstensileP);
    }
}

//When clicking on the ingredient input > display the list of ingredients
document.getElementById('ingredients').addEventListener('click',()=>{
    createListeIngredients()
    document.getElementById('underIngredients').style.display = "flex";
})

//When clicking on the appareils input > display the list of device
document.getElementById('appareils').addEventListener('click',()=>{
    createListeAppareils()
    document.getElementById('underAppareils').style.display = "flex";
})

//When clicking on the ustensiles input > display the list of ustensiles
document.getElementById('ustensiles').addEventListener('click',()=>{
    createListeUstensiles()
    document.getElementById('underUstensiles').style.display = "flex";
})

displayRecipes(recipes);