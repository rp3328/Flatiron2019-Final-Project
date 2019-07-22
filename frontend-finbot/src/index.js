const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let divTag = document.querySelector('main')


document.addEventListener('DOMContentLoaded', function(){
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => {
        trainers.forEach((trainer) => {
            divTag.innerHTML += `<div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
            <button class="add" data-trainer-id=${trainer.id}>Add Pokemon</button>
            <ul id="trainer_${trainer.id}">
                
            </ul>
          </div>`
        let ulTag = document.querySelector(`#trainer_${trainer.id}`)
        trainer.pokemons.forEach((pokemon) => {
            ulTag.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
        })
        })
    })

    document.addEventListener('click', function(e) {
        if(e.target.tagName === 'BUTTON' && e.target.className === 'release'){
            fetch(`${BASE_URL}/pokemons/${event.target.dataset.pokemonId}`, {
                method: "DELETE"
            })
            .then(data => {
                e.target.parentElement.remove()

            })
        }else if(e.target.tagName === 'BUTTON' && e.target.className === "add"){
            fetch(POKEMONS_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "trainer_id": e.target.dataset.trainerId
                })
            })
            .then(resp => resp.json())
            .then(pokemon => {
                let ulTag = document.querySelector(`#trainer_${e.target.dataset.trainerId}`)
                ulTag.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
            })
            
        }
    })
})