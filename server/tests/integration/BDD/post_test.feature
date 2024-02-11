Feature: Posts

Scenario: Criar um post
    Given o usuário de nickname "RuyJG" está no sistema
    When uma requisição POST for enviada para "/posts" com o corpo da requisição sendo um JSON com '"author": "RuyJG", "date": "2024-02-01", "text": "Meu primeiro post!"'
    Then o status da resposta deve ser "201"
    And o JSON da resposta deve conter a mensagem "Post created"

Scenario: Falha ao criar post
    Given o usuário de nickname "RuyJG" não está no sistema
    When uma requisição POST for enviada para "/posts" com o corpo da requisição sendo um JSON com '"author": "RuyJG", "date": "2024-02-01", "text": "Meu primeiro post!"'
    Then o status da resposta deve ser "400"
    And o JSON da resposta deve conter a mensagem "Author not found"