'use strict'

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome}</option>`
            }
        })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

populateUFs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    stateInput.value = event.target.options[event.target.selectedIndex].text

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true
    console.log(event.target.value)
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome} </option>`
            }
        })
    citySelect.disabled = false
}

//Itens de coleta
//Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

let selectedItems = [];
const collectedItems = document.querySelector("input[name=items]")
function handleSelectedItem(event) {
    const itemLi = event.target

    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    const alreadySelected = selectedItems.findIndex(item => item == itemId)

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferen = item != itemId
            return itemIsDifferen
        })
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }
    collectedItems.value = selectedItems
}

