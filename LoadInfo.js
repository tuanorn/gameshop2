const members = [
    {name: "Jewell Efe", dept: "Operations", description: "Created by a random name generator", img: "https://steamuserimages-a.akamaihd.net/ugc/924802058717094712/ACC7BE614DDB7472BB466F8E53FF75368C3C6E7F/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"},
    {name: "Alaba Lavern", dept: "Marketing", description: "Created by a random name generator", img: "https://steamuserimages-a.akamaihd.net/ugc/924802058717094712/ACC7BE614DDB7472BB466F8E53FF75368C3C6E7F/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"},
    {name: "Abimbola Ayanda", dept: "Finance", description: "Created by a random name generator", img: "https://steamuserimages-a.akamaihd.net/ugc/924802058717094712/ACC7BE614DDB7472BB466F8E53FF75368C3C6E7F/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"},
]

function loadMembers() {
    for (a of members) {
        let node = document.createElement("div");
        node.classList.add("member");
        node.innerHTML = `
            <img src="${a.img}">
            <div>
                <h2>${a.name}</h2>
                <h3>Department: ${a.dept}</h3>
                <p>${a.description}</p>
            </div>
        `;
        document.querySelector(".members").appendChild(node);
    }
}

