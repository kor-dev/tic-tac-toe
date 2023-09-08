let gc1 = 1;
let gb1 = false;
let gs1 = "";
function say(...params) {
    console.log(params.join(" "));
}
function flag() {
    gb1 = true;
}

let x = document.querySelectorAll("[id^=divid]");
x.forEach(el => {
    document.getElementById(el.id).addEventListener("click", () => {
        let sign = gc1 % 2 == 0 ? "X" : "O"
        if (document.getElementById(el.id).innerHTML == " " && gb1 != true) {
            document.getElementById(el.id).innerHTML = sign;
            gc1++;
            check();
        } else {
            decler_winner(gs1);
        }
    }, false);
});


function load(p1, p2, p3) {
    let col1 = [];
    let regex = new RegExp(p1 + "|" + p2 + "|" + p3, "g");
    x.forEach(z => {
        if (z.id.match(regex)) {
            col1.push(z.id);
        }
    });
    return col1
}

let col1 = load(1, 4, 7);
let col2 = load(2, 5, 8);
let col3 = load(3, 6, 9);

let row1 = load(1, 2, 3);
let row2 = load(4, 5, 6);
let row3 = load(7, 8, 9);

let cros1 = load(1, 5, 9);
let cros2 = load(3, 5, 7);

let matr = [col1, col2, col3, row1, row2, row3, cros1, cros2];

function is_x(params) {
    return document.getElementById(params).innerHTML == "X" ? true : false;
}
function is_o(params) {
    return document.getElementById(params).innerHTML == "O" ? true : false;
}

function arr_equals(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

function check() {
    let c_for = gc1 % 2 == 1 ? is_x : is_o;
    let winner_name = gc1 % 2 == 1 ? "X" : "O";
    let ar2 = [];                                                               //empty array
    let cond = [true, true, true];                                              //end condition
    for (let ind = 0; ind < matr.length; ind++) {                               //checking for every posiable sitiation in big array
        matr[ind].forEach(z => {                                                //every element of array is itself an array call sa
            if (c_for(z)) {                                                     //checking sa if it contains X
                ar2.push(true);                                                 //if it does add it to ar2 as true
            } else {                                                            //else
                ar2.push(false);                                                //add false
            }
        });
        if (arr_equals(ar2, cond)) {                                            //check if arr2 is same as condition
            gs1 = winner_name;
            say("GAME over !!!", winner_name, " wins", ind);                    //message
            decler_winner(gs1);
            flag();
            break;                                                              //out of loop, no need to keep going
        }
        ar2 = [];                                                               //reset the ar2 for next iteration
    }
}

function decler_winner(winner_name) {
    document.getElementById("mess-p").innerHTML = "Winner is - " + winner_name;
    let win = document.getElementById("message");
    win.style.display = "block"
}
document.getElementById("close").addEventListener("click", () => {
    document.getElementById("message").style.display = "none"
});

function reset_g() {
    gc1 = 1;
    gb1 = false
    gs1 = "";
    document.querySelectorAll("[id^=divid]").forEach(f => {
        f.innerHTML = " ";
    })
}
document.getElementById("rst").addEventListener("click", reset_g, false);

//document.getElementById("bt2").addEventListener("click", () => { window.location.reload() })