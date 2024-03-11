Feature: Comentários em postagens
    As a usuário logado na rede social
    I want to comentar e visualizar comentários em postagens
    So that eu possa interagir com os usuários da rede social

Scenario: Criar comentário
    Given eu estou logado com username "PedroNC" e senha "40028922"
    And   há uma postagem com comentário "Bem vindo!" de "BrenoM" postado em "08/03/2024, 23:00:00"
    When  eu adiciono o comentário "Valeu!" e envio
    Then  aparece o comentário "Valeu!" de "PedroNC" abaixo do comentário "Bem vindo!" de "BrenoM" postado em "08/03/2024, 23:00:00"


