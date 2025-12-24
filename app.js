const themeBtn = document.querySelector(".theme-btn");
const icon = document.querySelector(".fa-regular");
const html = document.documentElement;
const themeValue = localStorage.getItem("theme");

if (themeValue == "light") {
  html.classList.remove("dark");
  icon.classList.add("fa-moon");
  icon.classList.remove("fa-sun");
} else {
  html.classList.add("dark");
  icon.classList.add("fa-sun");
  icon.classList.remove("fa-moon");
}

themeBtn.addEventListener("click", (e) => {
  html.classList.toggle("dark");
  if (html.getAttribute("class") == "light") {
    localStorage.setItem("theme", "light");
    icon.classList.add("fa-moon");
    icon.classList.remove("fa-sun");
  } else {
    localStorage.setItem("theme", "dark");
    icon.classList.add("fa-sun");
    icon.classList.remove("fa-moon");
  }
});

// Api Call

async function moviesRequest(categoires, page, title) {
  try {
    const key = "78f34ce1";
    const res = await fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${key}&t=${title}&s=${categoires}&page=${page}`
    );
    const result = await res.json();
    return result.Search;
  } catch (error) {
    console.error("There is issue while api call");
  }
}

async function loadTrending(categoires, page) {
  const trending = await moviesRequest(categoires, page);
  const container = document.querySelector(".trending-card-container");

  const newArr = trending.map((arr) => {
    return `<div class="md:w-36 w-28 h-32 md:h-40 m-2.5 rounded-lg overflow-hidden relative">
            <img
              src="${arr.Poster}"
            />
            <div class="absolute bottom-0 left-0 bg-zinc-950 w-full p-1.5">
              <h1 class="text-white font-medium text-sm md:text-lg mx-1.5">
                ${arr.Title}
              </h1>
            </div>
          </div>
    `;
  });

  newArr.forEach((elem) => {
    const div = document.createElement("div");
    div.innerHTML = elem;
    container.append(div);
  });
}

async function loadPopular(categoires, page) {
  const trending = await moviesRequest(categoires, page);
  const container = document.querySelector(".popular-searches");

  const newArr = trending.map((arr) => {
    return `<div
            class="md:w-40 w-28 p-2.5 m-2.5 rounded-lg hover:bg-neutral-800 hover:text-white transition-all duration-300 dark:text-white text-black"
          >
            <img
              src="${arr.Poster}"
              class="rounded-lg md:h-40 md:w-40"
            />
            <div class="mt-1 text-sm">
              <h1 class="p-0.5 md:text-lg text-sm font-medium">${arr.Title}</h1>
              <h5 class="p-0.5 md:text-sm text-xs font-medium">Year : ${arr.Year}</h5>
            </div>
          </div>`;
  });

  newArr.forEach((elem) => {
    const div = document.createElement("div");
    div.innerHTML = elem;
    container.append(div);
  });
}

loadTrending("action", 1);
loadPopular("car", 1);

// Input Search

const form = document.querySelector("#user-input");
const searchBar = document.querySelector("#search-bar");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getData(searchBar.value);
  searchBar.value = " ";
});

async function getData(searchValue) {
  try {
    const key = "78f34ce1";
    const search = searchValue;
    const res = await fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${key}&t=${search}`
    );
    const result = await res.json();
    displayData(result);
  } catch (error) {
    console.error("Search Error");
  }
}
function displayData(value) {
  const trending = document.querySelector("#trending");
  const popular = document.querySelector("#popular");
  const searchboxInput = document.querySelector("#search-box-input");

  trending.innerHTML = "";
  popular.innerHTML = "";

  searchboxInput.innerHTML = `<div class="flex justify-between" >
          <div
            class="md:w-40 w-28 p-2.5 m-2.5 rounded-lg hover:bg-neutral-800 hover:text-white transition-all duration-300 dark:text-white text-black"
          >
            <img
              src="${value.Poster}"
              class="rounded-lg md:h-40 md:w-40"
            />
            <div class="mt-1 text-sm">
              <h1 class="p-0.5 md:text-lg text-sm font-medium">${value.Title}</h1>
              <h5 class="p-0.5 md:text-sm text-xs font-medium">Year : ${value.Year}</h5>
            </div>
          </div>
          <div>
            <a href="index.html" class="cursor-pointer">⬅️ Back</a>
          </div>
          </div>`;
}


