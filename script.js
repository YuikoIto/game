const damageRange = 0.2;
let logIndex = 0;

const playerData = {
    name: "プレイヤー",
    hp: 100,
    attack: 5,
    deffence: 2
}

const enemiesData = [
    {
    name: "敵1",
    hp: 500,
    attack: 5,
    deffence: 1
    },
    {
    name: "敵2",
    hp: 200,
    attack: 4,
    deffence: 2
    },
    {
    name: "敵3",
    hp: 400,
    attack: 8,
    deffence: 6
    }
];

const enemyData = enemiesData[Math.floor(Math.random()*enemiesData.length)];

playerData["maxHp"] = playerData["hp"];
enemyData["maxHp"] = enemyData["hp"];

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

function insertLog(texts) {
    const logsElement = document.getElementById("log");
    const createLog = document.createElement("li");
    logIndex++;
    createLog.innerHTML = logIndex+":"+texts;
    logsElement.insertBefore(createLog, logsElement.firstChild)
}

insertText("playerName", playerData["name"]);
insertText("currentPlayerHp", playerData["hp"]);
insertText("maxPlayerHp", playerData["hp"]);
insertText("enemyName", enemyData["name"]);
insertText("currentEnemyHp", enemyData["hp"]);
insertText("maxEnemyHp", enemyData["hp"]);

document.getElementById("attack").addEventListener("click", function(){
    let endGame = false;

    const playerName = '<span style = "color: blue;">' +playerData["name"] + "</span>";
    const enemyName = '<span style = "color: red;">'+enemyData["name"] + "</span>";

    const playerDamage = damageCalculation(playerData["attack"], playerData["deffence"]);
    const enemyDamage = damageCalculation(enemyData["attack"], enemyData["deffence"]);

    enemyData["hp"] -= enemyDamage;
    playerData["hp"] -= playerDamage;
    insertText("currentEnemyHp", enemyData["hp"]);
    insertText("currentPlayerHp", playerData["hp"]);

    document.getElementById("currentEnemyHpGaugeValue").style.width = (enemyData["hp"] / enemyData["maxHp"] * 100) + "%";
    document.getElementById("currentPlayerHpGaugeValue").style.width = (playerData["hp"] / playerData["maxHp"]* 100) + "%";

    insertLog(playerName+"の攻撃！" + enemyName + "に対して" + playerDamage + "のダメージ！")
    insertLog(enemyName+"の攻撃！" + playerName+ "に対して" + enemyDamage + "のダメージ！")

    if (enemyData["hp"] <= 0){
        alert('勝利');
        endGame = true;
        enemyData["hp"] = 0;
        document.getElementById("currentEnemyHpGaugeValue").style.width = "0%";
        insertText("currentEnemyHp", enemyData["hp"]);
    } else if (playerData["hp"] <= 0) {
        alert('負け');
        endGame = true;
        playerData["hp"] = 0;
        document.getElementById("currentPlayerHpGaugeValue").style.width = "0%";
        insertText("currentPlayerHp", playerData["hp"]);
    } 
    if (endGame) {
        this.classList.add("deactive");
    }
});