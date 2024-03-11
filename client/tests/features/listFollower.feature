Feature: List Follower

    Scenario: listar seguindo
        Given eu estou logado com username "PedroNC" e senha "40028922"
        Given eu estou na aba "Meu perfil"
        Given o usuário "PedroNC" segue o usuário "BrenoM"
        When eu clico no botão de "button[id=\"list-follows-button\"]"
        When eu clico na opção "Seguindo"
        Then eu visualizo o usuário "johndoe"

    Scenario: listar seguidores
        Given eu estou logado com username "PedroNC" e senha "40028922"
        Given eu estou na aba "Meu perfil"
        Given o usuário "BrenoM" segue o usuário "PedroNC"
        When eu clico no botão de "button[id=\"list-follows-button\"]"
        When eu clico na opção "Seguidores"
        Then eu visualizo o usuário "BrenoM"
