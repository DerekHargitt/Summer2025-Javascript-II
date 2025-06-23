
  // Simplified and made more readable
  const addItemsBtn = document.querySelector('.add-items');
  const itemsList = document.querySelector('.plates');
  let items = JSON.parse(localStorage.getItem('items')) || [];
  const clearItemsBtn = document.querySelector('.clear-items');

  function addItem(e) {
    e.preventDefault();
    const text = this.querySelector('[name=item]').value.trim(); //Trim whitespace
    if (!text) return; //Prevent empty string additions

    const item = {
      text,
      done: false
    };

    items.push(item);
    updateList();
    this.reset();
  }

  function updateList() {
    localStorage.setItem('items', JSON.stringify(items)); //Centralized update logic
    populateList(items, itemsList);
  }

  function populateList(plates = [], platesList) {
    if (plates.length === 0) {
      platesList.innerHTML = '<li>No tapas added yet!</li>'; //Better empty state
      return;
    }
    platesList.innerHTML = plates.map((plate, i) => `
      <li>
        <input type="checkbox" data-index="${i}" id="item${i}" ${plate.done ? 'checked' : ''} />
        <label for="item${i}">${plate.text}</label>
      </li>
    `).join('');
  }

  function toggleDone(e) {
    if (!e.target.matches('input[type="checkbox"]')) return; //Narrowed selector
    const index = e.target.dataset.index;
    items[index].done = !items[index].done;
    updateList();
  }

  function clearItems() {
    localStorage.removeItem('items');//Clear items from localStorage
    items.length = 0; //Clear the in-memory array
    populateList(items, itemsList); //Refresh the displayed list
  }

  addItemsBtn.addEventListener('submit', addItem);
  itemsList.addEventListener('click', toggleDone);
  clearItemsBtn.addEventListener('click', clearItems); //Added clear button to remove items

  populateList(items, itemsList); //Initial load