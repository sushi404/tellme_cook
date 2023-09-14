//作成：yosh1y
function initializeJsonFileInput() {
    const inputFile = document.getElementById('inputFile');
    const confirmationMessage = document.getElementById('confirmationMessage');

    // JSONデータを読み込む処理
    inputFile.addEventListener('change', function (event) {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            readJsonFile(selectedFile);
        } else {
            confirmationMessage.textContent = 'ファイルが選択されていません。';
        }
    });

    function readJsonFile(file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const jsonText = e.target.result;

            try {
                const jsonData = JSON.parse(jsonText);
                processJsonData(jsonData);
            } catch (error) {
                console.error('JSONの解析エラー:', error);
            }
        };

        reader.readAsText(file);
    }

    function processJsonData(data) {
        const recipeNameElement = document.getElementById('recipe-name');
        const foodsListElement = document.getElementById('foods-list');
        const stepsListElement = document.getElementById('steps-list');

        // レシピ名を表示
        recipeNameElement.textContent = data[0].recipe_name;

        // 食材をチェックリスト形式で表示
        displayFoodsAsChecklist(data[0].foods, foodsListElement);

        // 手順をリスト表示
        for (const step of data[0].steps) {
            const listItem = document.createElement('div'); // リストアイテムを<div>で表示
            listItem.textContent = step;
            stepsListElement.appendChild(listItem);
        }

        // 確認メッセージを表示
        confirmationMessage.textContent = 'JSONデータを読み込みました。';
    }

    function displayFoodsAsChecklist(foods, containerElement) {
        for (const foodName in foods) {
            if (foods.hasOwnProperty(foodName)) {
                const listItem = document.createElement('li');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = foodName;
                listItem.appendChild(checkbox);

                const label = document.createElement('label');
                label.textContent = `${foodName} - ${foods[foodName]}`;
                listItem.appendChild(label);

                containerElement.appendChild(listItem);
            }
        }
    }
}

// ページ読み込み時に初期化
window.onload = initializeJsonFileInput;