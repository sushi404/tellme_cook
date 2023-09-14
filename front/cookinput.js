//作成：こんどう

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ingredients = materialtextbox;

rl.question("食材を入力（例: にんじん じゃがいも 豚肉）: ", (userIngredients) => {
  ingredients.push(...userIngredients.split(",").map(ingredient => ingredient.trim()));

  if (ingredients.length === 0) {
    console.log("食材が入力されていません。");
    rl.close();
  } else {
    rl.question("希望する味を入力してください（例: 辛い、甘い、しょっぱいなど、未入力の場合はランダムに選択されます）: ", (userFlavor) => {
      const selectedFlavor = genertextbox || ["辛い", "甘い", "しょっぱい", "酸っぱい", "濃い", "淡い"][Math.floor(Math.random() * 6)];

      console.log(`食材: ${ingredients.join(', ')}`);
      console.log(`味: ${selectedFlavor}`);
      console.log("-------------------------------");
      console.log(`${ingredients.join(', ')}を使用した、${selectedFlavor}味の料理の作り方を考えてみましょう。`);

      rl.close();
    });
  }
});

const food = document.getElementById("food").value;
const genre = document.getElementById("genre").value;
