let divVictory = document.querySelector(".victory");
const winGame=()=>{
    fetch("dados.JSON").then((response)=>{
        response.json().then((object)=>{
            object.words.map((words)=>{
                divVictory.innerHTML += `<h1>${words.name}</h1>
                                        <h2>${words.mean}</h2>`;
            })
        })
    })
}
