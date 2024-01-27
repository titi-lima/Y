Feature: Histórico de postagens do usuário
    As a usuário logado na rede social
    I want to acessar um histórico de postagens
    So that eu possa acessar postagens antigas

# GUI Scenarios

## Sucessful Scenarios

Scenario: Buscar data escolhendo diretamente cada campo de data
    Given o usuário "BrenoM" está logado no sistema
    And ele está na página de "Histórico de Postagens" da sua conta
    And ele visualiza a postagem “Pergunta” publicada na data “23/11/2023”
    And ele visualiza a postagem “Viagem” publicada na data “20/11/2023”
    When ele tenta buscar uma data diretamente
    And ele seleciona o dia “20”, o mês “11” e o ano “2023”
    Then na página de "Histórico de Postagens" da sua conta apenas a postagem “Viagem” é mostrada

## Failure Scenarios

Scenario: Histórico inacessível a outro usuário
    Given o usuário "MatheusVD" está logado no sistema
    And o usuário "MatheusVD" não é seguidor do usuário “FelipeBC”
    And o usuário "MatheusVD" está visualizando a página “Perfil do usuário” do usuário "FelipeBC"
    When o usuário "MatheusVD" acessa a página “Histórico de postagens” do usuário "FelipeBC"
    Then não aparecem postagens de "FelipeBC"
    And aparece a mensagem “Histórico inacessível: Você ainda não é seguidor de FelipeBC”

