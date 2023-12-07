const indicator = document.querySelector(".indicator");
const destination = document.querySelector(".destination")
const slots = document.querySelectorAll(".slot")

if (localStorage.getItem("tutorial played")) {
    document.querySelector(".tutorial-card").style.display = "none";
}

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

function placeDestination(el) {
    userResolution = [window.innerWidth, window.innerHeight]
    var pinProperties = {
        coordX: Math.floor(Math.random() * (userResolution[0] - 100)) + 50,
        coordY: Math.floor(Math.random() * (userResolution[1] - 400)) + 200,
    }

    range[1].x = pinProperties.coordX
    range[1].y = pinProperties.coordY
    
    el.style = `left: ${pinProperties.coordX}px; top: ${pinProperties.coordY}px;`
}

placeDestination(destination)

slots.forEach((slot, index) => {
    new MutationObserver(() => {
        updateDataBlocks();
    }).observe(slot, { attributes: true, attributeFilter: ['data-block'] });

    var moveset = JSON.parse(localStorage.getItem("block moveset"))

    setTimeout(() => {
        if (moveset) {
            setBlock(slot)
        }
    }, 1000);

    slot.setAttribute("data-block", moveset[index]) || slot.setAttribute("data-index", 0)

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

/* TODO: NEED A FIX 

var coordinates = [
    {
        "x": 83,
        "y": 94
    },
    {
        "x": 131,
        "y": 92
    },
    {
        "x": 147,
        "y": 165
    },
    {
        "x": 255,
        "y": 169
    },
    {
        "x": 266,
        "y": 172
    },
    {
        "x": 328,
        "y": 196
    },
    {
        "x": 363,
        "y": 197
    },
    {
        "x": 419,
        "y": 197
    },
    {
        "x": 470,
        "y": 153
    },
    {
        "x": 519,
        "y": 125
    },
    {
        "x": 530,
        "y": 162
    },
    {
        "x": 618,
        "y": 143
    },
    {
        "x": 703,
        "y": 131
    },
    {
        "x": 261,
        "y": 253
    },
    {
        "x": 279,
        "y": 209
    },
    {
        "x": 167,
        "y": 300
    },
    {
        "x": 63,
        "y": 243
    },
    {
        "x": 126,
        "y": 398
    },
    {
        "x": 106,
        "y": 416
    },
    {
        "x": 153,
        "y": 476
    },
    {
        "x": 189,
        "y": 542
    },
    {
        "x": 249,
        "y": 490
    },
    {
        "x": 342,
        "y": 500
    },
    {
        "x": 279,
        "y": 402
    },
    {
        "x": 324,
        "y": 330
    },
    {
        "x": 367,
        "y": 398
    },
    {
        "x": 363,
        "y": 496
    },
    {
        "x": 374,
        "y": 583
    },
    {
        "x": 572,
        "y": 559
    },
    {
        "x": 516,
        "y": 490
    },
    {
        "x": 547,
        "y": 285
    },
    {
        "x": 368,
        "y": 297
    },
    {
        "x": 596,
        "y": 297
    },
    {
        "x": 647,
        "y": 366
    },
    {
        "x": 633,
        "y": 441
    },
    {
        "x": 688,
        "y": 481
    },
    {
        "x": 688,
        "y": 419
    },
    {
        "x": 685,
        "y": 593
    },
    {
        "x": 739,
        "y": 578
    },
    {
        "x": 808,
        "y": 655
    },
    {
        "x": 811,
        "y": 569
    },
    {
        "x": 882,
        "y": 601
    },
    {
        "x": 902,
        "y": 566
    },
    {
        "x": 864,
        "y": 516
    },
    {
        "x": 748,
        "y": 405
    },
    {
        "x": 695,
        "y": 299
    },
    {
        "x": 706,
        "y": 224
    },
    {
        "x": 773,
        "y": 217
    },
    {
        "x": 605,
        "y": 222
    },
    {
        "x": 455,
        "y": 205
    },
    {
        "x": 828,
        "y": 251
    },
    {
        "x": 926,
        "y": 178
    },
    {
        "x": 863,
        "y": 301
    },
    {
        "x": 1015,
        "y": 552
    },
    {
        "x": 971,
        "y": 494
    },
    {
        "x": 970,
        "y": 438
    },
    {
        "x": 964,
        "y": 184
    },
    {
        "x": 1045,
        "y": 223
    },
    {
        "x": 1061,
        "y": 173
    },
    {
        "x": 1106,
        "y": 242
    },
    {
        "x": 1123,
        "y": 165
    },
    {
        "x": 1218,
        "y": 139
    },
    {
        "x": 1283,
        "y": 142
    },
    {
        "x": 1317,
        "y": 190
    },
    {
        "x": 1398,
        "y": 246
    },
    {
        "x": 1324,
        "y": 273
    },
    {
        "x": 1362,
        "y": 393
    },
    {
        "x": 1399,
        "y": 480
    },
    {
        "x": 1298,
        "y": 494
    },
    {
        "x": 1265,
        "y": 411
    },
    {
        "x": 1253,
        "y": 458
    },
    {
        "x": 1215,
        "y": 383
    },
    {
        "x": 1135,
        "y": 374
    },
    {
        "x": 1190,
        "y": 469
    },
    {
        "x": 1164,
        "y": 526
    },
    {
        "x": 1119,
        "y": 469
    },
    {
        "x": 1064,
        "y": 354
    },
    {
        "x": 1055,
        "y": 293
    },
    {
        "x": 1037,
        "y": 400
    },
    {
        "x": 805,
        "y": 153
    },
    {
        "x": 1184,
        "y": 266
    },
    {
        "x": 330,
        "y": 259
    }
]

coordinates.forEach(cor => {
    var span = `<span class="pin" style="left: ${cor.x * resolutionRatio.X}px; top: ${(cor.y * resolutionRatio.Y) + ((window.innerHeight - document.querySelector(".container img").clientHeight) / 2 )}px;"></span>`
    document.querySelector(".container").innerHTML += span
}) */

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
}

function restartGame() {
    setTimeout(() => {
        placeDestination(destination)
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

document.addEventListener("click", (e) => {
    range[0].x = e.clientX
    range[0].y = e.clientY

    if (e.target == document.querySelector("img")) {
        document.querySelector(".player").style = `
            top: ${e.clientY}px;
            left: ${e.clientX}px;
        ` 
        if (calcRange(range[0], range[1], 20)) {
            document.querySelector(".popup").classList.remove("hidden")
        } else {
            document.querySelector(".popup").classList.add("hidden")
        }
    }
});

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

function playGame() {
    var player = document.querySelector(".player")

    var playerCoord = {
        x: parseInt(player.style.left),
        y: parseInt(player.style.top),
    }

    var playerFrames = []

    var steps = 50

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

    var lastX = 0
    var lastY = 0

    for (let i = 0; i < playerFrames.length; i++) {
        console.log(playerFrames[i])
        if (playerFrames[i].direction == "x") {
            lastX = playerFrames[i].amount
        } else {
            lastY = playerFrames[i].amount
        }

        setTimeout(() => {
            player.style = `top: ${playerFrames[i].direction == "y" ? playerFrames[i].amount : lastY}px; left: ${playerFrames[i].direction == "x" ? playerFrames[i].amount : lastX}px`;
        }, i * 1000);
    }
    
}