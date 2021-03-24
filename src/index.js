

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
        const li = document.createElement('li')
        li.dataset.id = ingredient.id
        li.textContent = ingredient.name
        ingredientsContainer.append(li)

    })

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
    } )


})

addIngredientForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('clicked')
    console.log(e.target)

})


