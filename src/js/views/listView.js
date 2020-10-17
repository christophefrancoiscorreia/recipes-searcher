import {elements} from './base';

export const renderItem = item => {
    const markup = `
    <li class="shopping__item" data-itemid="${item.id}">
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use> 
            </svg>
        </button>
    </li>
    `;

    elements.shopping.insertAdjacentHTML('beforeend', markup);
}

export const toggleClearListBtn = numlikes => {
    const el = elements.clearShopping;
    numlikes > 0 ? el.classList.add('active') : el.classList.remove('active');
};

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);

    if(item) item.parentElement.removeChild(item);
}

export const deleteAllItems = () => { 
    const countEl = Array.from(document.querySelectorAll('.shopping__item'));
    countEl.forEach((el, i) => {
        el.parentElement.removeChild(el);
    });
}