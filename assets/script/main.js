let links = document.querySelectorAll(".nav-link");
const book_title = document.getElementById("book_title");
const book_desc = document.getElementById("book_desc");
const book_cover = document.getElementById("book_cover");
// if(links.length){
//     links.forEach((link) => {
//         link.addEventListener("click", (e) => {
//             links.forEach((link) => {
//                 link.classList.remove('active');
//             });
//             e.preventDefault();
//             link.classList.add('active')
//         })
//     })
// }

function clearElements() {
  book_title.innerHTML = "";
  book_desc.innerHTML = "";
  book_cover.setAttribute("src", "");
}

const makeCall = async(book_name) => {
    let response = await fetch("https://openlibrary.org/search.json?q=" + book_name)
    let data = data.json()
} 

let getBooks = {
  fetchKey: function (query) {
    fetch("https://openlibrary.org/search.json?q=" + query)
      .then((response) => response.json())
      .then((response) => this.getKey(response.docs));
  },

  getKey: function (data) {
    const { key } = data[0];
    console.log(key);
    this.fetchBook(key);
  },

  fetchBook: function (key) {
    fetch("https://openlibrary.org" + key + ".json")
      .then((response) => response.json())
      .then((response) => this.displayBook(response));
  },

  displayBook: function (data) {
    const { description, title, covers } = data;
    console.log(title);
    document.getElementById("book_title").innerHTML = title;
    document.getElementById("book_desc").innerHTML = description;
    document
      .getElementById("book_cover")
      .setAttribute(
        "src",
        "https://covers.openlibrary.org/b/id/" + covers[0] + ".jpg"
      );
  },
};

// https://covers.openlibrary.org/b/isbn/9788533619623.jpg -> Cover
// https://covers.openlibrary.org/b/id/9255566.jpg

function runGetBooks() {
  let query = document.getElementById("book_query").value;
  console.log(query);
  clearElements();
  getBooks.fetchKey(query);
}

document.getElementById("search-btn").addEventListener("click", function () {
  runGetBooks();
});

document
  .getElementById("search-btn")
  .addEventListener("keyup", function (event) {
    if (event.key == "enter") {
      runGetBooks();
    }
  });
