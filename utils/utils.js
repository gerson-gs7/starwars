const createPagination = (page) => {
    const ul = document.createElement('ul')
    ul.className = 'pagination';
    
    let btPrevious = document.createElement('li')
    btPrevious.className = 'page-item'
    btPrevious.innerHTML = `<button class="page-link">Previous</button>`
    if(page==1) btPrevious.querySelector('button').className = "page-link disabled"
    btPrevious.addEventListener("click", function() {
        render(page-1,limit)
    })
    ul.appendChild(btPrevious)
    
    for (let i = 1; i <= total_pages; i++) {

        let li = document.createElement('li')
        li.className = 'page-item'
        li.innerHTML = ` <a class="page-link active" href="?page=${i}&limit=${limit}">${i}</a>` 
        if(page != i)li.querySelector('a').className = 'page-link'
        
        ul.appendChild(li)
        
    }
      
    let btNext = document.createElement('li')
    btNext.className = 'page-item'
    btNext.innerHTML = `<button class="page-link" href="#">Next</button>`
    if(page==total_pages) btNext.querySelector('button').className = "page-link disabled";
    btNext.addEventListener("click", function() {
        render(page+1,limit)
    })
    ul.appendChild(btNext)
    
    return ul;
}