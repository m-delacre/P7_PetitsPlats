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

//Clear the recipe section
function deleteRecipes(){
    let recipeSection = document.getElementById("recipeSection");
    recipeSection.innerHTML = '';
}

//Display all the recipes
function displayRecipes(recipes) {
    deleteRecipes();
    recipes.forEach((recipe) => {
        createRecipe(recipe);
    });
}

//Show message if no recipe found
function displayNotFound(){
    deleteRecipes();
    let recipeSection = document.getElementById("recipeSection");
    let notFound = document.createElement('p');
    notFound.innerText = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.';
    recipeSection.appendChild(notFound);
}

//Ingredient management

//Get the ingredients from all recipes in an array and remove duplicates
function getIngredients(){
    let Listeingredients = [];
    defineFrom();
    from.forEach((recipe) => {
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
        newIngredientP.innerText = ingredients[i];
        //creation of the tag
        newIngredientP.addEventListener('click', ()=>{
            const tagSection = document.getElementById('filterTag');
            let newTag = document.createElement('div');
            newTag.setAttribute('class','tagCard tagCard--Ingredients');
            tagSection.appendChild(newTag);
            let tagName = document.createElement('p');
            tagName.innerText = ingredients[i];
            let tagIcon = document.createElement('i');
            tagIcon.setAttribute('class','fa-regular fa-circle-xmark');
            newTag.appendChild(tagName);
            newTag.appendChild(tagIcon);
            //research with the tag selected
            filterIngredient.push(tagName.innerText);
            globalResearch();
            document.getElementById('underIngredients').style.display = "none";
            clearIngredients();
            underSectionPos();
            document.getElementById('firstBtn').style.width = "200px";
            tagIcon.addEventListener('click', ()=>{
                filterIngredient.splice(filterIngredient.indexOf(tagName.innerText),1);
                tagIcon.parentElement.remove();
                foundRecipe = [];
                globalResearch();
                underSectionPos();
            })
        });
        underSection.appendChild(newIngredientP);
    }
}

function clearIngredients(){
    const underSection = document.getElementById('underIngredients');
    underSection.innerHTML = '';
}

//device management

////Get the devices from all recipes in an array and remove duplicates
function getAppareils(){
    let ListeAppareils = [];
    defineFrom();
    from.forEach((recipe) => {
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
        newAppareil.innerText = appareils[i];
        underSection.appendChild(newAppareil);
         //creation of the tag
         newAppareil.addEventListener('click', ()=>{
            const tagSection = document.getElementById('filterTag');
            let newTag = document.createElement('div');
            newTag.setAttribute('class','tagCard tagCard--Appareils');
            tagSection.appendChild(newTag);
            let tagName = document.createElement('p');
            tagName.innerText = appareils[i];
            let tagIcon = document.createElement('i');
            tagIcon.setAttribute('class','fa-regular fa-circle-xmark');
            newTag.appendChild(tagName);
            newTag.appendChild(tagIcon);
            //research with the tag selected
            filterAppareils.push(tagName.innerText);
            globalResearch();
            document.getElementById('underAppareils').style.display = "none";
            clearAppareils();
            underSectionPos();
            document.getElementById('secondtBtn').style.width = "200px";
            tagIcon.addEventListener('click', ()=>{
                filterAppareils.splice(filterAppareils.indexOf(tagName.innerText),1);
                tagIcon.parentElement.remove();
                foundRecipe = [];
                globalResearch();
                underSectionPos();
            })
        });
    }
}

function clearAppareils(){
    const underSection = document.getElementById('underAppareils');
    underSection.innerHTML = '';
}

//Ustensiles management

//Get the ustensiles from all recipes in an array and remove duplicates
function getUstensiles(){
    let ListeUstensiles = [];
    defineFrom();
    from.forEach((recipe) => {
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
        newUstensileP.innerText = ustensiles[i];
        //creation of the tag
        newUstensileP.addEventListener('click', ()=>{
            const tagSection = document.getElementById('filterTag');
            let newTag = document.createElement('div');
            newTag.setAttribute('class','tagCard tagCard--Ustensils');
            tagSection.appendChild(newTag);
            let tagName = document.createElement('p');
            tagName.innerText = ustensiles[i];
            let tagIcon = document.createElement('i');
            tagIcon.setAttribute('class','fa-regular fa-circle-xmark');
            newTag.appendChild(tagName);
            newTag.appendChild(tagIcon);
            //research with the tag selected
            filterUstensils.push(tagName.innerText);
            globalResearch();
            document.getElementById('underUstensiles').style.display = "none";
            clearIngredients();
            underSectionPos();
            document.getElementById('thirdBtn').style.width = "200px";
            tagIcon.addEventListener('click', ()=>{
                filterUstensils.splice(filterUstensils.indexOf(tagName.innerText),1);
                tagIcon.parentElement.remove();
                foundRecipe = [];
                globalResearch();
                underSectionPos();
            })
        });
        underSection.appendChild(newUstensileP);
    }
}

function clearUstensiles(){
    const underSection = document.getElementById('underUstensiles');
    underSection.innerHTML = '';
}

//filter display
let section = document.getElementById('sortSection');
let focuses = section.getElementsByTagName('input');

//Manage if lists of sort buttons are displayed or not
for(let focus of focuses){
        focus.addEventListener('focusout',()=> {
            setTimeout(() => {
                switch(focus.name.toLowerCase()){
                    case "ingredients":
                        document.getElementById('underIngredients').style.display = "none";
                        clearIngredients();
                        underSectionPos();
                        document.getElementById('firstBtn').style.width = "200px";
                    break;
                    case "appareils":
                        document.getElementById('underAppareils').style.display = "none";
                        clearAppareils();
                        underSectionPos();
                        document.getElementById('secondtBtn').style.width = "200px";
                    break;
                    case "ustensiles": 
                        document.getElementById('underUstensiles').style.display = "none";
                        clearUstensiles();
                        underSectionPos();
                        document.getElementById('thirdBtn').style.width = "200px";
                    break;           
                }
                focus.value = "";
                
            }, 100);
        });

        focus.addEventListener('focusin', function(){
           setTimeout(()=>{
            switch(focus.name.toLowerCase()){
                case "ingredients":
                    clearIngredients();
                    createListeIngredients();
                    document.getElementById('underIngredients').style.display = "flex";
                    document.getElementById('firstBtn').style.width = "720px";
                    underSectionPos();
                break;
                case "appareils":
                    clearAppareils();
                    createListeAppareils();
                    document.getElementById('underAppareils').style.display = "flex";
                    document.getElementById('secondtBtn').style.width = "500px";
                    underSectionPos();
                break;
                case "ustensiles": 
                    clearUstensiles();
                    createListeUstensiles();
                    document.getElementById('underUstensiles').style.display = "flex";
                    document.getElementById('thirdBtn').style.width = "500px";
                    underSectionPos();
                break;            

            }
           }, 100)
           

        })
}

//Modifity underSection position if has active tags
function underSectionPos(){
    let filterTag = document.getElementById('filterTag');
    let filterTagCount = filterTag.childElementCount;
    if(filterTagCount > 0){
        document.getElementById('underIngredients').style.top = "322px"
        document.getElementById('underAppareils').style.top = "322px"
        document.getElementById('underUstensiles').style.top = "322px"
    } else if(filterTagCount == 0){
        document.getElementById('underIngredients').style.top = "272px"
        document.getElementById('underAppareils').style.top = "272px"
        document.getElementById('underUstensiles').style.top = "272px"
    }
}

function updateIngredient(input){
    const underSection = document.getElementById('underIngredients');
    clearIngredients();
    let ingredients = [];
    let newIngredients = getIngredients();
    newIngredients.forEach((ingre)=>{
        if(ingre.toLowerCase().includes(input)){
            if(ingredients.indexOf(ingre) === -1){
                ingredients.push(ingre);
            }
        }
    })
    for(let i=0; i<ingredients.length; i++){
        let newIngredientP = document.createElement('p');
        newIngredientP.innerText = ingredients[i];
        //creation of the tag
        newIngredientP.addEventListener('click', ()=>{
            const tagSection = document.getElementById('filterTag');
            let newTag = document.createElement('div');
            newTag.setAttribute('class','tagCard tagCard--Ingredients');
            tagSection.appendChild(newTag);
            let tagName = document.createElement('p');
            tagName.innerText = ingredients[i];
            let tagIcon = document.createElement('i');
            tagIcon.setAttribute('class','fa-regular fa-circle-xmark');
            newTag.appendChild(tagName);
            newTag.appendChild(tagIcon);
            //research with the tag selected
            filterIngredient.push(tagName.innerText);
            globalResearch();
            document.getElementById('underIngredients').style.display = "none";
            clearIngredients();
            underSectionPos();
            document.getElementById('firstBtn').style.width = "200px";
            tagIcon.addEventListener('click', ()=>{
                filterIngredient.splice(filterIngredient.indexOf(tagName.innerText),1);
                tagIcon.parentElement.remove();
                foundRecipe = [];
                globalResearch();
                underSectionPos();
            })
        });
        underSection.appendChild(newIngredientP);
    }
}

function updateAppareils(input){
    const underSection = document.getElementById('underAppareils');
    clearAppareils();
    let appareils = [];
    let newAppareil = getAppareils();
    newAppareil.forEach((appareil)=>{
        if(appareil.toLowerCase().includes(input)){
            if(appareils.indexOf(appareil) === -1){
                appareils.push(appareil);
            }
        }
    })
    for(let i=0; i<appareils.length; i++){
        let newAppareil = document.createElement('p');
        newAppareil.innerText = appareils[i];
        underSection.appendChild(newAppareil);
         //creation of the tag
         newAppareil.addEventListener('click', ()=>{
            const tagSection = document.getElementById('filterTag');
            let newTag = document.createElement('div');
            newTag.setAttribute('class','tagCard tagCard--Appareils');
            tagSection.appendChild(newTag);
            let tagName = document.createElement('p');
            tagName.innerText = appareils[i];
            let tagIcon = document.createElement('i');
            tagIcon.setAttribute('class','fa-regular fa-circle-xmark');
            newTag.appendChild(tagName);
            newTag.appendChild(tagIcon);
            //research with the tag selected
            filterAppareils.push(tagName.innerText);
            globalResearch();
            document.getElementById('underAppareils').style.display = "none";
            clearAppareils();
            underSectionPos();
            document.getElementById('secondtBtn').style.width = "200px";
            tagIcon.addEventListener('click', ()=>{
                filterAppareils.splice(filterAppareils.indexOf(tagName.innerText),1);
                tagIcon.parentElement.remove();
                foundRecipe = [];
                globalResearch();
                underSectionPos();
            })
        });
    }
}

function updateUstensils(input){
    const underSection = document.getElementById('underUstensiles');
    clearUstensiles();
    let ustensiles = [];
    let newUsten = getUstensiles();
    newUsten.forEach((ustensil)=>{
        if(ustensil.toLowerCase().includes(input)){
            if(ustensiles.indexOf(ustensil) === -1){
                ustensiles.push(ustensil);
            }
        }
    })
    for(let i=0; i<ustensiles.length; i++){
        let newUstensileP = document.createElement('p');
        newUstensileP.innerText = ustensiles[i];
        //creation of the tag
        newUstensileP.addEventListener('click', ()=>{
            const tagSection = document.getElementById('filterTag');
            let newTag = document.createElement('div');
            newTag.setAttribute('class','tagCard tagCard--Ustensils');
            tagSection.appendChild(newTag);
            let tagName = document.createElement('p');
            tagName.innerText = ustensiles[i];
            let tagIcon = document.createElement('i');
            tagIcon.setAttribute('class','fa-regular fa-circle-xmark');
            newTag.appendChild(tagName);
            newTag.appendChild(tagIcon);
            //research with the tag selected
            filterUstensils.push(tagName.innerText);
            globalResearch();
            document.getElementById('underUstensiles').style.display = "none";
            clearIngredients();
            underSectionPos();
            document.getElementById('thirdBtn').style.width = "200px";
            tagIcon.addEventListener('click', ()=>{
                filterUstensils.splice(filterUstensils.indexOf(tagName.innerText),1);
                tagIcon.parentElement.remove();
                foundRecipe = [];
                globalResearch();
                underSectionPos();
            })
        });
        underSection.appendChild(newUstensileP);
    }
}

//sort bouton input listenner
let inputIngredient = document.getElementById('ingredients');
inputIngredient.addEventListener('input',()=>{
    updateIngredient(inputIngredient.value.toLowerCase());
});

let inputAppareils = document.getElementById('appareils');
inputAppareils.addEventListener('input',()=>{
    updateAppareils(inputAppareils.value.toLowerCase());
});

let inputUstensils = document.getElementById('ustensiles');
inputUstensils.addEventListener('input',()=>{
    updateUstensils(inputUstensils.value.toLowerCase());
});

//default display
displayRecipes(recipes);