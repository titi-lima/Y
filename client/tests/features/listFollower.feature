Feature: List Follower

    Scenario: listar seguindo
        Given eu estou logado com username "PedroNC" e senha "40028922"
        Given eu estou na aba "Meu perfil"
        # Given dado que "PedroNC" segue o usuário "BrenoM"
        # Given dado que "PedroNC" segue o usuário "jhondoe"
        When eu clico no botão de aaa
        When eu clico na opção "Seguindo"
        Then eu visualizo o usuário "BrenoM"
        Then eu visualizo o usuário "johndoe"

    Scenario: listar seguidores
        Given eu estou logado com username "PedroNC" e senha "40028922"
        Given eu estou na aba "Meu perfil"
        # Given dado que "BrenoM" segue o usuário "PredroNC"
        When eu clico no botão de "3 Seguidos 1 Seguidores 2"
        When eu clico na opção "Seguidores"
        Then eu visualizo o usuário "BrenoM"
