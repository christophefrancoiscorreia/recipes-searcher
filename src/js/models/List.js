import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem (count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }

        this.items.push(item);

        
        // Persist data in localStorage
        this.persistData();

        return item;
        
    }

    deleteItem (id) {
        const index = this.items.findIndex(el => el.id === id);
        // [2,4,8] splice(1, 2) ==> returns [4,8], original array is [2]
        // [2,4,8] slice(1, 2) ==> returns 4, original array [2,4,8]
        this.items.splice(index, 1);
        
        // Persist data in localStorage
        this.persistData();
    }

    deleteAllItems () {
        this.items = []; 
        localStorage.setItem('shoping', JSON.stringify([]));        
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }

    isAdded(id) {
        return this.items.findIndex(el => el.id === id) !== -1;
    }

    getNumItems() {
        return this.items.length;
    }

    persistData() {
        localStorage.setItem('shoping', JSON.stringify(this.items));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('shoping'));

        // Restoring likes from localStorage
        if(storage) this.items = storage;
    }
} 