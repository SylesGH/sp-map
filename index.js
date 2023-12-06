let debug = false;
const indicator = document.querySelector(".indicator");

function openMenu(el) {
    el.classList.toggle("active");
}

var defaultResolution = [1495, 746]
var userResolution = [window.innerWidth, window.innerHeight]

document.querySelector("h1").innerText = `Your Res: ${userResolution} / Default Res: ${defaultResolution}`

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
    var span = `<span class="pin" style="left: ${cor.x}px; top: ${cor.y}px;"></span>`
    document.querySelector(".container").innerHTML += span
})

// debug
function debugMode() {
    debug = !debug
    if (debug) {
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
            console.log(indicator.clientHeight);
            indicator.style = `left: ${e.clientX + 5}px; top: ${e.clientY - (indicator.clientHeight - 1)}px;`
            indicator.querySelector("#coordinates").innerText = `X ${e.clientX} Y ${e.clientY}`
        })
    }   
}

//temp
console.log(window.innerWidth, window.innerHeight)