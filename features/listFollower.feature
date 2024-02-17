Feature: List Follower 
    As a user
    I want to be able to list my follower
    
    Scenario: Lista de seguindo
        Given há no sistema um usuário com '"id": "111", "nickName": "BrenoM"'
        And há no sistema um usuário com '"id": "222", "nickName": "Ruy"'
        And há no sistema um usuário com '"id": "333", "nickName": "Odilon"'
        And o usuário com id '111' segue o usuário '222'
        And o usuário com id '111' segue o usuário '333'
        When o usuario com id '111' envia uma requisição GET para "/users/111/follows"
        Then o status da resposta deve ser 200
        And a resposta deve conter um array com apenas o nome "Ruy" e "Odilon"

    Scenario: Lista de seguidores
        Given há no sistema um usuário com '"id": "111", "nickName": "BrenoM"'
        And há no sistema um usuário com '"id": "222", "nickName": "Ruy"'
        And há no sistema um usuário com '"id": "333", "nickName": "Odilon"'
        And o usuário com id '222' segue o usuário '111'
        And o usuário com id '333' segue o usuário '111'
        When o usuario com id '111' envia uma requisição GET para "/users/111/followers"
        Then o status da resposta deve ser 200
        And a resposta deve conter um array com apenas os nomes de "Ruy" e "Odilon"

    Scenario: Buscar na lista de seguindo
        Given há no sistema um usuário com '"id": "111", "nickName": "BrenoM"'
        And há no sistema um usuário com '"id": "222", "nickName": "Ruy"'
        And há no sistema um usuário com '"id": "333", "nickName": "Odilon"'
        And o usuário com id '111' segue o usuário '222'
        And o usuário com id '111' segue o usuário '333'
        When o usuario com id '111' envia uma requisição GET para "/users/111/findFilterFollows/Ru"
        Then o status da resposta deve ser 200
        And a resposta deve conter um array com apenas o nome de "Ruy" 

    Scenario: Buscar na lista de seguidores
        Given há no sistema um usuário com '"id": "111", "nickName": "BrenoM"'
        And há no sistema um usuário com '"id": "222", "nickName": "Ruy"'
        And há no sistema um usuário com '"id": "333", "nickName": "Odilon"'
        And o usuário com id '222' segue o usuário '111'
        And o usuário com id '333' segue o usuário '111'
        When o usuario com id '111' envia uma requisição GET para "/users/111/findFilterFollows/Ru"
        Then o status da resposta deve ser 200
        And a resposta deve conter um array com apenas o nome de "Ruy" 
