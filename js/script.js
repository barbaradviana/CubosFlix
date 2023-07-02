const highLightVideo = document.querySelector(".highlight__video");
const highLightVideoLink = document.querySelector(".highlight__video-link");
const highLightTitle = document.querySelector(".highlight__title");
const highLightRating = document.querySelector(".highlight__rating");
const highLightGenres = document.querySelector(".highlight__genres");
const highLightLaunch = document.querySelector(".highlight__launch");
const highLightDescription = document.querySelector(".highlight__description");
const movies = document.querySelector(".movies");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

const input = document.querySelector("input");

let moviesData = [];
let page = 0;

const MIN_PAGE = 0;
const MAX_PAGE = 18;

btnPrev.addEventListener('click', () => {
    if (page === 0) {
        page = MAX_PAGE;
        return;
    }

    page -= 6;
    refreshMovies();
});

btnNext.addEventListener('click', () => {
    if (page === MAX_PAGE) {
        page = MIN_PAGE;
        return;
    }

    page += 6;
    refreshMovies();
});

input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
        return;
    }

    page = 0;

    if (!input.value) {
        loadMovies();
        return;
    }
    loadFilteredMovies(input.value);

});

async function loadFilteredMovies(filter) {
    try {
        const response = await api.get(`/3/search/movie?language=pt-BR&include_adult=false&query=${filter}`);
        const { results } = response.data;
        moviesData = results;
        refreshMovies();
    } catch (error) {

    }
}

function refreshMovies() {
    movies.innerHTML = "";

    try {
        for (let i = page; i < page + 6; i++) {
            const movie = moviesData[i];

            if (!movie) {
                continue;
            }

            const movieContainer = document.createElement("div");
            movieContainer.classList.add("movie");
            movieContainer.style.backgroundImage = `url(${movie.poster_path})`;

            const movieInfo = document.createElement("div");
            movieInfo.classList.add("movie__info");

            const movieTitle = document.createElement("span");
            movieTitle.classList.add("movie__title");
            movieTitle.textContent = movie.title;

            const movieRating = document.createElement("span");
            movieRating.classList.add("movie__rating");

            const movieRatingStar = document.createElement("img");
            movieRatingStar.src = "./assets/estrela.svg";
            movieRatingStar.alt = "Rating";

            const ratingNumber = document.createElement("span");
            ratingNumber.textContent = movie.vote_average;

            movieRating.appendChild(ratingNumber);
            movieRating.appendChild(movieRatingStar);

            movieInfo.appendChild(movieTitle);
            movieInfo.appendChild(movieRating);

            movieContainer.appendChild(movieInfo);

            movies.appendChild(movieContainer);
        }
    } catch (error) {
        console.log()
    }
}

async function loadMovies() {
    try {
        const response = await api.get("/3/discover/movie?language=pt-BR&include_adult=false");
        const { results } = response.data;
        moviesData = results;

        refreshMovies();
    } catch (error) {
        console.log()
    }
}

async function loadHighLights() {
    try {
        const response = await api.get("/3/movie/436969?language=pt-BR");
        const movieData = response.data;

        highLightVideo.style.background = `linear-gradient(rgba(0, 0, 0, 0.6) 100%, 
        rgba(0, 0, 0, 0.6) 100%), url('${movieData.backdrop_path}') no-repeat center / cover`;
        highLightTitle.textContent = movieData.title;
        highLightRating.textContent = movieData.vote_average;
        highLightGenres.textContent = movieData.genres.map((genre) => genre.name).join(", ");
        highLightLaunch.textContent = new Date(movieData.release_date).toLocaleDateString(
            "pt-BR",
            {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
            }
        );
        highLightDescription.textContent = movieData.overview;

    } catch (error) {
        console.log(error);
    }


}

async function fillPlayerMovie() {
    try {
        const response = await api.get("/3/movie/436969/videos?language=pt-BR");
        const { results } = response.data;

        highLightVideoLink.href = 'https://www.youtube.com/watch?v=ovOFmJYRnyQ';


    } catch (error) {

    }
}

fillPlayerMovie();
loadMovies();
loadHighLights();