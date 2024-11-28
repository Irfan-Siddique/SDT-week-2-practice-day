const loadProductByName = (name) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((res) => res.json())
    .then((data) => {
      displayMatchedProducts(data.meals);
    }); 
};

const displayMatchedProducts = (products) => {
  const mealsContainer = document.getElementById("meals-container");
  if (products == null) {
    const div = document.createElement("div");
    div.innerHTML = `
    <h1 class="text-danger">MEAL NOT FOUND</h1>
    `;
    mealsContainer.appendChild(div);
  } else {
    products.forEach((product) => {
      //   console.log(product.strMeal);
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
    <img class="card-img" src="${product.strMealThumb}" onclick="singleMeal(${product.idMeal})">
    <h3 class=" mt-3 text-danger text-center">${product.strMeal}</h3>
    `;
      mealsContainer.appendChild(div);
    });
      
  }
};

const handleSearch = () => {
  let inputValue = document.getElementById("search-id").value;
  // console.log(inputValue)
  document.getElementById("meals-container").innerHTML = "";
  document.getElementById("single-meal").innerHTML=""
  loadProductByName(inputValue);
  document.getElementById("search-id").value=""
};

const singleMeal = (id) => {
  console.log(id);
    
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data.meals[0].strMeal)
        displaySingleMeal(data.meals[0])
    });
};

const displaySingleMeal=(product)=>{
    document.getElementById("meals-container").innerHTML=""
    const singleMeal = document.getElementById("single-meal");
      const div = document.createElement("div");
      div.innerHTML = `
      <img class="single-img" src="${product.strMealThumb}">
  <h4 class=" my-3">${product.strMeal}</h4>
  <h5>Indredients</h5>
  <ul>
    <li>${product.strIngredient1}</li>
    <li>${product.strIngredient2}</li>
    <li>${product.strIngredient3}</li>
    <li>${product.strIngredient4}</li>
    <li>${product.strIngredient5}</li>
    <li>${product.strIngredient6}</li>
    <li>${product.strIngredient7}</li>
    <li>${product.strIngredient8}</li>
    <li>${product.strIngredient9}</li>
    </ul>
  `;
  singleMeal.appendChild(div);
}
// loadProductByName("a");
