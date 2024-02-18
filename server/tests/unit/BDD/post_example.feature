Feature: Posts

Scenario: Criar um post
    Given há no sistema um usuário com '"id": "000"'
    When uma requisição POST for enviada para "/posts" com o corpo da requisição sendo um JSON com '"authorId": "000", "date": "2024-02-01", "text": "Meu primeiro post!"'
    Then o status da resposta deve ser "201"
    And a resposta deve conter a mensagem "Post created"

Scenario: Falha ao criar post
    Given não há no sistema um usuário com id "000"
    When uma requisição POST for enviada para "/posts" com o corpo da requisição sendo um JSON com '"authorId": "000", "date": "2024-02-01", "text": "Meu primeiro post!"'
    Then o status da resposta deve ser "400"
    And a resposta deve conter a mensagem "Author not found"