const damageRange = 0.2;
const criticalHit = 0.1;
let logIndex = 0;

const playerData = {
    name: "プレイヤー",
    hp: 100,
    attack: 5,
    defence: 2
}

const enemiesData = [
    {
    name: "敵1",
    hp: 500,
    attack: 3,
    defence: 3
    },
    {
    name: "敵2",
    hp: 200,
    attack: 4,
    defence: 2
    },
    {
    name: "敵3",
    hp: 400,
    attack: 5,
    defence: 3
    }
];

const enemyData = enemiesData[Math.floor(Math.random()*enemiesData.length)];

playerData["maxHp"] = playerData["hp"];
enemyData["maxHp"] = enemyData["hp"];

function damageCalculation(attack, defence) {
    const maxDamage = attack * (1+damageRange);
    const minDamage = attack * (1-damageRange);
    const attackDamage = Math.floor(Math.random() * (maxDamage - minDamage) + minDamage);
    
    const damage = attackDamage - defence;

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
    let victory = false;
    let lose = false;

    const playerName = '<span style = "color: blue;">' +playerData["name"] + "</span>";
    const enemyName = '<span style = "color: red;">'+enemyData["name"] + "</span>";

    //味方の処理
    let playerDamage = damageCalculation(playerData["attack"], enemyData["defence"]);
    if (Math.random() < criticalHit) {
        playerDamage *= 2;
        insertLog(playerName+"の攻撃！クリティカルヒット！" + enemyName+ "に対して" + playerDamage + "のダメージ！");
    } else {
        insertLog(playerName+"の攻撃！" + enemyName + "に対して" + playerDamage + "のダメージ！");
    }

    //敵の処理
    const enemyDamage = damageCalculation(enemyData["attack"], playerData["defence"]);
    playerData["hp"] -= enemyDamage;
    insertText("currentEnemyHp", enemyData["hp"]);
    document.getElementById("currentEnemyHpGaugeValue").style.width = (enemyData["hp"] / enemyData["maxHp"] * 100) + "%"; 
    

    if (!victory) {
        let enemyDamage = damageCalculation(enemyData["attack"], playerData["defence"]);
        if (Math.random() < criticalHit) {
            enemyDamage *= 2;
            insertLog(enemyName+"の攻撃！クリティカルヒット！" + playerName+ "に対して" + enemyDamage + "のダメージ！");
        } else {
            insertLog(enemyName+"の攻撃！" + playerName + "に対して" + enemyDamage + "のダメージ！");
        }
        enemyData["hp"] -= playerDamage;
        insertText("currentPlayerHp", playerData["hp"]);
        document.getElementById("currentPlayerHpGaugeValue").style.width = (playerData["hp"] / playerData["maxHp"]* 100) + "%";
        
        
        if (enemyData["hp"] <= 0){
            alert('勝利');
            victory = true;
            enemyData["hp"] = 0;
            document.getElementById("currentEnemyHpGaugeValue").style.width = "0%";
            insertText("currentEnemyHp", enemyData["hp"]);
        } 
    }


    if (playerData["hp"] <= 0) {
        alert('負け');
        lose = true;
        playerData["hp"] = 0;
        document.getElementById("currentPlayerHpGaugeValue").style.width = "0%";
        insertText("currentPlayerHp", playerData["hp"]);
    } 
    
    if (victory || lose) {
        this.classList.add("deactive");
    }
});