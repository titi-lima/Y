Feature: List Follower 
    As a user
    I want to be able to list my follower
    
    Scenario: Lista de seguindo
        Given há no sistema um usuário com '"id": "111", "nickName": "BrenoM"'
        And há no sistema um usuário com '"id": "222", "nickName": "Ruy"'
        And há no sistema um usuário com '"id": "333", "nickName": "Odilon"'
        And o usuário com id '111' segue o usuário '222'
        And o usuário com id '111' segue o usuário '333'
        When uma requisição GET for enviada para "/users/111/follows"
        Then o status da resposta deve ser "200"
        And a requisição deve retornar um array '[{"id":"222", "name":"Test Name", "nickName":"Ruy"}, {"id":"333", "name":"Test Name", "nickName":"Odilon"}]'

    Scenario: Lista de seguidores
        Given há no sistema um usuário com '"id": "111", "nickName": "BrenoM"'
        And há no sistema um usuário com '"id": "222", "nickName": "Ruy"'
        And há no sistema um usuário com '"id": "333", "nickName": "Odilon"'
        And o usuário com id '222' segue o usuário '111'
        And o usuário com id '333' segue o usuário '111'
        When uma requisição GET for enviada para "/users/111/followers"
        Then o status da resposta deve ser "200"
        And a requisição deve retornar um array '[{"id":"222", "name":"Test Name", "nickName":"Ruy"}, {"id":"333", "name":"Test Name", "nickName":"Odilon"}]'

    Scenario: Buscar na lista de seguindo
        Given há no sistema um usuário com '"id": "111", "nickName": "BrenoM"'
        And há no sistema um usuário com '"id": "222", "nickName": "Ruy"'
        And há no sistema um usuário com '"id": "333", "nickName": "Odilon"'
        And o usuário com id '111' segue o usuário '222'
        And o usuário com id '111' segue o usuário '333'
        When uma requisição GET for enviada para "/users/111/findFilterFollows/Ru"
        Then o status da resposta deve ser "200"
        And a requisição deve retornar um array '[{"id":"222", "name":"Test Name", "nickName":"Ruy"}]'

    Scenario: Buscar na lista de seguidores
        Given há no sistema um usuário com '"id": "111", "nickName": "BrenoM"'
        And há no sistema um usuário com '"id": "222", "nickName": "Ruy"'
        And há no sistema um usuário com '"id": "333", "nickName": "Odilon"'
        And o usuário com id '222' segue o usuário '111'
        And o usuário com id '333' segue o usuário '111'
        When uma requisição GET for enviada para "/users/111/findFilterFollowers/Ru"
        Then o status da resposta deve ser "200"
        And a requisição deve retornar um array '[{"id":"222", "name":"Test Name", "nickName":"Ruy"}]'