const foodInput = document.getElementById("searchInput");
const foodCategoryInput = document.getElementById("foodCategory");
const resultsDiv = document.getElementById("results");

async function fetchData() {
  try {
    const food = foodInput.value.toLowerCase().trim();

    const apiKey = "PKukaoIj0EkAALXfan9OXgKGpXNwcXKazqVKSoci";
    let apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${food}`;

    const response = await axios.get(apiUrl);
    const current = response.data.foods;
    console.log(current);
    if (current.length > 0) {
      displayResults(current);
    } else {
      resultsDiv.innerHTML = "<p>An error occurred. Please try again.</p>";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    resultsDiv.innerHTML = "<p>An error occurred. Please try again.</p>";
  }
}

//here only desplays title only sbow if its exactly equal to the input
//redo this function so it only takes input value of description z
function displayResults(foods) {
  foods.forEach((foodItem) => {
    const desc =
      foodItem.description.toLowerCase() || "Description not available";
    const brand = foodItem.brandOwner || "";
    const div = document.createElement("div");
    div.classList.add("result-item");
    div.innerHTML = `<p><strong></strong> ${desc}</p>
    <p><strong></strong> ${brand}</p>`;

    resultsDiv.appendChild(div);

    div.addEventListener("click", function () {
      divInfo(foodItem);
    });
  });
}

function divInfo(foodItem) {
  const carbs = foodItem.foodNutrients?.find(
    (fn) => fn.nutrientName === "Carbohydrate, by difference"
  );
  const protein = foodItem.foodNutrients?.find(
    (fn) => fn.nutrientName === "Protein"
  );
  const calories = foodItem.foodNutrients?.find(
    (fn) => fn.nutrientName === "Energy"
  );
  const sugars = foodItem.foodNutrients?.find(
    (fn) => fn.nutrientName === "Total Sugars"
  );
  const fiber = foodItem.foodNutrients?.find(
    (fn) => fn.nutrientName === "Fiber, total dietary"
  );

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const foodItemArray = [carbs, protein, calories, sugars, fiber];

  function saveItems() {
    let savedFoods = [];
    let savedf = [carbs, fiber];
    for (let i = 0; i < savedf.length; i++) {
      savedFoods.push(savedf[i]?.value || "N/A");
    }

    console.log("savedFoods", savedFoods);
  }

  const dispayArray = foodItemArray.map((info) => {
    return;
    `   <div class="modal-content">
      <p> ${info?.value || "N/A"}  </p>
      </div>
      `;
  });
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <p>Carbs: ${carbs.value || "N/A"}</p>
      <p>Protein: ${protein.value || "N/A"}</p>
      <p>Calories: ${calories.value || "N/A"}</p>
      <p>Sugars: ${sugars?.value || "N/A"}</p>
      <p>Fiber: ${fiber?.value || "N/A"}</p>
      <button style="border: 0px;" id="list">
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" class="bi bi-plus-square" viewBox="0 0 16 16">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
       </svg>
     </button>
    </div>
  `;

  document.body.appendChild(modal);
  modal.style.display = "block";

  modal.querySelector(".close").addEventListener("click", function () {
    modal.style.display = "none";
  });

  document.getElementById("list").addEventListener("click", saveItems);

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

foodInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    fetchData();

    if (resultsDiv.innerHtml !== "") {
      resultsDiv.innerHtml !== "";
    } else {
      fetchData();
    }
  }
});
