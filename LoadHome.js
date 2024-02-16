const games = [
    {title:"Sea of Death", img:"https://e0.pxfuel.com/wallpapers/331/520/desktop-wallpaper-2560x1440-games-16-9.jpg",
    link:"", category:"Trending"},
    {title:"Inumaki", img:"https://wallpapersmug.com/download/1600x900/da7528/hyper-light-drifter-minimal-game.jpg",
    link:"", category: "Trending"},
    {title:"The Samurai", img:"https://wallpaperaccess.com/full/306751.jpg",
    link:""},
    {title:"Oblivion", img:"https://e0.pxfuel.com/wallpapers/251/448/desktop-wallpaper-21-9-gaming-content-awared-16-9.jpg",
    link:""},
    {title:"The Flamethrowers", img:"https://www.desktopbackground.org/download/1366x768/2010/04/25/7591_4k-gaming-wallpapers-mobile_3840x2160_h.jpg",
    link:""},
    {title:"The Lone Wolf", img:"https://www.desktopbackground.org/download/1920x1080/2015/11/07/1038633_games-wallpaper-gaming-wallpapers-high-resolution-hd-quality_1920x1200_h.jpg",
    link:""},
    {title:"The Last Stand", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmrPn95KPtRmhJkieQZv9Gk8f4wvlTUG4Ofw&usqp=CAU",
    link:""},
    {title:"Sand & Glory", img:"https://w0.peakpx.com/wallpaper/180/295/HD-wallpaper-assassin-s-creed-origins-egypt-pyramids-video-game-u-16-9-widescreen-background-2296-egypt-8k.jpg",
    link:""},
    {title:"Red Alert", img:"https://www.desktopbackground.org/download/1920x1080/2013/04/19/563389_games-4k-ultra-hd-wallpapers-4k-wallpaper-net_3840x2160_h.jpg",
    link:""},
    {title:"Yin & Yang", img:"https://wallpapersmug.com/download/1600x900/56e3ed/game-mortal-kombat-11.jpg",
    link:""},
];

function loadGameList() {
    let bool = sessionStorage.getItem("glist") && sessionStorage.getItem("glist") != "null";//the presence of glist indicates that there's a game filter
    console.log(sessionStorage.getItem("glist"));
    let tempArray = bool? sessionStorage.getItem("glist").replaceAll(",", "") : games; //decides whether to use 'glist' or 'games' tempArray
    if (bool) {
        document.querySelector("#searchbox").value = sessionStorage.getItem("search");//retains searched value (allows modifications)
        document.querySelector("#pg-title").innerHTML = "Search results";
        document.querySelector(".trending").remove(); //removes node
        document.querySelector(".games").style.justifyContent = "flex-start";
        document.querySelector(".games").style.marginTop = "20px";
        document.getElementById("rmv-filter").style.display = "block";
    }//Refines appearance
    sessionStorage.setItem("glist", null);
    if (tempArray == -1) {
        console.log("a");
        let node = document.createElement("p");
        node.innerHTML = "No games with matching name found";
        document.querySelector(".games").appendChild(node);
        return;
    }
    let trending_game_loaded = false;
    for (elem of tempArray) {
        let value = bool? games[elem] : elem;
        let bool2 = (!bool && value.category == "Trending");
        if (bool2 && trending_game_loaded) {continue;}
        if (bool2) {trending_game_loaded = true;}
        console.log(elem);
        console.log(value);
        let content = document.querySelector(bool2? ".trending" : ".games");
        let node = bool2? content.childNodes[3] : document.createElement("a");
        node.classList.add("game");
        node.addEventListener("click", function() {toGame(node.innerHTML);}); //calls the function toGame on trigger of an event specified by the literal (hàm xử lý sự kiện)
        node.innerHTML = `
            <img src="${value.img}">
            <p>${value.title}${bool2? "\t<span style='background-color: var(--secondaryColor); padding-left: 5px; padding-right: 5px;'><b>Trending</b></span>" : ""}</p>
        `;
        if (bool) {node.style.marginRight = "4%";}
        if (!bool2) {content.appendChild(node);}
    }
}
//Transitions
function animateGameDiv(message) {
    let node = document.querySelector(".trending").querySelector(".game");
    let game_name = node.querySelector("p").innerHTML;
    let tempArray = [];
    let index = -1;
    for (let i = 0; i < games.length; i++) {
        if (games[i].category == "Trending") {
            tempArray.push(i);
        }
        if (game_name.match(games[i].title) && games[i].category == "Trending") {
            index = tempArray.length - 1;
        } 
    } //loops through 'games' array to record trending games
    if (index > -1) {//checks whether a match in a loop has been found
        index += message == "next"? 1 : -1; //get the next or previous item in the 'tempArray' variable depending on the message
        console.log(index, tempArray[index]);
        if (tempArray[index] < 0) {return;} //prevents error if tempArray[index] is the last item in the list
        node.innerHTML = `
            <img src="${games[tempArray[index]].img}">
            <p>${games[tempArray[index]].title} <span style='background-color: var(--secondaryColor); padding-left: 5px; padding-right: 5px;'><b>Trending</b></span></p>
        `;
    }
}
//Redirecting to game page
function toGame(queryTitle) {
    let tempTitle = function() {
        for (a of games) {
            if (queryTitle.match(a.title)) {
                return a.title;
            }
        }
    };
    sessionStorage.setItem("game-title", tempTitle());
    location.href = "game.html";
}
//Filtering games
function filterGames(event, target) {
    if (event.key == "Enter" && target.value.trim() != "") {
        let list = []; //stores matching items
        for (let i = 0; i < games.length; i++) {
            if (games[i].title.toLowerCase().match(target.value.toLowerCase())) {//Converts user inputs and game names to lowercase for matching
                list.push(i);
            }
        }
        sessionStorage.setItem("glist", list.length > 0? list : -1);//Checks whether list is empty
        sessionStorage.setItem("search", target.value);//Used for retaining filter
        location.href = "index.html";
    }
}