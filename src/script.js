var game = new Array(10);

for (var i = 0; i < 10; i++) {
    game[i] = new Array(10);
}


var board = document.getElementsByClassName("container")[0];

const closeModalButtons = document.querySelectorAll('.close');
const modal = document.getElementById('myModal');
const resetModalButton = document.getElementById('resetModalButton');
resetModalButton.addEventListener('click', () => {
    StartGame();
    modal.style.display = 'none';
});

function StartGame(){
    board.innerHTML = '';
for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
        var novoBloco = document.createElement('button');
        novoBloco.setAttribute('data-x', `${i}`);
        novoBloco.setAttribute('data-y', `${j}`);
        novoBloco.id = `${i}-${j}`;
        novoBloco.style.width = '50px';
        novoBloco.style.height = '50px';
        if(i %2 == j%2)
            novoBloco.className = 'blockW';  
        else 
            novoBloco.className = 'blockH';
             
        novoBloco.addEventListener("click", function (elem) {

            var locationButton = elem.target.dataset;
            clickButton(elem.target, locationButton);
        });
        novoBloco.addEventListener("contextmenu", function(elem) {
            event.preventDefault();
            var locationButton = elem.target.dataset;
            clickButtonButtonFlag(elem.target, locationButton);
      
        });
        board.appendChild(novoBloco);
    }

}
var indice = 0;
while (indice < 10) {
    var x = GerarValorAleatorio();
    var y = GerarValorAleatorio();

    game[x][y] = "💣";
    indice++;
}
Startup();


}

function verificarAoRedorERetornarNumero(x, y) {
    var numero = 0;
    if (x + 1 <= 9)
        if (game[x + 1][y] == "💣") {
            numero++;
        }
    if (x - 1 >= 0)
        if (game[x - 1][y] == "💣") {
            numero++;
        }
    if (y + 1 <= 9)
        if (game[x][y + 1] == "💣") {
            numero++;
        }
    if (y - 1 >= 0)
        if (game[x][y - 1] == "💣") {
            numero++;
        }
    if (x + 1 <= 9 && y + 1 <= 9)
        if (game[x + 1][y + 1] == "💣") {
            numero++;
        }
    if (x - 1 >= 0 && y - 1 >= 0)
        if (game[x - 1][y - 1] == "💣") {
            numero++;
        }
    if (x - 1 >= 0 && y + 1 <= 9)
        if (game[x - 1][y + 1] == "💣") {
            numero++;
        }
    if (x + 1 <= 9 && y - 1 >= 0)
        if (game[x + 1][y - 1] == "💣") {
            numero++;
        }
    return numero;
}

async function preencherValoresBoard() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (game[i][j] != "💣") {
                game[i][j] = await verificarAoRedorERetornarNumero(i, j);

            }
        }
    }
}


function GerarValorAleatorio() {
    var randomNumber = Math.floor(Math.random() * 10);
    return randomNumber;
}
function colocarConteudo(button, x,y){
    button.textContent = game[x][y];
    
}
async function exibirTudo(){
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
           var id =  `${i}-${j}`;
         var block =   document.getElementById(id);
         block.textContent = game[i][j];

        }
    }
}
async function clickButton(button, locationButtonClick) {

    let x = locationButtonClick.x;
    let y = locationButtonClick.y;
    await colocarConteudo(button, x, y);


    if (game[x][y] == "💣"){
        
       await exibirTudo();
        modal.style.display = 'block';
       

    }
    else
        abrirRecursivamente(x, y);

}

function clickButtonButtonFlag(button, locationButtonClick){
    
    let x = locationButtonClick.x;
    let y = locationButtonClick.y;
    var id =  `${x}-${y}`;
    var block =   document.getElementById(id);
    console.log(block.textContent);
    if(block.textContent)
    block.textContent = "";
    if( block.textContent);
    block.textContent = '🚩';
    
  


}
function criarCoordenadas(xP, yP) {
    let cordenada = {
        x: Number(xP),
        y: Number(yP)
    }
    return cordenada;
}
function abrirRecursivamente(x, y) {
    let cordenadaPrimaria = criarCoordenadas(x, y);
    let i = 0;
    var mapa = new Array(10);

    for (var j = 0; j < 10; j++) {
     mapa[j] = new Array(10);
    }

    if (game[x][y] != 0)
        return;
    var fila = [];
    fila.push(cordenadaPrimaria);

    while (i < fila.length) {
    
        console.log(fila);
        let cordenada = fila[i];
    
        button = document.getElementById(`${cordenada.x}-${cordenada.y}`);
        button.textContent = game[cordenada.x][cordenada.y];
        i++;

        mapa[cordenada.x][cordenada.y] = true;
        if(game[cordenada.x][cordenada.y] != 0)
        continue

        if (cordenada.x < 9 && !mapa[cordenada.x+1][cordenada.y])  {
                fila.push(criarCoordenadas(cordenada.x + 1, cordenada.y));
            }
        if (cordenada.x > 0 && !mapa[cordenada.x-1][cordenada.y]) {
                fila.push(criarCoordenadas(cordenada.x - 1, cordenada.y));
            }
        if (cordenada.y < 9 && !mapa[cordenada.x][cordenada.y + 1]) {
                fila.push(criarCoordenadas(cordenada.x, cordenada.y + 1));
            }
        if (cordenada.y > 0  && !mapa[cordenada.x][cordenada.y - 1]) {
                fila.push(criarCoordenadas(cordenada.x, cordenada.y - 1));
         }

         //todo

    }

}

function Startup() {
    preencherValoresBoard();
}

var start = document.getElementsByClassName("start")[0];
start.addEventListener("click", function (elem) {
    StartGame();
});


