const booksContainer = document.querySelector('main.libros');
document.querySelector('.buscador')
    .addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            fetch('http://localhost:3000/books/name/' + event.target.value)
                .then(res => res.json())
                .then(res => {
                        booksContainer.innerHTML = '';
                        const book = res;
                        console.log(book)
                        document.querySelector('main.libros').innerHTML += `
                        <div class="book">
                        <img src="${book.image_path}" alt="" class ="foto">
                        <p><h1>${book.name}</h1></p>
                        <p class ="resume">${book.resume}</p>
                    </div>`
                    }

                )
        }
    })


axios.get('http://localhost:3000/books')
    .then(res => {
        const books = res.data;
        const booksContainer = document.querySelector('main.libros');
        books.forEach(book => {

            booksContainer.innerHTML += ` 
            <div class="book">
            <img src="${book.image_path}" alt="" class ="foto">
            <p><h1>${book.name}</h1></p>
            <p class ="resume">${book.resume}</p>
        </div>`

        })
    })