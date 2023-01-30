const searchBtn = document.getElementById('search-btn');
const input = document.querySelector('#term-input');
const divRezultat = document.querySelector("#rezultat");
const h1Zanr = document.querySelector('#unos-zanr');
const lista1 = document.querySelector('#lista1');
const divRezultat2 = document.querySelector("#rezultat2");

const handleSearch = () => {
    console.log('pozvan handler');
    const termUnos = input.value;
    if (termUnos.lenght < 3){
        console.log('premalo znakovlja');
        return;
    }
    console.log(input.value);
    console.log(termUnos);
    
    const url = `https://itunes.apple.com/search?term=${termUnos}&entity=song`;

    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    if(termUnos.length < 3){
        return;
    }
    request.onload = () => {
        lista1.innerHTML = '';
        console.log(request);
        if(request.status === 200 && termUnos.length > 2){
            const responseObject = JSON.parse(request.response);
            const sviRezultati = responseObject.results;
            for(let i=0; i < sviRezultati.length; i++){
            const pjesma = responseObject.results[i].trackName;
            const artist = responseObject.results[i].artistName;
            h1Zanr.innerText = termUnos;
            // divRezultat.innerHTML = `Pjesma je ${pjesma}`;
            // divRezultat2.innerHTML = `Autor je ${artist}`;
            const novaLista = document.createElement('li');
            novaLista.innerText = pjesma;
            lista1.appendChild(novaLista);
            }
        }
      else if(request.status >= 400 && request.status < 500){
        h1Zanr.innerText = `${termUnos} nije nađen.`;
        divRezultat.innerHTML = '';
    } else {
        h1Zanr.innerText = `Dogodila se greška. Pokušajte opet.`;
        const novaLista = document.createElement('li');
        novaLista.innertext = 'E ne može';
    }
    
}

request.send();

};

searchBtn.addEventListener('click', handleSearch);
input.addEventListener('input', handleSearch);