const damageRange = 0.2;

const playerData = {
    name: "プレイヤー",
    hp: 100,
    attack: 5,
    deffence: 2
}

const enemyData = {
    name: "敵",
    hp: 500,
    attack: 4,
    deffence: 1
}

function damageCalculation(attack, deffence) {
    const maxDamage = attack * (1+damageRange);
    const minDamage = attack * (1-damageRange);
    const attackDamage = Math.floor(Math.random() * (maxDamage - minDamage) + minDamage);
    
    const damage = attackDamage - deffence;

    if (damage < 1) {
        return 0;
    } else {
        return damage;
    }
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

document.getElementById("attack").addEventListener("click", function(){
    let endGame = false;

    const playerDamage = damageCalculation(playerData["attack"], enemyData["deffence"]);
    const enemyDamage = damageCalculation(enemyData["attack"], enemyData["deffence"]);

    enemyData["hp"] -= enemyDamage;
    playerData["hp"] -= playerDamage;
    insertText("currentEnemyHp", enemyData["hp"]);
    insertText("currentPlayerHp", playerData["hp"]);

    if (enemyData["hp"] <= 0){
        alert('勝利');
        endGame = true;
        enemyData["hp"] = 0;
        insertText("currentEnemyHp", enemyData["hp"]);
    } else if (playerData["hp"] <= 0) {
        alert('負け');
        endGame = true;
        playerData["hp"] = 0;
        insertText("currentPlayerHp", playerData["hp"]);
    } 
    if (endGame) {
        this.classList.add("deactive");
    }
});