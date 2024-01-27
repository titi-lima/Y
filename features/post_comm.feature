Feature: Comentários em postagens
    As a usuário logado na rede social
    I want to comentar e visualizar comentários em postagens
    So that eu possa interagir com os usuários da rede social

# GUI Scenarios

## Sucessful Scenarios

Scenario: Enviar comentário a uma postagem
    Given o usuário está logado com o login "BrenoM"
    And está visualizando a postagem “Bom dia!” do usuário “RuyJG”
    And o usuário “BrenoM” segue o usuário “RuyJG”
    When o usuário “BrenoM” tenta adicionar um comentário à postagem “Bom dia!”
    Then uma caixa de entrada de texto se torna visível
    When ele escreve "um ótimo dia!" na caixa de texto
    And envia o comentário
    Then o comentário "um ótimo dia!" aparece abaixo do último comentário da postagem “Bom dia!”
    And a caixa de texto não está mais visível

## Failure Scenarios

Scenario: Tentativa de enviar um comentário a uma postagem de um usuário do qual não é amigo
    Given o usuário está logado com o login "BrenoM"
    And "GuiGeo" não é amigo de “BrenoM”
    When o usuário “BrenoM” visualiza uma postagem de “GuiGeo”
    Then não há opção para comentar a postagem


