Feature: Follower System
    As a user
    I want to be able to follow someone
    
    Scenario: Começar a seguir um usuário
        Given há no sistema um usuário com '"id": "111", "nickName": "BrenoM"'
        And há no sistema um usuário com '"id": "222", "nickName": "Ruy"'
        When uma requisição POST for enviada para "/users//111/insertFollows" com o corpo da requisição sendo um JSON com '"followsId": "222"'
        Then o status da resposta deve ser "200"
        Then a resposta deve conter a mensagem "User insert follows"
        # Given o usuário "Breno" está no perfil do usuário "Odilon"
        # And o usuário "Breno" não segue "Odilon" 
        # And as publicações do usuário “Odilon“ estão indisponíveis para o usuário “Breno“
        # When o usuário “Breno" seleciona o campo "Começar a seguir usuário"
        # Then  o usuário “Breno" começou a seguir o usuário "Odilon"
        # And as publicações do usuário “Odilon“ passaram a ficar disponíveis para o usuário “Breno“

    # Scenario: Deixar de seguir um usuário
    #     Given há no sistema um usuário com '"id": "111", "nickName": "BrenoM"'
    #     And há no sistema um usuário com '"id": "222", "nickName": "Ruy"'
    #     And o usuário com id '111' segue o usuário '222'
    #     When o usuario com id '111' envia uma requisição POST para remover um usuario "/111/insertFollows"
    #     Then o status da resposta deve ser "200"
    #     # Given o usuário "Breno" está no perfil do usuário "Odilon"
    #     # And o usuário "Breno" já segue "Odilon"
    #     # And as publicações do usuário “Odilon“ estão disponíveis para o usuário “Breno“
    #     # When "Breno" seleciona o campo "Parar de seguir usuário"
    #     # Then  o usuário “Breno" parou de seguir o usuário "Odilon"
    #     # And as publicações do usuário “Odilon“ passaram a ficar indisponíveis para o usuário “Breno“, aparecendo uma mensagem de “Publicações indisponíveis“
