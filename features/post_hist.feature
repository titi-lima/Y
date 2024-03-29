Feature: Histórico de postagens do usuário
    As a usuário logado na rede social
    I want to acessar um histórico de postagens
    So that eu possa acessar postagens antigas

#=============================================================

# Service Scenarios

#-------------------------------------------------------------

## Sucessful Scenarios

Scenario: Buscar postagens de usuário em todas as datas
    Given há no sistema um usuário com '"id": "000"'
    And há no sistema um post com '"id": "aaa", "authorId": "000", "date": "2023-11-20"'
    And há no sistema um post com '"id": "bbb", "authorId": "000", "date": "2023-11-20"'
    And há no sistema um post com '"id": "ccc", "authorId": "000", "date": "2024-02-12"'
    When uma requisição GET for enviada para "/users/000/posts"
    Then o status da resposta deve ser "200"
    And a resposta deve conter a mensagem "Posts found"
    And a resposta deve ser uma lista de "posts"
    And um item com '"id": "aaa"' está na lista
    And um item com '"id": "bbb"' está na lista
    And um item com '"id": "ccc"' está na lista

Scenario: Buscar postagens de usuário em data específica
    Given há no sistema um usuário com '"id": "000"'
    And há no sistema um post com '"id": "aaa", "authorId": "000", "date": "2023-11-20"'
    And há no sistema um post com '"id": "bbb", "authorId": "000", "date": "2023-11-20"'
    And há no sistema um post com '"id": "ccc", "authorId": "000", "date": "2024-02-12"'
    When uma requisição GET for enviada para "/users/000/posts/2023-11-20"
    Then o status da resposta deve ser "200"
    And a resposta deve conter a mensagem "Posts found"
    And a resposta deve ser uma lista de "posts"
    And um item com '"id": "aaa"' está na lista
    And um item com '"id": "bbb"' está na lista
    And um item com '"id": "ccc"' não está na lista

#-------------------------------------------------------------

## Failure Scenarios

Scenario: Buscar postagens de usuário em data inválida
    Given há no sistema um usuário com '"id": "000"'
    When uma requisição GET for enviada para "/users/000/posts/2023-11-40"
    Then o status da resposta deve ser "400"
    And a resposta deve conter a mensagem "Invalid date"


#=============================================================

# GUI Scenarios

#-------------------------------------------------------------

## Sucessful Scenarios

#Scenario: Buscar data escolhendo diretamente cada campo de data
#    Given o usuário "BrenoM" está logado no sistema
#    And ele está na página de "Histórico de Postagens" da sua conta
#    And ele visualiza a postagem “Pergunta” publicada na data “23/11/2023”
#    And ele visualiza a postagem “Viagem” publicada na data “20/11/2023”
#    When ele tenta buscar uma data diretamente
#    And ele seleciona o dia “20”, o mês “11” e o ano “2023”
#    Then na página de "Histórico de Postagens" da sua conta apenas a postagem “Viagem” é mostrada

#-------------------------------------------------------------

## Failure Scenarios

#Scenario: Histórico inacessível a outro usuário
#    Given o usuário "MatheusVD" está logado no sistema
#    And o usuário "MatheusVD" não é seguidor do usuário “FelipeBC”
#    And o usuário "MatheusVD" está visualizando a página “Perfil do usuário” do usuário "FelipeBC"
#    When o usuário "MatheusVD" acessa a página “Histórico de postagens” do usuário "FelipeBC"
#    Then não aparecem postagens de "FelipeBC"
#    And aparece a mensagem “Histórico inacessível: Você ainda não é seguidor de FelipeBC”

