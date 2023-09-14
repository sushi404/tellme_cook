//作成：こんどう、sushi

//input.htmlから入力をサーバーに渡す
function sendData() {
    const food = document.getElementById("food").value;
    const genre = document.getElementById("genre").value;
    const serverURL = "http://127.0.0.1:5000"; // FlaskサーバーのURL

    // サーバーにデータを送信
    fetch(serverURL + "/sendData", {
        method: "POST",
        body: JSON.stringify({ food, genre }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => displayRecipe(data))
    .catch(error => console.error("エラー：", error));
}

