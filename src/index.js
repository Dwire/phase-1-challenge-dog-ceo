console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

let breedArray = []

fetchImages()
fetchBreeds()

// Get initial/constant elements from the DOM (aka querySelector)
let imgDiv = document.querySelector("#dog-image-container")
let dogBreeds = document.querySelector("#dog-breeds")
let breedDropdown = document.querySelector("#breed-dropdown")


// Add event listeners to DOM Elements
breedDropdown.addEventListener("change", grabSelectedLetter)

function grabSelectedLetter(e){
  let letter = e.target.value
  let filteredBreeds = breedArray.filter(breed => breed[0] === letter)

  dogBreeds.innerHTML = ""

  filteredBreeds.forEach(breed => createLi(breed))
}

// Fetch/network requests to API's/Data
function fetchImages(){
  fetch(imgUrl)
  .then(res => res.json())
  .then(dogData => addToImagesDom(dogData))
}

function fetchBreeds(){
  fetch(breedUrl)
  .then(res => res.json())
  .then(breedData => addBreedsToDom(breedData))
}


// Manipulating Data && Adding Data back onto the DOM


function addToImagesDom(dogData){
  // Iterate through image array 
  dogData.message.forEach(dogUrl => {
    // for each image url make a dom element (img tag) 
    let imgTag = document.createElement('img')
    imgTag.src = dogUrl
    imgTag.alt = "dog"
    // => <img src="someURL" alt="dog">
    
    
    // Put image tag back on to the dom 
    imgDiv.append(imgTag)
  })
}


function addBreedsToDom(breedData){
  // for (const prop in breedData.message){
    //   console.log(prop)
    // }
    breedArray = Object.keys(breedData.message)
    
    breedArray.forEach(breed => {
      createLi(breed)
      
      if (breedData.message[breed].length > 0){
        breedData.message[breed].forEach(subBreed => {
          createLi(subBreed)
        })
      }
    })
    
  }

    <div>
      <h1>Hello</h1>
    </div>
  
  function createLi(breed){
  // create an li
  let li = document.createElement("li")
  // add some text
  li.textContent = breed
  // append to DOM
  li.addEventListener('click', changeColor)

  dogBreeds.append(li)

}


function changeColor(e){
  e.target.style.color = "red"
}
