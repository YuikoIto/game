const playerData = {
    name: "プレイヤー",
    hp: 100
}

const enemyData = {
    name: "敵",
    hp: 500
}


document.getElementById("playerName").textContent = playerData["name"];
document.getElementById("currentPlayerHp").textContent = playerData["hp"];
document.getElementById("maxPlayerHp").textContent = playerData["hp"];

document.getElementById("enemyName").textContent = enemyData["name"];
document.getElementById("currentEnemyHp").textContent = playerData["hp"];
document.getElementById("maxEnemyHp").textContent = playerData["hp"];