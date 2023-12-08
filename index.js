const indicator = document.querySelector(".indicator");
const destination = document.querySelector(".destination")
const slots = document.querySelectorAll(".slot")

if (localStorage.getItem("tutorial played")) {
    document.querySelector(".tutorial-card").style.display = "none";
}

var loadingDelay = 2000

var currentPlayerPos = {
    x: 140,
    y: 90,
}

var currentDestination = {
    x: 692,
    y: 493,
}

setTimeout(() => {
    informationToggle(document.querySelector(".information"))
}, loadingDelay + 1000);

function openMenu(el) {
    el.classList.toggle("active");
}

var defaultResolution = [1495, 746]
var userResolution = [window.innerWidth, window.innerHeight]
var resolutionRatio = {
    X: defaultResolution[0] / userResolution[0],
    Y: defaultResolution[1] / userResolution[1],
}

var range = [
    {
        x: 0,
        y: 0,
    },
    {
        x: 0,
        y: 0,
    }
]

function calcRange(obj1, obj2, radius) {
    const distance = Math.sqrt(Math.pow(obj2.x - obj1.x, 2) + Math.pow(obj2.y - obj1.y, 2))
    return distance <= radius
}

function placeDestination(el, saveto) {
    var player = document.querySelector(".player")

    var playerCoord = {
        x: parseInt(player.style.left),
        y: parseInt(player.style.top),
    }

    var steps = Math.floor(((window.innerHeight / 10) + (window.innerWidth / 10)) / 1.8)

    while (calcRange(playerCoord, currentDestination, steps / 2)) {
        userResolution = [window.innerWidth, window.innerHeight]
        var pinProperties = {
            coordX: Math.floor(Math.random() * (userResolution[0] - 100)) + 50,
            coordY: Math.floor(Math.random() * (userResolution[1] - 400)) + 200,
        }

        range[1].x = pinProperties.coordX
        range[1].y = pinProperties.coordY

        el.style = `left: ${pinProperties.coordX}px; top: ${pinProperties.coordY}px;`

        saveto.x = pinProperties.coordX
        saveto.y = pinProperties.coordY
    }

    userResolution = [window.innerWidth, window.innerHeight]
    var pinProperties = {
        coordX: Math.floor(Math.random() * (userResolution[0] - 100)) + 50,
        coordY: Math.floor(Math.random() * (userResolution[1] - 400)) + 200,
    }

    range[1].x = pinProperties.coordX
    range[1].y = pinProperties.coordY

    el.style = `left: ${pinProperties.coordX}px; top: ${pinProperties.coordY}px;`

    saveto.x = pinProperties.coordX
    saveto.y = pinProperties.coordY
}

function setGame() {
    placeDestination(destination, currentPlayerPos)
    placeDestination(destination, currentDestination)
    resetGame()   
}

setGame()

slots.forEach((slot, index) => {
    new MutationObserver(() => {
        updateDataBlocks();
    }).observe(slot, { attributes: true, attributeFilter: ['data-block'] });

    try {
        var moveset = JSON.parse(localStorage.getItem("block moveset"))
    } catch (e) {
        
    }

    setTimeout(() => {
        if (moveset) {
            setBlock(slot)
        }
    }, 1000);

    try {
        slot.setAttribute("data-block", moveset[index])
    } catch (e) {
        slot.setAttribute("data-index", 0)
    }

    slot.addEventListener("click", () => {
        slot.setAttribute("data-index", ((parseInt(slot.getAttribute("data-index")) + 1) % 5))
        setState(slot)
    })
})

function setBlock(el) {
    switch ((el.getAttribute("data-block"))) {
        case "":
            el.classList.remove("full")
            el.setAttribute("data-index", "0")
            break;

        case "up":
            el.classList.add("full")
            el.setAttribute("data-index", "1")
            break;

        case "right":
            el.classList.add("full")
            el.setAttribute("data-index", "2")
            break;

        case "down":
            el.classList.add("full")
            el.setAttribute("data-index", "3")
            break;

        case "left":
            el.classList.add("full")
            el.setAttribute("data-index", "4")
            break;
    
        default:
            break;
    }
}

function setState(el) {
    switch ((parseInt(el.getAttribute("data-index")))) {
        case 0:
            el.classList.remove("full")
            el.setAttribute("data-block", "")
            break;

        case 1:
            el.classList.add("full")
            el.setAttribute("data-block", "up")
            break;

        case 2:
            el.classList.add("full")
            el.setAttribute("data-block", "right")
            break;

        case 3:
            el.classList.add("full")
            el.setAttribute("data-block", "down")
            break;

        case 4:
            el.classList.add("full")
            el.setAttribute("data-block", "left")
            break;
    }
}

// debug
function debugMode() {
    var cityCoordinates = [];

    document.addEventListener("click", (e) => {
        let coordinates = { x: e.clientX, y: e.clientY };
        cityCoordinates.push(coordinates);
    });

    function removeDuplicatesWithinRadius(coordinates) {
        const result = [];

        for (let i = 0; i < coordinates.length; i++) {
            let isDuplicate = false;

            // Check against existing coordinates in the result array
            for (let j = 0; j < result.length; j++) {
                const distance = Math.sqrt(
                    Math.pow(coordinates[i].x - result[j].x, 2) +
                    Math.pow(coordinates[i].y - result[j].y, 2)
                );

                if (distance < 10) {
                    isDuplicate = true;
                    break; // Exit the loop if a duplicate within radius is found
                }
            }

            if (!isDuplicate) {
                result.push(coordinates[i]); // Add non-duplicate coordinates to result
            }
        }

        return result;
    }
    
    document.addEventListener("mousemove", (e) => {
        indicator.style = `left: ${e.clientX + 5}px; top: ${e.clientY - (indicator.clientHeight - 1)}px;`
        indicator.querySelector("#coordinates").innerText = `X ${e.clientX} Y ${e.clientY}`
    })  
    
    document.addEventListener("click", (e) => {
        range[0].x = e.clientX
        range[0].y = e.clientY
    
        if (e.target == document.querySelector("img")) {
            document.querySelector(".player").style = `
            top: ${e.clientY}px;
            left: ${e.clientX}px;
            ` 
            if (calcRange(range[0], range[1], 50)) {
                document.querySelector(".popup").classList.remove("hidden")
            } else {
                document.querySelector(".popup").classList.add("hidden")
            }
        }
    });
}

function resetGame() {
    document.querySelector(".player").style = `top: ${currentPlayerPos.y}px; left: ${currentPlayerPos.x}px`
    destination.style = `top: ${currentDestination.y}px; left: ${currentDestination.x}px`
}

function restartGame() {
    setTimeout(() => {
        placeDestination(destination, currentDestination)
        document.querySelector(".popup").classList.add("hidden")
    }, 100);
}

function animated(el) {
    el.classList.toggle("animate")
    setTimeout(() => {
        el.classList.toggle("animate")
    }, 800);
}

function hideTutorial() {
    document.querySelector(".tutorial-card").style.opacity = 0;
    setTimeout(() => {
        document.querySelector(".tutorial-card").style.display = "none";
    }, 300);
    localStorage.setItem("tutorial played", true)
}

function updateDataBlocks() {
  dataBlocks = [];
  
  slots.forEach(slot => {
    const blockValue = slot.getAttribute('data-block');
    dataBlocks.push(blockValue);
  });

  localStorage.setItem("block moveset", JSON.stringify(dataBlocks))
}

function clearSlots() {
    slots.forEach(slot => {
        slot.setAttribute("data-index", 0)
        slot.setAttribute("data-block", "")
        setState(slot)
    })
}

function playGame(el) {
    const checkSlots = [];

    slots.forEach(slot => {
        checkSlots.push(slot.getAttribute("data-block"));
    });

    if (el.classList.contains("disabled") || checkSlots.every(item => item === "")) {
        return
    }

    el.classList.add("disabled")

    var player = document.querySelector(".player")

    var playerCoord = {
        x: parseInt(player.style.left),
        y: parseInt(player.style.top),
    }

    var playerFrames = []

    var steps = Math.floor(((window.innerHeight / 10) + (window.innerWidth / 10)) / 1.8)

    try {
        var moveset = JSON.parse(localStorage.getItem("block moveset"))

        for (let i = 0; i < moveset.length; i++) {
            if (moveset[i]) {
                switch (moveset[i]) {
                    case "up":
                        playerCoord.y -= steps
                        playerFrames.push({direction: "y", amount: playerCoord.y})
                        break;
    
                    case "right":
                        playerCoord.x += steps
                        playerFrames.push({direction: "x", amount: playerCoord.x})
                        break;
    
                    case "down":
                        playerCoord.y += steps
                        playerFrames.push({direction: "y", amount: playerCoord.y})
                        break;
    
                    case "left":
                        playerCoord.x -= steps
                        playerFrames.push({direction: "x", amount: playerCoord.x})
                        break;
                }
            }
        }
    } catch (e) {
        el.classList.remove("disabled")
        return
    }

    var lastX = parseInt(player.style.left) || 0
    var lastY = parseInt(player.style.top) || 0
    var lastDelay = 0
    var gameState

    for (let i = 0; i < playerFrames.length; i++) {
        lastDelay = i * 1000 + 1000
        setTimeout(() => {
            if (playerFrames[i].direction == "x") {
                lastX = playerFrames[i].amount
            } else {
                lastY = playerFrames[i].amount
            }

            player.style = `top: ${playerFrames[i].direction == "y" ? playerFrames[i].amount : lastY}px; left: ${playerFrames[i].direction == "x" ? playerFrames[i].amount : lastX}px`;

            gameState = calcRange(playerCoord, currentDestination, steps / 2)
            
            if (gameState) {
                setTimeout(() => {
                    document.querySelector(".popup").classList.remove("hidden")
                }, lastDelay + 500);
            }
        }, i * 1000);
    }

    setTimeout(() => {
        el.classList.remove("disabled")
        setTimeout(() => {
            if (!gameState) {
                popupToggle(document.querySelector(".retry"))
            }
        }, 1000);
    }, lastDelay);     
}

function informationToggle(el) {
    setTimeout(() => {
        el.classList.toggle("minimized")
    }, 100);
}

function popupToggle(el) {
    el.classList.toggle("hidden")
}