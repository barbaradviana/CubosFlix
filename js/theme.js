const root = document.querySelector(":root");
const btnTheme = document.querySelector(".btn-theme");
const btnPrevMovie = document.querySelector(".btn-prev");
const btnNextMovie = document.querySelector(".btn-next");
const logo = document.querySelector(".logo");

let theme = localStorage.getItem("theme") !== null ? localStorage.getItem("theme") : "light";

function applyTheme() {
    if (theme === "dark") {
        root.style.setProperty("--background", "#1B2028");
        root.style.setProperty("--text-color", "#fff");
        root.style.setProperty("--bg-secondary", "#2D3440");
        root.style.setProperty("--input-border-color", "#665F5F");
        root.style.setProperty("--input-background-color", "#3E434D");

        logo.src = "assets/logo-light.svg";
        btnTheme.src = "assets/light.svg";
        btnPrevMovie.src = "assets/arrow-left-light.svg";
        btnNextMovie.src = "assets/arrow-right-light.svg";

        return;
    }
    root.style.setProperty("--background", "#fff");
    root.style.setProperty("--text-color", "#1B2028");
    root.style.setProperty("--bg-secondary", "#ededed");
    root.style.setProperty("--input-border-color", "#1B2028");
    root.style.setProperty("--input-background-color", "#fff");

    logo.src = "assets/logo.svg";
    btnTheme.src = "assets/dark.svg";
    btnPrevMovie.src = "assets/arrow-left-dark.svg";
    btnNextMovie.src = "assets/arrow-right-dark.svg";

}
btnTheme.addEventListener("click", () => {
    if (theme === "light") {
        theme = "dark";
    } else {
        theme = "light";
    }
    localStorage.setItem("theme", theme);
    applyTheme();
});