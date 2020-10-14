import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';
/***
 * Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {}

/***
 * SEARCH CONTROLLER 
 * 
 */
const controlSearch = async (query) => {
    // 1- Get query from view

    if(query === ""){
        query = searchView.getInput();
    }

    if(query) {
        // 2-  New search object and add to state

        state.search = new Search(query);

        // 3- Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResult);

        try {
            // 4- Search for recipes
            await state.search.getResults();

            // 5- Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            clearLoader();
            alert('Something wrong with the search...');
        }


    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});



elements.searchResultPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');

    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/***
 * RECIPE CONTROLLER
 * 
 */

const controlRecipe = async () => {
    // Get ID from url hash
    const id = window.location.hash.replace('#', '');

    if(id) {
        // Prepare UI for changes !!!
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight seleted searched item
        if(state.search){
            searchView.highlightSelected(id);
        }
        // Creat new recipe obj
        state.recipe = new Recipe(id);

        try {

            // Get recipe data
            await state.recipe.getRecipe();
            
            // parse ingredients
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render Recipe !!!!
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            );


        } catch (error) {
            clearLoader();
            alert(error,'Error processing recipe !');
        }

        

    }else{
        clearLoader();
        recipeView.renderInitRecipe();
    }


}


//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);

// WOW way to call multiple addEventList in array mode !!!

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));



/***
 * List Controller
 * 
 */

const controlList = () => {
    // Creat a new list IF the is none yet

    if(!state.list) state.list = new List();

    // Add each ingredient to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItm(item);
    });

    elements.clearShopping.classList.add('active');

}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle delete button
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        // Delete item from state
        state.list.deleteItem(id);
        // Delete item from UI
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')){
        // Handle the count update
        const val = parseFloat(e.target.value, 10);

        state.list.updateCount(id, val);

    }
});

elements.addToShopping.addEventListener('submit', e => {
    e.preventDefault();
    const select = elements.addToShoppingSelect.value;
    const field = elements.addToShoppingField.value;
    
    if(field !== ""){
        if(!state.list) state.list = new List();
        const item = state.list.addItem(1, select, field);
        listView.renderItm(item);

        elements.clearShopping.classList.add('active');
    }
});

/**
 * Like controller
 * 
 */
// test
state.likes = new Likes();

const controlLike = () => {
    if(!state.likes) state.likes = new Likes();

    const currentID = state.recipe.id;

    // User has NOT yes liked current recipe
    if(!state.likes.isLiked(currentID)){
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        // Toggle the like button
        likesView.toggleLikeBtn(true);
 
        // Add like to UI list
        likesView.renderLike(newLike);

    // User HAS liked current recipe
    }else{

        // Remove like from the state
        state.likes.deleteLike(currentID);

        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like from UI list
        likesView.deleteLike(currentID);

    }

    likesView.toggleLikeMenu(state.likes.getNumLikes());
}


// INIT page loading (Restore, First appearance)
window.addEventListener('load', () => {
    state.likes = new Likes();

    // Restore likes
    state.likes.readStorage();

    // Toggle like menu btn
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));



});


/**
 * Trigger Search
 * 
 */

const controlSearchInput = () => {

};

// Handling recipe btn clicks
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-tiny__dec, .btn-tiny__dec *')){
        // Decreace btn is clicked
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }else if(e.target.matches('.btn-tiny__inc, .btn-tiny__inc *')){
        // Increase btn is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }else if(e.target.matches('.recipe__btn--addToShoppingList, .recipe__btn--addToShoppingList *')){
        // Add ingredients to list shopping
        controlList();
    }else if(e.target.matches('.recipe__love, .recipe__love *')){
        // Like controller
        controlLike();
    }else if(e.target.matches('.results__link, .results__link *')){
        e.preventDefault();
        const query = e.target.closest('.results__link').dataset.inputsearch;
        
        controlSearch(query);
    }
    
});


