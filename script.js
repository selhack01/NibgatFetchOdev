document.addEventListener('DOMContentLoaded',()=>{

  fetch('https://fakestoreapi.com/products')
  .then((response) => response.json())
  .then(data => {
    createCards(data);
  });
  
});

function createCards(data) {
  var container = document.getElementById('productContainer');

  // var rand = Math.random()*20; 
  // if(rand<=8){
  //    products = data.slice(rand,rand+8);
  // }
  // else {
  //    products = data.slice(rand-8,rand);
  // }
  
  var products = data.slice(0,20);

  for (let i = 0; i < products.length; i++) {
    
    if(i % 4 == 0){
      var field = document.createElement('div')
      field.classList.add('field');

      container.appendChild(field);
    }

    var card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <img src="${products[i].image}" " />
        <span class="name">${products[i].title}</span>
        <span class="price">$${products[i].price}</span>
        <button class="details-button" data-id="${products[i].id}">details</button>
      `;

    card.querySelector('.details-button').addEventListener('click', function() {
      const productId = this.dataset.id;
      showModal(productId, data);
    });
  
    field.appendChild(card);
  }

};

function showModal(productId, data){

  var product = data.find( p => p.id == productId);
  var modal = document.getElementById('modal'); 
  var closeButton = modal.querySelector('button');

  modal.classList.add('show');

  closeButton.addEventListener('click' , () => {
    modal.classList.remove('show');
  });

  var name = modal.querySelector('span');
  name.innerText = product.title;

  var img = modal.querySelector('img');
  img.src = product.image;

  var modalPrice = modal.querySelector('.modalPrice'); 
  modalPrice.innerText = `Price: $${product.price}`;

  var modalCategory = modal.querySelector('.modalCategory');
  modalCategory.innerText = `Category: ${product.category}`;

  var modalTextarea = modal.querySelector('textarea');
  modalTextarea.value = product.description; 

}
