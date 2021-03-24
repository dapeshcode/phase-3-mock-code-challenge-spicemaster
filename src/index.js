

const url = 'http://localhost:3000/spiceblends'
const spiceBlendDetail = document.querySelector('div#spice-blend-detail')
const detailImg = spiceBlendDetail.children[0]
const blendTitle = spiceBlendDetail.children[1]
const ingredientsContainer = spiceBlendDetail.children[2]
const newTitleForm = document.querySelector('form#update-form')
const addIngredientForm = document.querySelector('form#ingredient-form')

/*************************** deliverable 1*****************************/

document.addEventListener('DOMContentLoaded', () => {
    fetchSpiceOne()
})

function fetchSpiceOne () {
    fetch(`${url}/1`)
    .then(res => res.json())
    .then(spiceOne => renderOneSpiceBlend(spiceOne))
}

function renderOneSpiceBlend (spiceObj) {
    detailImg.src = spiceObj.image
    detailImg.dataset.id = spiceObj.id
    blendTitle.textContent = spiceObj.title

    spiceObj.ingredients.forEach(ingredient => {

        renderOneIngredient(ingredient)
    })
}

function renderOneIngredient ({name, id}) {
    
        const li = document.createElement('li')
        li.dataset.id = id
        li.textContent = name
        ingredientsContainer.append(li)
}

/******************************** event listeners ********************************/

newTitleForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const id = detailImg.dataset.id
    const title = e.target[0].value
    
    fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({title})
    })
    .then(res => res.json())
    .then(({title}) => {
        blendTitle.textContent = title
    })


})

addIngredientForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const name = e.target[0].value
    const li = document.createElement('li')
    li.textContent = name
    ingredientsContainer.append(li)

    const newIngredient = {
        name,
        spiceblendId: detailImg.dataset.id
    }

    fetch('http://localhost:3000/ingredients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newIngredient)
    })


})


/*************************** advanced ********************************/

const spiceImages = document.querySelector('div#spice-images')

fetch(url)
.then(res => res.json())
.then(allBlends => renderAllBlendImgs(allBlends))

function renderOneBlendImg ({image, id}) {
    const img = document.createElement('img')
    img.dataset.id = id
    img.src = image
    spiceImages.append(img)
}

function renderAllBlendImgs (allBlends) {
    allBlends.forEach(blend => {
        renderOneBlendImg(blend)
    })
}

spiceImages.addEventListener('click', (e) => {
    if(e.target.matches('img')) {
        fetch(`${url}/${e.target.dataset.id}`)
        .then(res => res.json())
        .then(blendObj => renderOneSpiceBlend(blendObj))
        
    }
})


