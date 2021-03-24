// See the first spice blend (the spice blend with an ID of 1), including its title, image, and list of ingredients, when the page loads

const url = 'http://localhost:3000/spiceblends'
const spiceBlendDetail = document.querySelector('div#spice-blend-detail')
const detailImg = spiceBlendDetail.children[0]
const title = spiceBlendDetail.children[1]
const ingredientsContainer = spiceBlendDetail.children[2]

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
    title.textContent = spiceObj.title

    spiceObj.ingredients.forEach(ingredient => {
        const li = document.createElement('li')
        li.dataset.id = ingredient.id
        li.textContent = ingredient.name
        ingredientsContainer.append(li)

    })

}