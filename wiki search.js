let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    // Here we need the following things are required to potray the search results dynamically..
    // 1) Div Container -- result-item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    // 2) Anchor Title -- result-title
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank"; //this line helps us to open that link in new tab.

    resultItemEl.appendChild(resultTitleEl);

    // 3) line break
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    // 4) Anchor URL -- result-url
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.target = "_blank";

    resultItemEl.appendChild(urlEl);

    // 5) line break
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    // paragraph description -- line-description
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("line-description");
    descriptionEl.textContent = description;

    resultItemEl.appendChild(descriptionEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchwikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = ""; // --> used to clear the previously search results in the searchResults Container.
        spinnerEl.classList.toggle("d-none");
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData; //Object destructuring in jsonData Object, we are detaching the item of key "search_results"
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchwikipedia);