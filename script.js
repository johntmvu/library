const myLibrary = [];

let dialog = document.querySelector("dialog")
let openDialog = document.querySelector("#addBook")
let closeDialog = document.querySelector("#closeDialog")
let form = document.querySelector("#newBook")
let table = document.querySelector("table")
let tableBody = document.querySelector("tbody")
let submit = document.querySelector("#submit")


function Book(name = 'n/a', author = 'n/a', pages = '0', isRead = false) {
    this.name = name
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

function removeBook() {
    let index = parseInt(this.parentNode.dataset.number);
    table.deleteRow(index)
    myLibrary.splice(index - 1, 1)
    console.log(myLibrary)
}

function displayBook(book) {
    let row = document.createElement("tr")
    let removeButton = document.createElement("button")

    removeButton.textContent = "Remove"

    for (let key in book) {
        let data = document.createElement("td")
        data.innerText = book[key]
        row.appendChild(data)
    }

    row.appendChild(removeButton)
    tableBody.appendChild(row).dataset.number = myLibrary.length


    removeButton.addEventListener("click", removeBook)
}


function submitForm(e) {
    e.preventDefault()
    const formData = new FormData(form)  
    const formProps = Object.fromEntries(formData)
    let newBook = new Book(
        formData.get('Name'),
        formData.get('Author'),
        formData.get('Pages'),
        formData.get('isRead') === 'on'
    )

    myLibrary.push(newBook)
    form.reset()
    dialog.close()

    displayBook(myLibrary.at(-1))
}

openDialog.addEventListener("click", () => { dialog.showModal() })

closeDialog.addEventListener("click", () => dialog.close())

submit.addEventListener("click", submitForm)

myLibrary.push(new Book('Atomic Habits', 'James Clear', 320, 'true'))

document.addEventListener("DOMContentLoaded", () => {
    displayBook(myLibrary.at(-1))
})


