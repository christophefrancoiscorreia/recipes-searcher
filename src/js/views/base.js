export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResult: document.querySelector('.results'),
    searchResultList: document.querySelector('.results__list'),
    searchResultPages: document.querySelector('.results__pages'),    
    recipe: document.querySelector('.recipe'),    
    shopping: document.querySelector('.shopping__list'),    
    addToShopping: document.querySelector('.addToList'),    
    addToShoppingSelect: document.querySelector('.addToList__select'),    
    addToShoppingField: document.querySelector('.addToList__field'),    
    addToShoppingBtn: document.querySelector('.addToList__btn'),    
    clearShopping: document.querySelector('.clearList'),    
    clearShoppingBtn: document.querySelector('.clearList__btn'),    
    likesMenu: document.querySelector('.likes__field'),    
    likesList: document.querySelector('.likes__list'),    
};

export const elStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elStrings.loader}">
            <svg> 
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;


    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
} 