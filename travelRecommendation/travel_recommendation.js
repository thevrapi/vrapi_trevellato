const search_results = document.querySelector('.search_results');
const input = document.getElementById('search_input');
const searchBtn = document.getElementById('search')
const resetBtn = document.getElementById('reset')
let searchQuery = null;

async function findRes (value){

    return fetch('./travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Some error happened with the request.');
        }
        return response.json();
    })
    .then(data => {
        if(data){
            let category = Object.keys(data).find(key => key.includes(value))
            return data[category]
        }else{
            return null;
        }
    })
    .catch(error => console.error('There was a problem with the fetch operation:', error));
}

function updateDom(result){
    let cards = []
    let content = ''
    result.forEach(element => {
        if(element.cities){
            element.cities.forEach(city => {
                cards.push(city)
            })
        }
        else{
            cards.push(element)
        }
    });

    cards.forEach(card => {
        content += `
        <article class="search_card">
            <img src="./assets/sidney.jpg" alt="">
            <div>
                <h3>${card.name}</h3>
                <p>${card.description}</p>
                <button>Visit</button>
            </div>
        </article>
        `
    })

    search_results.style.display = 'flex'
    search_results.innerHTML = content
}
  
  input.addEventListener('input', (event) => {
    searchQuery = event.target.value?.toLowerCase()
  })

  searchBtn.addEventListener('click', async () => {
    console.log('searching');
      if(searchQuery){
          let result = await findRes(searchQuery)
          if(result){
              updateDom(result)
          }
          else{
                search_results.style.display = 'flex'
                search_results.innerHTML = 'No Results'
          }
      }
      else{
          search_results.innerHTML = ''
          search_results.style.display = 'none'
      }
  })

  resetBtn.addEventListener("click", () => {
    search_results.innerHTML = ''
    search_results.style.display = 'none'
    input.value = ''
  })
  

