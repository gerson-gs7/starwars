import { peopleFetch } from "../service/peoples_service.js";
import { homeworldFetch } from "../service/planets_service.js";

//funçãod e criação de cards dos personagens
const criaCard = (personagem) => {
    // console.log('Criando card para:', personagem.name);
    // console.log('Planeta natal:', personagem.homeworldName);

    const cardNovoPersonagem = document.createElement('div');
    cardNovoPersonagem.classList.add('card', 'mb-3');
    cardNovoPersonagem.dataset.name = personagem.name.toLowerCase();
    cardNovoPersonagem.dataset.eyeColor = personagem.eye_color.toLowerCase();
    cardNovoPersonagem.dataset.hairColor = personagem.hair_color.toLowerCase();
    cardNovoPersonagem.dataset.gender = personagem.gender.toLowerCase();
    // cardNovoPersonagem.dataset.homeworld = typeof personagem.homeworldName === 'string' ? personagem.homeworldName.toLowerCase() : 'unknown';
    const conteudo = ` 
        <ul class="card-header">${substituirIndefinido(personagem.name)}</ul>
        <div class="card-body">
            <li class="card-text bg-dark text-white">Eye Color: ${substituirIndefinido(personagem.eye_color)}</li>
            <li class="card-text">Hair Color: ${substituirIndefinido(personagem.hair_color)}</li>
            <li class="card-text bg-dark text-white">Gender: ${substituirIndefinido(personagem.gender)}</li>
            <li class="card-text">Birth Year: ${substituirIndefinido(personagem.birth_year)}</li>
            <li class="card-text bg-dark text-white">Homeworld: ${substituirIndefinido(personagem.homeworldName)}</li>
        </div>`;
    cardNovoPersonagem.innerHTML = conteudo;
    return cardNovoPersonagem;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//substituindo o valor retornado de n/a para undefined
const substituirIndefinido = (valor) => {
    return valor === "n/a" ? "undefined" : valor;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//controle de filtros e pesquisa
const container = document.querySelector('[data-container]');
const filtrarCards = () => {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const eyeColor = document.getElementById('eyeColorInput').value.toLowerCase();
    const hairColor = document.getElementById('hairColorInput').value.toLowerCase();
    const gender = document.getElementById('genderSelectInput').value.toLowerCase();

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const name = card.dataset.name;
        const cardEyeColor = card.dataset.eyeColor;
        const cardHairColor = card.dataset.hairColor;
        const cardGender = card.dataset.gender;

        const matchesSearch = !search || name.includes(search);
        const matchesEyeColor = !eyeColor || cardEyeColor.includes(eyeColor);
        const matchesHairColor = !hairColor || cardHairColor.includes(hairColor);
        const matchesGender = !gender || cardGender === gender;

        if (matchesSearch && matchesEyeColor && matchesHairColor && matchesGender) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

// Adicionar eventos de input para filtrar dinamicamente
document.getElementById('searchInput').addEventListener('input', filtrarCards);
document.getElementById('eyeColorInput').addEventListener('input', filtrarCards);
document.getElementById('hairColorInput').addEventListener('input', filtrarCards);
document.getElementById('genderSelectInput').addEventListener('change', filtrarCards);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//controle de paginação
let currentPage = 1;
const charactersPerPage = 10;

const renderPage = (personagens) => {
    container.innerHTML = ''; // Limpar os cards existentes
    const start = (currentPage - 1) * charactersPerPage;
    const end = start + charactersPerPage;
    const personagensPagina = personagens.slice(start, end);

    personagensPagina.forEach(personagem => {
        container.appendChild(criaCard(personagem));
    });

    updatePaginationControls(personagens.length);
};

const updatePaginationControls = (totalCharacters) => {
    const totalPages = Math.ceil(totalCharacters / charactersPerPage);
    const paginationContainer = document.querySelector('[data-pagination]');

    paginationContainer.innerHTML = ''; // Limpar os controles existentes

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('pagination-button');
        if (i === currentPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            currentPage = i;
            renderPage(detalhesPersonagens);
        });
        paginationContainer.appendChild(button);
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//método para renderizar os cards
const render = async () => {
    try {
        const personagens = await peopleFetch();
        const detalhesPersonagens = await Promise.all(personagens.map(async (personagem) => {
            const response = await fetch(personagem.url);
            const data = await response.json();
            const personagemDetalhes = data.result.properties;

            // Fetch homeworld name and save to cache
            const homeworldName = await homeworldFetch(personagemDetalhes.homeworld);
            personagemDetalhes.homeworldName = homeworldName;

            // console.log('Detalhes do personagem:', personagemDetalhes);

            return { ...personagemDetalhes };
        }));

        renderPage(detalhesPersonagens); //Renderizar a primeira página

        container.innerHTML = ''; // Limpar os cards existentes
        detalhesPersonagens.forEach(personagem => {
            container.appendChild(criaCard(personagem));
        });

    } catch (error) {
        console.log(error);
    }
};

render();