"use strict";


let allMeals = [];
let idCategory = ""
let password = ""
let nameValidat = false
let emailValidat = false
let phoneValidat = false
let ageValidat = false
let passwordValidat = false
let repasswordValidat = false


$(".open-icon").click(function () {
    let navContainerWidth = $("#nav-container").innerWidth();
    if ($("#nav").css("left") == "0px") {

        $("#nav").animate({ left: `${navContainerWidth}` }, 300)
            $(".nav-links").animate({top: 0}, 300)
        $(".open-icon").removeClass("fa-align-justify");
        $(".open-icon").addClass("fa-x");

    }
    else {
        $("#nav").animate({ left: "0px" }, 300 )
        $(".open-icon").removeClass("fa-x");
        $(".open-icon").addClass("fa-align-justify");
        $(".nav-links").animate({top: "200px"}, 300)

       
    }
})

$(".nav-links a").click(function(){
    $("#nav").animate({ left: "0px" }, 300)
    $(".open-icon").removeClass("fa-x");
    $(".open-icon").addClass("fa-align-justify");
    $(".nav-links").animate({top: "200px"}, 300)

})

// sideBar


// loading
$("document").ready(function () {
    $(".loading").fadeOut(500)
    $("body").css("overflow", "auto");

})



// search
$("#search").click(function () {
    cat()
    $(".search").removeClass("d-none");
    $(".searchBars").removeClass("d-none")
    $(".cateogories").addClass("d-none");
    $("#meal-Details").addClass("d-none");
    $("#areaMealsContainer").addClass("d-none");
    $(".area").addClass("d-none");
    $(".ingrediants").addClass("d-none");
    $("#ingrediantsContainer").addClass("d-none");
    $(".area").addClass("d-none");
    $("#areaMealsContainer").addClass("d-none");
    $(".contact").addClass("d-none");

})
searchByName("");
async function searchByName(name) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let meals = await api.json()
    allMeals.splice(0, allMeals.length);
    allMeals.push(...(meals.meals))
    allMeals=allMeals.slice(0,20)

    displayByNameSearch()
}
function displayByNameSearch() {
    let cartona = ``;
    for (let i = 0; i < allMeals.length; i++) {
        cartona += `<div class=" col-md-3  Category my-3 p-0" id="mealSearch  rounded">
        <div class=" mx-3 p-0 position-relative rounded overflow-hidden">
         <img src="${allMeals[i].strMealThumb}" class="   w-100 rounded overflow-hidden p-0" alt="">
        <div class="meals-layOut position-absolute d-flex justify-content-center align-items-center w-100 p-3" data-id="${allMeals[i].idMeal}" id="meals">
            <h2>${allMeals[i].strMeal}</h2>
        </div>  </div> 
        </div> `
    }

    $(".searchMeals").html(cartona);

    $(".meals-layOut").click(function (event) {
        let mealID = $(event.target).attr("data-id")
        getMealDetails(mealID)
    })
}

async function searchByFLetter(letter) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let meals = await api.json()
    allMeals.splice(0, allMeals.length);
    allMeals.push(...(meals.meals))
    allMeals=allMeals.slice(0,20)


    displayByNameSearch()
}

// cateogery

$("#cateogories").click(function () {
    cat()
    $(".cateogories").removeClass("d-none");
    $(".search").addClass("d-none");
    $(".searchBars").addClass("d-none")
    $("#meal-Details").addClass("d-none");
    $("#areaMealsContainer").addClass("d-none");
    $(".area").addClass("d-none");
    $(".ingrediants").addClass("d-none");
    $("#ingrediantsContainer").addClass("d-none");
    $(".area").addClass("d-none");
    $("#areaMealsContainer").addClass("d-none");
    $(".contact").addClass("d-none");

})

async function cat() {
    let api = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    let meals = await api.json()
    allMeals.splice(0, allMeals.length);
    allMeals.push(...meals.categories)
    allMeals=allMeals.slice(0,20)



    displayCateogeries()
}



function displayCateogeries() {
    let cartona = ``;
    for (let i = 0; i < allMeals.length; i++) {
        var CategoryCode = allMeals[i].strCategory
        cartona += ` <div class=" col-md-3  m-4 p-0 overflow-hidden Category" >
        <img src="${allMeals[i].strCategoryThumb}" class=" position-relative p-0 w-100 rounded-1 overflow-hidden" alt="">
        <div class="details-layOut position-absolute d-flex justify-content-center align-items-center" data-cat="${allMeals[i].strCategory}">
            <h2>${allMeals[i].strCategory}</h2>
        </div>

    </div>`
    }

    $("#category-details").html(cartona);



    $(".Category").click(function (event) {
        CategoryCode = event.target.getAttribute("data-cat")
        getCateogoryDetails(CategoryCode)
    })
}


// meals by cateogory
async function getCateogoryDetails(CategoryCode) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${CategoryCode}`)
    let meals = await api.json()
    allMeals.splice(0, allMeals.length);
    allMeals.push(...(meals.meals))
    allMeals=allMeals.slice(0,20)
    displayCateogoryDetails()
}

function displayCateogoryDetails() {
   let cartona = ``;
    allMeals = allMeals.slice(0, 20);
    for (let i = 0; i < allMeals.length; i++) {
        cartona += ` <div class=" col-md-3 overflow-hidden Category mb-4" id="cateogoryMeals roundded">
        <div class=" position-relative overflow-hidden roundded"> <img src="${allMeals[i].strMealThumb}" class="  w-100 rounded overflow-hidden" alt="">
       <div class="meals-layOut rounded position-absolute d-flex justify-content-center align-items-center w-100" data-id="${allMeals[i].idMeal}" id="meals">
           <h2>${allMeals[i].strMeal}</h2>
       </div>  </div> 
       </div> `  }


    $("#category-details").html(cartona);

    $(".meals-layOut").click(function (event) {
        let mealID = $(event.target).attr("data-id")
        document.getElementById("category-details").classList.add("d-none")
        document.getElementById("meal-Details").classList.remove("d-none")
        getMealDetails(mealID)
    })


}
// meal and its details
async function getMealDetails(mealID) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    let meals = await api.json()
    allMeals.splice(0, allMeals.length);
    allMeals.push(...meals.meals)
    allMeals=allMeals.slice(0,20)
    displayMealDetails(allMeals)

}
function displayMealDetails(allMeals) {
    $("#meal-Details").removeClass("d-none");
    $(".search").addClass("d-none");
    $(".searchBars").addClass("d-none")
    $(".cateogories").addClass("d-none");
    $("#areaMealsContainer").addClass("d-none");
    $(".area").addClass("d-none");
    $(".ingrediants").addClass("d-none");
    $("#ingrediantsContainer").addClass("d-none");
    $(".area").addClass("d-none");
    $("#areaMealsContainer").addClass("d-none");
    $(".contact").addClass("d-none");



$("#mealName").html(`${allMeals[0].strMeal}`)
    $("#mealImage").attr("src", `${allMeals[0].strMealThumb}`)
    $(".meal-desc").html(`${allMeals[0].strInstructions}`)
    $("#mealArea").html(`${allMeals[0].strArea}`)
    $("#mealCategory").html(`${allMeals[0].strCategory}`)
    let count = 1;
    let ingredients = [];
    for (let i in allMeals[0]) {
        let ingredient = "";
        let measure = "";
        if (i.startsWith("strIngredient") && allMeals[0][i]) {
            ingredient = allMeals[0][i];
            measure = allMeals[0][`strMeasure` + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
        }
    }

  let  cartona = ``;
    for (let i = 0; i < ingredients.length; i++) {
        cartona += `<span class="alert alert-info my-3 mx-1 p-1 green rounded w-auto fs-2">${ingredients[i]}</span>`
    }
    $("#recipes").html(cartona);
    var tags = allMeals[0].strTags;
    if (tags !== null) {
        var tagsArr = tags.split(",");
        let tag = "";
        for (var i = 0; i < tagsArr.length; i++) {
            tag += `<li class="my-3 mx-1 p-1 bg-pink rounded w-auto">${tagsArr[i]}</li>`;
        }
        $("#tags").html(tag);
    } else {
        $("#tags").css("display", "none");
    }
    $("#sourceAnchor").attr("href", `${allMeals[0].strSource}`)
    $("#youtubeAnchor").attr("href", `${allMeals[0].strYoutube}`)

}


// by area
$("#area").click(function () {
    // cat()

    $(".cateogories").addClass("d-none");
    $(".search").addClass("d-none");
    $(".searchBars").addClass("d-none")
    $("#meal-Details").addClass("d-none");
    $(".ingrediants").addClass("d-none");
    $("#ingrediantsContainer").addClass("d-none");
    $(".area").removeClass("d-none");
    $("#areaMealsContainer").addClass("d-none");
    $(".contact").addClass("d-none");

    getAreas()

})

async function getAreas() {

    let api = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    let meals = await api.json()
    allMeals.splice(0, allMeals.length);
    allMeals.push(meals)
    let countries = allMeals[0].meals
    countries=countries.slice(0,20)

    displayByArea(countries)
}
function displayByArea(countries) {

    let cartona = ``;
    for (let i = 0; i < countries.length; i++) {
        cartona += `   <div class="col-md-3 my-3 country" data-area="${countries[i].strArea}" onclick="getMealsByArea('${countries[i].strArea}')">
        <div class="rounded-2 text-center cursor-pointer" id"countryCard">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${countries[i].strArea}</h3>
    </div> 
    </div>`
    }

    $(".areas").html(cartona);

}
async function getMealsByArea(country) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
    let meals = await api.json()
    allMeals.splice(0, allMeals.length);
    allMeals.push(meals)   
      let areaMeals = allMeals[0].meals
      areaMeals=areaMeals.slice(0,20)
    displayMealsByArea(areaMeals)
    $(".search").addClass("d-none");
    $(".cateogories").addClass("d-none");
    $("#meal-Details").addClass("d-none");
    $("#areaMealsContainer").removeClass("d-none");
    $(".area").addClass("d-none");
};
function displayMealsByArea(areaMeals) {
   let cartona = ``;
    allMeals = allMeals.slice(0, 20);
    for (let i = 0; i < areaMeals.length; i++) {
        cartona += ` <div class=" col-md-3 overflow-hidden Category mb-4" id="cateogoryMeals">
        <div class=" position-relative overflow-hidden rounded"> <img src="${areaMeals[i].strMealThumb}" class="  w-100 rounded " alt="">
       <div class="meals-layOut rounded position-absolute d-flex justify-content-center align-items-center w-100"  id="meals" data-id="${areaMeals[i].idMeal}">
           <h2>${areaMeals[i].strMeal}</h2>
       </div>  </div> 
       </div> `  }


    $("#areaMeals").html(cartona);
    $(".meals-layOut").click(function (event) {
        let mealID = $(event.target).attr("data-id")
        getMealDetails(mealID)
    })

}


// by Ingrediants
$("#ingrediants").click(function () {
    $(".cateogories").addClass("d-none");
    $(".search").addClass("d-none");
    $(".searchBars").addClass("d-none")
    $("#meal-Details").addClass("d-none");
    $(".ingrediants").removeClass("d-none");
    $("#ingrediantsContainer").addClass("d-none");
    $(".area").addClass("d-none");
    $("#areaMealsContainer").addClass("d-none");
    $(".contact").addClass("d-none");


    getIngrediants()

})

async function getIngrediants() {
    let api = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    let meals = await api.json()
    allMeals.splice(0, allMeals.length);
    allMeals.push(meals)
    let ingrediants = allMeals[0].meals.slice(0, 20)

    displayByIngrediants(ingrediants)
}
function displayByIngrediants(ingrediants) {
    let cartona = ``;
    for (let i = 0; i < ingrediants.length; i++) {
        cartona += ` <div class="col-md-3">
        <div onclick="getIngredientsMeals('${ingrediants[i].strIngredient}')" class="rounded text-center cursor-pointer">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
           <h3>${ingrediants[i].strIngredient}</h3>
           <p>${ingrediants[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
           </div>
       </div>`
    }

    $(".components").html(cartona);

}
async function getIngredientsMeals(component) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${component}`)
    let meals = await api.json()
    allMeals.splice(0, allMeals.length);
    allMeals.push(meals)
    let ingredientsMeals = allMeals[0].meals
    displayMealsByIngredients(ingredientsMeals)

    $(".cateogories").addClass("d-none");
    $(".search").addClass("d-none");
    $(".searchBars").addClass("d-none")
    $("#meal-Details").addClass("d-none");
    $(".ingrediants").addClass("d-none");
    $("#ingrediantsContainer").removeClass("d-none");
    $(".area").addClass("d-none");
    $("#areaMealsContainer").addClass("d-none");
};
function displayMealsByIngredients(ingredientsMeals) {
   let cartona = ``;
    ingredientsMeals = ingredientsMeals.slice(0, 20);
    for (let i = 0; i < ingredientsMeals.length; i++) {
        cartona += ` <div class=" col-md-3 overflow-hidden Category mb-4" id="cateogoryMeals">
        <div class="position-relative rounded overflow-hidden"> <img src="${ingredientsMeals[i].strMealThumb}" class="  w-100 rounded-1 overflow-hidden" alt="">
       <div class="meals-layOut rounded position-absolute d-flex justify-content-center align-items-center w-100"  id="meals" data-id="${ingredientsMeals[i].idMeal}">
           <h2>${ingredientsMeals[i].strMeal}</h2>
       </div>  </div> 
       </div> `  }


    $("#ingrediansmealsContainer").html(cartona);
    $(".meals-layOut").click(function (event) {
        let mealID = $(event.target).attr("data-id")
        getMealDetails(mealID)
    })


}

// CONTACT 
$("#contact").click(function () {
    $(".cateogories").addClass("d-none");
    $(".search").addClass("d-none");
    $(".searchBars").addClass("d-none")
    $("#meal-Details").addClass("d-none");
    $(".ingrediants").addClass("d-none");
    $("#ingrediantsContainer").addClass("d-none");
    $(".area").addClass("d-none");
    $("#areaMealsContainer").addClass("d-none");
    $(".contact").removeClass("d-none");
    checkInputs()
})
function checkInputs() {

    $("#nameInput").keyup(function () {
        let name = document.getElementById("nameInput").value
        let nameRegex = /^[A-Za-z]{3,8}$/gim
        if (nameRegex.test(name) == true) {
            $("#nameAlert").addClass("d-none");
            nameValidat = true;
        } else {
            $("#nameAlert").removeClass("d-none");
            nameValidat = false;

        }
        button()
    })

    $("#emailInput").keyup(function () {
        let email = document.getElementById("emailInput").value
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gim;

        if (emailRegex.test(email) == true) {
            $("#emailAlert").addClass("d-none");
            emailValidat = true;
        } else {
            $("#emailAlert").removeClass("d-none");
            emailValidat = false;
        }button()
    })

    $("#phoneInput").keyup(function () {
        let phone = document.getElementById("phoneInput").value
        let phoneRegex = /^01[0125][0-9]{8}$/gim;

        if (phoneRegex.test(phone) == true) {
            $("#phoneAlert").addClass("d-none");
            phoneValidat = true;
        } else {
            $("#phoneAlert").removeClass("d-none");
            phoneValidat = false;
        }button()
    })
    $("#ageInput").keyup(function () {
        let age = document.getElementById("ageInput").value
        let ageRegex = /^(0?[1-9]|[1-9][0-9])$/gm

        if (ageRegex.test(age) == true) {
            $("#ageAlert").addClass("d-none");
            ageValidat = true;
        } else {
            $("#ageAlert").removeClass("d-none");
            ageValidat = false;
        }button()
    })


    $("#passwordInput").keyup(function () {
        password = document.getElementById("passwordInput").value
        let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm
        if (passwordRegex.test(password) == true) {
            $("#passwordAlert").addClass("d-none");
            passwordValidat = true;
        } else {
            $("#passwordAlert").removeClass("d-none");
            passwordValidat = false;
        }button()

    })

    $("#repasswordInput").keyup(function () {
        let repassword = document.getElementById("repasswordInput").value
        let repasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm

        if (repasswordRegex.test(repassword) == true && repassword == password) {
            $("#repasswordAlert").addClass("d-none");
            repasswordValidat = true;
        } else {
            $("#repasswordAlert").removeClass("d-none");
            repasswordValidat = false;
        }button()
    })
    function button(){
        if (nameValidat == true && emailValidat == true &&phoneValidat == true &&ageValidat == true
             &&passwordValidat == true &&repasswordValidat == true ){
    $("#submitBtn").removeClass("btn-outline-danger").addClass("btn-danger").prop("disabled",false)

        }
    }


}








