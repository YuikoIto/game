const playerData = {
    name: "プレイヤー",
    hp: 100
}

const enemyData = {
    name: "敵",
    hp: 500
}

function insertText(id, text) {
    document.getElementById(id).textContent = text;
}

insertText("playerName", playerData["name"]);
insertText("currentPlayerHp", playerData["hp"]);
insertText("maxPlayerHp", playerData["hp"]);
insertText("enemyName", enemyData["name"]);
insertText("currentEnemyHp", enemyData["hp"]);
insertText("maxEnemyHp", enemyData["hp"]);