const cards = document.querySelector(".cards");
let form = document.querySelector("#user-input");
let search = document.querySelector("#search");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getData(search.value);
  search.value = " ";
});

// Page Load Data
async function pageDispaly() {
  try {
    const imgPath = `https://image.tmdb.org/t/p/w500`;
    const url = await fetch(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1`
    );
    const data = await url.json();
    const page = data.results;

    console.log(page);
    

    for (const card of page) {
      const {
        poster_path,
        title,
        overview: story,
        popularity: rating,
        release_date: date,
      } = card;

      let div = document.createElement("div");
      let img = document.createElement("img");
      let heading = document.createElement("h3");

      heading.innerText = title;

      img.setAttribute("src", `${imgPath + poster_path}`);
      div.setAttribute("class", `card`);
      heading.setAttribute("class", `sm-title`);

      cards.append(div);
      div.append(img);
      div.append(heading);
    }
  } catch (error) {
    console.log(error);
  }
}
pageDispaly();

// Search data
async function getData(value) {
  try {
    const apiKey = `221ad1f091a4e87b75ed4acb95dfdb32`;
    const search = value;
    const url = await fetch(
      ` https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
        search
      )}`
    );
    const res = await url.json();
    displayData(res);
  } catch (error) {
    console.log(error);
  }
}
// Display data in page
async function displayData(res) {
  console.log(res);
  const [data] = res.results;
  const imgPath = `https://image.tmdb.org/t/p/w500`;
  const {
    poster_path,
    title,
    overview: story,
    popularity: rating,
    release_date: date,
  } = data;

  cards.innerHTML = " ";
  let div1 = document.createElement("div");
  let div = document.createElement("div");
  let div2 = document.createElement("div");
  let div3 = document.createElement("div");
  let div4 = document.createElement("div");
  let img = document.createElement("img");
  let heading = document.createElement("h1");
  let para = document.createElement("p");
  let para2 = document.createElement("p");
  let para3 = document.createElement("p");
  let a = document.createElement("a");

  heading.innerHTML = `Title: ${title}`;
  a.innerText = `⬅️ Back`;
  para3.innerHTML = `<b>Movie Details:</b> ${story}`;
  para.innerHTML = `<b>Rating:</b> ${rating}`;
  para2.innerHTML = `<b>Relese Date:</b> ${date}`;

  img.setAttribute("src", `${imgPath + poster_path}`);
  a.setAttribute("class", `home-btn`);
  div1.setAttribute("class", `box-1`);
  div3.setAttribute("class", `a-con`);
  div.setAttribute("class", `box`);
  div4.setAttribute("class", `box-3`);
  div2.setAttribute("class", `box-2`);

  a.addEventListener("click", () => {
    cards.innerHTML = "";
    pageDispaly();
  });
  cards.append(div1);
  div1.prepend(div3);
  div3.append(a);
  div1.append(div);
  div.prepend(div4);
  div4.append(img);
  div.append(div2);
  div2.append(heading);
  div2.append(para);
  div2.append(para2);
  div2.append(para3);
}
