Feature: Follower System
    As a user
    I want to be able to follow someone
    
    Scenario: Começar a seguir um usuário
        Given há no sistema um usuário com '"id": "111", "nickName": "BrenoM"'
        And há no sistema um usuário com '"id": "222", "nickName": "Ruy"'
        When uma requisição POST for enviada para "/users/111/follows" com o corpo da requisição sendo um JSON com '"followsId": "222"'
        Then o status da resposta deve ser "200"
        Then a resposta deve conter a mensagem "User insert follows"

    Scenario: Deixar de seguir um usuário
        Given há no sistema um usuário com '"id": "111", "nickName": "BrenoM"'
        And há no sistema um usuário com '"id": "222", "nickName": "Ruy"'
        And o usuário com id '111' segue o usuário '222'
        When uma requisição DELETE for enviada para "/users/111/follows" com o corpo da requisição sendo um JSON com '"removeFollowsId": "222"'
        Then o status da resposta deve ser "200"
        Then a resposta deve conter a mensagem "Remove follows"
