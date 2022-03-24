// function getCountries() {
//     fetch('https://restcountries.com/v3.1/all')
//         .then(response => response.json())
//         .then((data) => {
//             console.log(data)
//             let countryLayout = document.getElementById('countryLayout')
//             let html = "";
//             data.forEach(e =>{
//                 html += `
//                     <div class="col-md-3">
//                         <div class="card mb-3">
//                           <img src="${e.flags.png}" class="card-img-top" alt="...">
//                           <div class="card-body">
//                               <h5 class="card-title mx-3"> ${e.name.official}</h5>
//                               <h6 class="mx-3 mt-3">Polulation: ${e.population}</h6>
//                               <h6 class="mx-3 mt-2">Region: ${e.region}</h6>
//                               <h6 class="mx-3 mt-2">Capital: ${e.capital}</h6>
//                             </div>
//                        </div>
//                    </div>
//                 `
//                 countryLayout.innerHTML = html
//             });
//     })
// }
// getCountries();


const countriesElement = document.getElementById('countryLayout');
const toggleButton = document.getElementById('toggle');
const searchButton = document.getElementById('searchBar');
const filterButton = document.getElementById('filter');
const modal = document.getElementById('modal');
const backButton = document.getElementById('back');
const regionFilters = filterButton.querySelectorAll('li');

getCountries();

async function getCountries() {
    const res = await fetch('https://restcountries.com/v3.1/all');
    const countries = await res.json();

    displayCountries(countries);
}

function displayCountries(countries) {
    countriesElement.innerHTML = '';
    countries.forEach(e => {
            const countryElememt = document.createElement('div');
            countryElememt.classList.add('col-md-3');

        countryElememt.innerHTML = `
                        <div class="card mb-3">
                            <img src="${e.flags.png}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title mx-3 country-name">${e.name.official}</h5>
                                <h6 class="mx-3 mt-3">Polulation:${e.population}</h6>
                                <h6 class="mx-3 mt-2 country-region">Region:${e.region}</h6>
                                <h6 class="mx-3 mt-2">Capital:${e.capital}</h6>
                            </div>
                        </div>
            `;
        
        countryElememt.addEventListener('click', () => {
            modal.style.display = 'flex';
            showCountryDetails(e);
        }); 

        countriesElement.appendChild(countryElememt);
    });
} 

function showCountryDetails(e) {
    const modalBody = modal.querySelector('.modal-body');
    const modalImg = modal.querySelector('img');

    modalImg.src = e.flags.png;

    modalBody.innerHTML = `
        <h2 mb-3>${e.name.official}</h2>
        <p>
            <strong>Population:</strong>
            ${e.population}
        </p>
        <p>
            <strong>Region:</strong>
            ${e.region}
        </p>
        <p>
            <strong>Sub Region:</strong>
            ${e.subregion}
        </p>
        <p>
            <strong>Top Level Domain:</strong>
            ${e.tld}
        </p>
    `;
}

// Toggle Theme- Dark & Light
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Back the Modal
backButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

searchButton.addEventListener('input', e => {
    const {value} = e.target;
    const countryName = document.querySelectorAll('.country-name');

    countryName.forEach(name => {
        console.log(name.innerText);
        if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
            // card -> .card-body -> .country-name
            name.parentElement.parentElement.style.display = 'block';
        } else {
            name.parentElement.parentElement.style.display = 'none'; 
        }
    });
});

// Add a Filter on the li's inside the .dropdown
regionFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        const value = filter.innerText;
        const countryRegion = document.querySelectorAll('.country-region');

        countryRegion.forEach(region => {
            console.log(region.innerText);
            if (region.innerText.includes(value) || value ==='All') {
                // .card -> .card-body -> .country-region  
                region.parentElement.parentElement.style.display = 'block';
            } else {
                region.parentElement.parentElement.style.display = 'none';
            }
        });  
    });

})
