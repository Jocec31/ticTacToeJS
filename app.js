// Variables
const gameButton = document.querySelector(".new-game");
const info = document.querySelector(".info");
const allCells = document.querySelectorAll(".cell");

// variable unlocked qui a false servira à empêcher de cliquer à nouveau sur les cell à la fin de la partie
let unlocked = true;
let currentPlayer = "X";

info.innerText = `Au tour de ${currentPlayer}`;

// combinaisons gagnantes
const winSolutions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
// Array de chaines de caractères qui vont contenir les strings des combinaisons du jeu en cours
let currentGame = ["", "", "", "", "", "", "", "", ""];
let newGameBool = false;

//---------------------------------------------------
// FONCTIONS

// 1 - gestion du clic sur les cellules
function checkCell(e) {
	const clickedCell = e.target;
	// récupérer l'index de la case on se sert des data-index
	const clickedCellIndex = clickedCell.getAttribute("data-index");

	// on empêche de cliquer sur une case déjà occupée
	if (currentGame[clickedCellIndex] !== "" || !unlocked) {
		return;
	}
	// on remplit notre tableau currentGame
	currentGame[clickedCellIndex] = currentPlayer;
	clickedCell.innerText = currentPlayer;
	//console.log(currentGame);

	checkResults();
}

// 2 - analyse des combinaison et validation des résultats
function checkResults() {
	let endGame = false;
	// on boucle sur le tableau des solutions
	for (let i = 0; i < winSolutions.length; i++) {
		// stocke tour à tour les tableau des 3 index de winSolutions
		let checkWin = winSolutions[i];
		//console.log(checkWin);
		// pour chaque tableau de 3 créé on crée 3 variables qui vont vérifier
		// dans chaque tableau les 3 valeurs stockées
		let a = currentGame[checkWin[0]];
		console.log(currentGame[checkWin[0]]);
		let b = currentGame[checkWin[1]];
		console.log(currentGame[checkWin[1]]);
		let c = currentGame[checkWin[2]];
		console.log(currentGame[checkWin[2]]);

		// ensuite on vérifie si ce sont des X ou des O et s'il y en a 3 alignés
		if (a === "" || b === "" || c === "") {
			continue;
		}
		if (a === b && b === c) {
			endGame = true;
			break;
		}
	}
	// S'il y a victoire
	if (endGame) {
		console.log(endGame);
		unlocked = false;
		newGameBool = true;
		if (newGameBool) {
			gameButton.classList.add("active");
		}
		info.innerText = `Le gagnant est ${currentPlayer} - Cliquer sur le plateau pour démarrer une nouvelle partie`;
	} else {
		// sinon on continue de jouer en changeant le joueur
		// gestion du tour à tour s'applique après la recherche de combi gagnantes
		nextPlayer();
	}
	// gestion du nul quand personne ne gagne et qu'il n'y a plus de case vide
	// si currentGame ne comprend plus de case vide
	let matchNul = !currentGame.includes("");

	if (matchNul && !endGame) {
		endGame = true;
		unlocked = false;
		newGameBool = true;
		if (newGameBool) {
			gameButton.classList.add("active");
		}
		info.innerText = `Egalité - Cliquer sur le bouton pour démarrer une nouvelle partie`;
		return;
	}
}
// 3 - Gestion du changement de joueur
function nextPlayer() {
	// if (currentPlayer === "X") {
	// 	currentPlayer = "O";
	// 	info.innerText = `Au tour de ${currentPlayer}`;
	// } else if (currentPlayer === "O") {
	// 	currentPlayer = "X";
	// 	info.innerText = `Au tour de ${currentPlayer}`;
	// }

	// Alternative : ternaire
	currentPlayer = currentPlayer === "X" ? "O" : "X";
	info.innerText = `Au tour de ${currentPlayer}`;
}

// 4 - relancer une partie
function newGame() {
	location.reload();
}
//---------------------------------------------------
// EVENTS
allCells.forEach((cell) => {
	cell.addEventListener("click", checkCell);
});
gameButton.addEventListener("click", newGame);
