import {elements} from './base';
import { Fraction } from 'fractional';
export const clearRecipe = () => {
    elements.recipe.innerHTML = '';   
};

const formatCount = count => {
    if(count) {

        const newCount = Math.round(count * 10000) / 10000;
        const [int, dec] = newCount.toString().split('.').map(el => parseInt(el, 10));

        if (!dec) return newCount;

        if (int === 0) {
            const fr = new Fraction(newCount);
            return `${fr.numerator}/${fr.denominator}`;
        }else{
            const fr = new Fraction(newCount - int);

            return `${int} ${fr.numerator}/${fr.denominator}`;
        }

    }

    return '?';
};

const createIngredient = ingredient => `
<li class="recipe__item">
    <svg class="recipe__icon">
        <use href="img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__count">${formatCount(ingredient.count)}</div>
    <div class="recipe__ingredient">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.ingredient}
    </div>
</li>

`;
 
export const renderRecipe = (recipe, isLiked) => {
    const markup = `
            <figure class="recipe__fig">
                <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-tiny__dec">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-tiny__inc">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                    </svg>
                </button>
            </div>



            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                    ${recipe.ingredients.map(el => createIngredient(el)).join('')}
                
                </ul>

                <button class="btn-small recipe__btn recipe__btn--addToShoppingList">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
    `;

    elements.recipe.insertAdjacentHTML('afterbegin', markup);
};


export const renderInitRecipe = () => {
    const markup = `
            <figure class="recipe__fig">
                <img src="img/presentation.jpg" alt="" class="recipe__img">
                <h1 class="recipe__title">
                    <span>Ready to Cook ?<br>Search here your<br>new recipe !!!</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                </div>
            </div>
            <div class="recipe__ingredients">
                <h2 class="heading-2">The most searched recipes</h2>
                <ul class="recipe__ingredient-list">
                    <li>
                        <a class="results__link results__link" href="#" data-inputsearch="pizza">
                            <figure class="results__fig">
                                <img src="http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg" alt="Test">
                            </figure>
                            <div class="results__data">
                                <h4 class="results__name">Pizzas</h4>
                                <p class="results__author">More than 28 recipes available</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a class="results__link results__link" href="#" data-inputsearch="pasta">
                            <figure class="results__fig">
                                <img src="http://forkify-api.herokuapp.com/images/pestoa0e7.jpg" alt="Test">
                            </figure>
                            <div class="results__data">
                                <h4 class="results__name">Pastas</h4>
                                <p class="results__author">More than 20 recipes available</p>
                            </div>
                        </a>    
                    </li>
                    <li>
                        <a class="results__link results__link" href="#" data-inputsearch="salad">
                            <figure class="results__fig">
                                <img src="http://forkify-api.herokuapp.com/images/SpringQuinoaSalad3ba71.jpg" alt="Test">
                            </figure>
                            <div class="results__data">
                                <h4 class="results__name">Salad</h4>
                                <p class="results__author">More than 20 recipes available</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a class="results__link results__link" href="#" data-inputsearch="beef">
                            <figure class="results__fig">
                                <img src="http://forkify-api.herokuapp.com/images/pattymelt7fb3.jpg" alt="Test">
                            </figure>
                            <div class="results__data">
                                <h4 class="results__name">Beef</h4>
                                <p class="results__author">More than 20 recipes available</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a class="results__link results__link" href="#" data-inputsearch="fish">
                            <figure class="results__fig">
                                <img src="http://forkify-api.herokuapp.com/images/cevichea300x20059956a49.jpg" alt="Test">
                            </figure>
                            <div class="results__data">
                                <h4 class="results__name">Fish</h4>
                                <p class="results__author">More than 20 recipes available</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a class="results__link results__link" href="#" data-inputsearch="chicken">
                            <figure class="results__fig">
                                <img src="http://forkify-api.herokuapp.com/images/Bacon2BWrapped2BJalapeno2BPopper2BStuffed2BChicken2B5002B5909939b0e65.jpg" alt="Test">
                            </figure>
                            <div class="results__data">
                                <h4 class="results__name">Chicken</h4>
                                <p class="results__author">More than 20 recipes available</p>
                            </div>
                        </a>
                    </li>               
                </ul>
            </div>
    `;

    elements.recipe.insertAdjacentHTML('afterbegin', markup);
};

export const updateServingsIngredients = recipe => {
    // Update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings; 

    // Update ingredients
    const countEl = Array.from(document.querySelectorAll('.recipe__count'));

    countEl.forEach((el, i) => {
        el.textContent = formatCount(recipe.ingredients[i].count);
    });
};