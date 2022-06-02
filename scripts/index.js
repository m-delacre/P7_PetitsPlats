
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
    console.log(title.textContent);
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
    console.log(time.textContent);
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
    console.log(description.textContent);
    
    //link
    recipeSection.appendChild(article);
}

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

function displayRecipes(recipes) {
    console.log(recipes);
    recipes.forEach((recipe) => {
        createRecipe(recipe);
    });
};

displayRecipes(recipes);