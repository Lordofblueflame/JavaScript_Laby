const add = document.querySelector("#add");
const remove = document.querySelector("#remove");
let p1 = document.querySelectorAll(".pool")


add.addEventListener('click', addPool)
p1.forEach(e => e.addEventListener('keyup', count, ))
remove.addEventListener('click', removePool)
let countOfPools = p1.length

function count() {

    const pools = [...document.querySelectorAll(".pool")].map(e => parseInt(e.value));
    const minPool = document.querySelector('#min');
    const maxPool = document.querySelector("#max");
    const sumPool = document.querySelector('#sum');
    const meanPool = document.querySelector('#mean');

    minPool.textContent = Math.min(...pools);
    maxPool.textContent = Math.max(...pools);
    let sum = 0;
    for (let i in pools) {
        sum += pools[i];
    }
    sumPool.textContent = sum;
    meanPool.textContent = sum / countOfPools
}

function addPool() {
    countOfPools++
    const input = document.createElement("input")
    input.type = "text"
    input.setAttribute("id", "pool" + countOfPools)
    input.className = "pool"
    const pools = document.querySelector(".pools")
    pools.appendChild(input)
    pools.appendChild(document.createElement("div"))
    p1 = document.querySelectorAll(".pool")
    p1.forEach(e => e.addEventListener('keyup', count, ))
}

function removePool() {
    document.getElementById("pool" + countOfPools).remove()
    countOfPools--
    const pools = document.querySelector(".pools")
}