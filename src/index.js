console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
getImages()
getAllBreeds()


let dogBreedList = []

// Get Elements from Dom aka querySelector
let imageContainer = document.querySelector("#dog-image-container")
let breedUl = document.querySelector("#dog-breeds")
let breedDropdown = document.querySelector("#breed-dropdown")

// add Event Listeners
breedUl.addEventListener('click', changeColor)
breedDropdown.addEventListener("change", sortBreeds)

function changeColor(e) {
  if (e.target.nodeName === "LI"){
    e.target.style.color = "pink"
  }
}

// Fetch/Network requests
function getImages(){
  fetch(imgUrl)
  .then(res => res.json())
  .then(addImagesToDom)
  // .then
}

function getAllBreeds(){
  fetch(breedUrl)
  .then(res => res.json())
  .then(addBreedsToDom)
}



// JS Logis && adding elements to DOM

function sortBreeds(e){
  let letter = e.target.value

  let filteredList = dogBreedList.filter(breed => breed[0] === letter)
  breedUl.innerHTML = ""

  filteredList.forEach(breed => createLi(breed))
}

function addImagesToDom(imageData){
  // access array of images
  let imageArray = imageData.message
  // iterate through array of images
  imageArray.forEach(image => {
    // create img tag for each image 
    let img = document.createElement("img")
    img.src = image
    img.alt = "Dog"
    // put image on dom aka render
    imageContainer.append(img)

  })
}

function addBreedsToDom(breedObj){
  console.log(breedObj);
  dogBreedList = Object.keys(breedObj.message)

  dogBreedList.forEach(breed => {
    createLi(breed)

    if (breedObj.message[breed].length > 0)
      breedObj.message[breed].forEach(subBreed => {
        createLi(subBreed)
      })
  })
}


function createLi(breedString){
  let li = document.createElement('li')
  li.textContent = breedString
  
  
  let btn = document.createElement('button')
 btn.textContent = "X"
  // li.addEventListener('click', changeColor)

  li.append(btn)
  breedUl.append(li)
}

// function changeColor(e) {
//   console.log(e);
//   e.target.previousSibling.style.color = "pink"
// }