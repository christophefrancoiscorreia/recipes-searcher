import {elements} from './base'; 

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResultPages.innerHTML = '';
}

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));

    resultsArr.forEach(el => {
        el.classList.remove('results__link--active'); 
    });
    
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active'); 
}


export const limitTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit) {
                newTitle.push(cur);
            }

            return acc + cur.length;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }

    return title;
}

const renderRecipe = recipe => {
    const markup = `
        <a class="results__link results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    `;
 

    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

const renderNoRecipe = recipe => {
    const markup = `
        <a class="results__link results__link" href="/">
            <div class="results__data">
                <h4 class="results__name">Please try again</h4>
                <p class="results__author">There is no recipes for this search !</p>
            </div>
        </a>
    `;
 

    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

// Type: prev || next
const createButton = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
</button>
`;

const renderButtons = (page, numResults, resultsPerPage) => {
    const pages = Math.ceil(numResults / resultsPerPage);
    let button;
        
    if(page === 1 && (pages > 1) ){
        button = createButton(page, 'next');
    }else if (page < pages) {
        button = `
            ${createButton(page, 'next')} 
            ${createButton(page, 'prev')}
        `;
    }else if (page === pages && pages > 1) {
        button = createButton(page, 'prev');
    }

    elements.searchResultPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resultPerPage = 10) => {
    // render results of current page

    if(recipes){
        const start = (page - 1) * resultPerPage;
        const end = page * resultPerPage;

        recipes.slice(start, end).forEach(renderRecipe);

        // reder pagination btns
        renderButtons(page, recipes.length, resultPerPage);
    }else{
        renderNoRecipe();
    }
};

