const $hand = document.getElementById("hand")
const $firstCard = $hand.children[0]
const $pile = document.getElementById("pile")

const cards = []
const players = []
players[0] = {}
players[0].hand = []
players[1] = {}
players[1].hand = []
players[2] = {}
players[2].hand = []
players[3] = {}
players[3].hand = []
let turn = 0
let clockwise = true
const pile = []

const colors = ['red',"blue","green","yellow"]

spawnCards()
players.forEach(player => dealCards(player))
placeFirstPileCard()

function takeTurn(event) {    
    if (turn == 0) {
        const turnColor = event.target.style.backgroundColor
        const turnValue = event.target.innerHTML
        const turnID = players[0].hand.findIndex(card => card.value == turnValue && card.color == turnColor)
        const turnCard = players[0].hand.splice(turnID,1)[0]
        console.log(turnCard)
        pile.push(turnCard)
    }
    else {
        const thisHand = players[turn].hand
        const turnCard = thisHand.splice(Math.floor(Math.random()*thisHand.length),1)[0]
        pile.push(turnCard)
    }
    turn++
    if (turn == 4) turn = 0
    showPileTop()
}

$hand.onclick = takeTurn

function showPileTop() {
    const top = pile[pile.length-1]
    const $newCard = document.createElement("div")
    $newCard.classList.add("card")
    $newCard.innerHTML = top.value
    $newCard.style.backgroundColor = top.color
    $pile.innerHTML = ""
    $pile.append($newCard)
}

function spawnCards() {
    for (let i = 0; i <= 9; i++) {
        for (let j = 0; j < 4; j++) {
            let newCard = {
                value: i,
                color: colors[j]
            }
            cards.push(newCard)
        }   
    }
}
console.log(cards)
function dealCards(player) {
    for (let i = 0; i < 7; i++) {
        const whichCard = Math.floor(Math.random()*cards.length)
        const pickedCard = cards.splice(whichCard,1)[0]
        console.log(cards.length)
        player.hand.push(pickedCard)        
        if (players.indexOf(player) == 0)
            placeInHand(pickedCard)
    }
    console.log(player.hand)
}

function placeFirstPileCard() {
    const whichCard = Math.floor(Math.random()*cards.length)
    const pickedCard = cards.splice(whichCard,1)[0]
    pile.push(pickedCard)
}

function placeInHand(pickedCard) {
    const $newCard = document.createElement("div")
    $newCard.classList.add("card")
    $newCard.innerHTML = pickedCard.value
    $newCard.style.backgroundColor = pickedCard.color
    $hand.append($newCard)
}
