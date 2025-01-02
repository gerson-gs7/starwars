const createPagination = (page, limit, total_pages) => {
    const ul = document.createElement('ul')
    ul.className = 'pagination';

    let btPrevious = document.createElement('li')
    btPrevious.className = 'page-item'
    btPrevious.innerHTML = `<a class="page-link" href="?page=${page-1}&limit=${limit}">Previous</a>`
    if (page == 1) btPrevious.querySelector('a').className = "page-link disabled"
    ul.appendChild(btPrevious)

    for (let i = 1; i <= total_pages; i++) {

        let li = document.createElement('li')
        li.className = 'page-item'
        li.innerHTML = ` <a class="page-link active" href="?page=${i}&limit=${limit}">${i}</a>`
        if (page != i) li.querySelector('a').className = 'page-link'

        ul.appendChild(li)

    }

    let btNext = document.createElement('li')
    btNext.className = 'page-item'
    btNext.innerHTML = `<a type="button" class="page-link" href="?page=${parseInt(page)+1}&limit=${limit}">Next</a>`
    if (page == total_pages) btNext.querySelector('a').className = "page-link disabled";
    ul.appendChild(btNext)

    return ul;
}
const createCard = (model) => {
    const container = model;
    const card = document.createElement('div');
    card.innerHTML = container;
    card.className = 'card text-white mb-3 col-sm-12';
    card.id = 'card';
    card.style = 'max-width: 18rem;'
    return card;
}
export const utils = {
    createPagination,
    createCard
}
