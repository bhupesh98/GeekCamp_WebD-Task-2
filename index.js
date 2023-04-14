console.log("Hello This website is made by Bhupesh!");

// here I did to update my website with current shows all over the world but images for 14-4-2023 are not available on API so I displayed shows sorted by their show ID


// const date = new Date();
// let formattedDate,formattedMonth;
// let fetchDate = date.getDate(),Month = date.getMonth() + 1;
// if (fetchDate < 10) {
//     formattedDate = "0" + fetchDate;
// } else {
//     formattedDate = fetchDate;
// }
// if (Month < 10) {
//     formattedMonth = "0" + Month;
// } else {
//     formattedMonth =Month;
// }
// // console.log(`https://api.tvmaze.com/schedule/web?date=${date.getFullYear()}-${formattedMonth}-${formattedDate}`);

fetchMovieLink();
function fetchMovieLink() {
    fetch(`https://api.tvmaze.com/shows`)
    .then((response)=> response.json())
    .then((allMovie)=>{
        let allMovieContainer = document.getElementById("content");
        allMovieContainer.innerHTML= "";
        allMovie.forEach((movie)=> {
            renderMovie(movie);
        })
    });
}

function renderMovie(movie) {
    let allMovieContainer = document.getElementById("content");
    let movieInfo = movie;
    const movieContainer = document.createElement("div");
    movieContainer.classList.add('container');

    createMovieImage(movieInfo, movieContainer);
    overlayCreation(movieInfo,movieContainer);
    allMovieContainer.appendChild(movieContainer);
}

function createMovieImage(movieInfo,movieContainer) {
    let movieAnchor = document.createElement("a");
    movieAnchor.href = movieInfo.url;
    let movieImage = document.createElement("img");
    movieImage.classList.add("movieIMG");
    movieImage.src = movieInfo.image.medium; 
    movieImage.alt = movieInfo.name;
    movieAnchor.append(movieImage);
    movieContainer.append(movieAnchor);
}

function overlayCreation(movieInfo,movieContainer) {
    let overlayElement = document.createElement('div');
    overlayElement.classList.add('overlay');
    playButtonCreation(movieInfo,overlayElement);
    movieContainer.appendChild(overlayElement);
}

function playButtonCreation(movieInfo,overlayElement) {
    let hoverAnchor = document.createElement("a");
    hoverAnchor.href = movieInfo.officialSite;
    hoverAnchor.style.textDecoration = "none";

    let watchNow = document.createElement("div");
    watchNow.classList.add("watchnow");

    let watchNowInWords = document.createElement("p");
    watchNowInWords.innerHTML = "Watch Now";
    watchNowInWords.classList.add("watchnow-words");
    watchNow.append(watchNowInWords);
    hoverAnchor.appendChild(watchNow);
    
    let movieContent = document.createElement("div");
    movieContent.classList.add("info");   
    
    let brightInfo = document.createElement("h5");
    brightInfo.innerText = `${movieInfo.name} • ${movieInfo.language}`;
    brightInfo.style.fontWeight = "normal";
    
    let summary = document.createElement("p");
    summary.classList.add("info");
    var summaryInwords = JSON.stringify(movieInfo.summary);
    summary.innerText = summaryInwords.replace(/<[^>]+>/g, '').substring(0,150) + "...";
    summary.style.fontWeight = "lighter";
    movieContent.append(brightInfo,summary);
    
    overlayElement.append(movieContent);
    overlayElement.appendChild(hoverAnchor);
    overlayElement.append(document.createElement("br"));
}

let search_enter = document.getElementById("search");
search_enter.addEventListener("keydown",(e)=> {
    if (e.key === "Enter") {
        searchResults();
    }
})

function searchResults() {
    let keyword = document.querySelector('input').value;
    // console.log(keyword);
    fetch(`https://api.tvmaze.com/search/shows?q=${keyword}`)
    .then((response)=> response.json())
    .then((searchedMovie)=> {
        let allMovieContainer = document.getElementById("content");
        allMovieContainer.innerHTML="";
        if (!searchedMovie.length) {
            document.getElementById("message").innerHTML = "No Results Found";
        } else {
            document.getElementById("message").innerHTML = "Search Results";
        }
        searchedMovie.forEach((element)=> {
            renderMovie(element.show);
        });
        
    });
}
