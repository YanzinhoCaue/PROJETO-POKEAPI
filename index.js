var quantidade = document.getElementById('quantidade');
quantidade.addEventListener('click', () => {
  pegaPokemons(quantidade.value);
})
pegaPokemons(2)
function pegaPokemons(quantidade) {
  fetch('http://pokeapi.co/api/v2/pokemon?limit='+quantidade)
  .then(response => response.json())
  .then(allpokemon => {
    var pokemons = [];
    allpokemon.results.map((val) => {
      
      fetch(val.url)
      .then(response => response.json())
      .then(pokemonSingle => {
        pokemons.push({nome:val.name, imagem:pokemonSingle.sprites.front_default});

        if(pokemons.length == quantidade){
          var pokemonBoxes = document.querySelector('.pokemon-boxes')
          pokemonBoxes.innerHTML = "";
          pokemons.map(function(val){
            pokemonBoxes.innerHTML+=`
            <div class="pokemon-box">
              <img src="`+val.imagem+`" alt=""/>
              <p>`+val.nome+`</p>
            </div>`;
          })
        }
      })
    })
  })
}