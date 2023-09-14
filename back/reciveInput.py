#frontからユーザーの入力を受け取る機能

def get_user_input(request):
    data = request.json
    food = data.get("food")
    genre = data.get("genre")
    return food,genre