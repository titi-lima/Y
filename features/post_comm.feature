Feature: Comentários em postagens
    As a usuário logado na rede social
    I want to comentar e visualizar comentários em postagens
    So that eu possa interagir com os usuários da rede social

#=============================================================

# Service Scenarios

#-------------------------------------------------------------

## Sucessful Scenarios

Scenario: Criar comentário
    Given há no sistema um usuário com '"id": "111", "nickName": "BrenoM"'
    And há no sistema um post com '"id": "aaa"'
    When uma requisição POST for enviada para "/comments" com o corpo da requisição sendo um JSON com '"postId": "aaa", "authorId": "111", "date": "2024-02-01", "text": "Que legal!"'
    Then o status da resposta deve ser "201"
    And a resposta deve conter a mensagem "Comment created"
    And há no sistema um comentário criado com '"postId": "aaa", "authorId": "111", "date": "2024-02-01", "text": "Que legal!"'

Scenario: Buscar comentários de postagem
    Given há no sistema um post com '"id": "aaa"'
    And há no sistema um comentário com '"id": "AAA", "postId": "aaa"'
    And há no sistema um comentário com '"id": "BBB", "postId": "aaa"'
    When uma requisição GET for enviada para "/posts/aaa/comments"
    Then o status da resposta deve ser "200"
    And a resposta deve conter a mensagem "Comments found"
    And a resposta deve ser uma lista de "comments"
    And um item com '"id": "AAA"' está na lista
    And um item com '"id": "BBB"' está na lista

Scenario: Apagar comentário
    Given há no sistema um comentário com '"id": "AAA"'
    When uma requisição DELETE for enviada para "/comments/AAA"
    Then o status da resposta deve ser "200"
    And a resposta deve conter a mensagem "Comment deleted"
    And não há mais no sistema um comentário com id "AAA"

#-------------------------------------------------------------

## Failure Scenarios

#=============================================================

# GUI Scenarios

#-------------------------------------------------------------

## Sucessful Scenarios

#Scenario: Enviar comentário a uma postagem
#    Given o usuário está logado com o login "BrenoM"
#    And está visualizando a postagem “Bom dia!” do usuário “RuyJG”
#    And o usuário “BrenoM” segue o usuário “RuyJG”
#    When o usuário “BrenoM” tenta adicionar um comentário à postagem “Bom dia!”
#    Then uma caixa de entrada de texto se torna visível
#    When ele escreve "um ótimo dia!" na caixa de texto
#    And envia o comentário
#    Then o comentário "um ótimo dia!" aparece abaixo do último comentário da postagem “Bom dia!”
#    And a caixa de texto não está mais visível

#-------------------------------------------------------------

## Failure Scenarios

#Scenario: Tentativa de enviar um comentário a uma postagem de um usuário do qual não é amigo
#    Given o usuário está logado com o login "BrenoM"
#    And "GuiGeo" não é amigo de “BrenoM”
#    When o usuário “BrenoM” visualiza uma postagem de “GuiGeo”
#    Then não há opção para comentar a postagem


