import openai
import json

def get_recipe(food,genre):
  
  # APIキーを設定
  api_key = "hogehoge" #ここにキーを入力
  openai.api_key = api_key

  asks = """
  あなたは伝えられた食材とジャンルから何か献立をひとつ、提案するAIです。必要な情報はレシピ名 材料 分量 作り方を表示してください。
  また、括弧などの記号は不要です
  出力形式は

  レシピ名: (レシピ名)

  材料 : 分量

  作り方:
  """

  # chatGPTに質問を投げる
  response = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=[
          # chatGPTの役割を決める
          {"role": "system", "content": asks},

          # 実際に質問を投げる
          {"role": "user", "content": f"{food} , {genre}"},
      ],
  )

  # ChatGPTの応答を取得
  message = response["choices"][0]["message"]["content"]  # JSONデータのcontentフィールドを取得

  #chatGPTの応答を表示
  print(message)
  print("\n")

  # メッセージを正規表現で抽出
  import re
  match = re.match(r'レシピ名: (.*?)\n\n材料:\n(.*?)\n\n作り方:\n(.*)', message, re.DOTALL)
  recipe_name = match.group(1)
  ingredients_text = match.group(2)
  recipe_steps_text = match.group(3)

  # 材料を辞書に整形
  ingredients = {}
  ingredient_lines = ingredients_text.split("\n")
  for line in ingredient_lines:
      parts = line.split(":")
      if len(parts) == 2:
          ingredient_name = parts[0].strip()
          ingredient_quantity = parts[1].strip()
          ingredients[ingredient_name] = ingredient_quantity

  # 作り方をリストに整形
  recipe_steps = recipe_steps_text.split("\n")

  # 現在のレシピ情報を読み込み
  recipes = []
  try:
      with open("recipe.json", "r", encoding="utf-8") as json_file:
          recipes = json.load(json_file)
  except FileNotFoundError:
      pass

  # 新しいレシピ情報を追加
  new_recipe = {
      "recipe_name": recipe_name,
      "foods": ingredients,
      "steps": recipe_steps
  }
  recipes.append(new_recipe)

  # JSONデータをファイルに保存
  with open("recipe.json", "w", encoding="utf-8") as json_file:
      json.dump(recipes, json_file, ensure_ascii=False, indent=2)

  # 新しいレシピ情報を表示
  print("新しいレシピ情報を保存しました:")
  print(json.dumps(new_recipe, ensure_ascii=False, indent=2))