Feature: alterar perfil
  As a usuário
  I want to modificar minhas informações de perfil (foto, bio, nome do perfil)
  So that meus amigos possam me identificar e meu perfil seja mais minha cara

Scenario: Condicoes Iniciais
  Given o usuário "Breno_Miranda" realizou cadastrou no sistema
  Then o sistema armazena {usuário: "Breno_Miranda" ,foto_de_perfil: "Unknow.png",bio: "",nome_de_perfil: "Breno Miranda" }

Scenario: Modificar foto de perfil
  Given o usuário está logado como "Breno_Miranda"
  And o sistema armazena {usuário: "Breno_Miranda" ,foto_de_perfil: "Breno.png"}
  When o usuário seleciona a opção "Modificar foto_de_perfil"
  And o usuário seleciona o caminho "fotos/gato.png"
  Then o sistema armazena {usuário : "Breno_Miranda" ,foto_de_perfil: "fotos/gato.png"}
  And o sistema retorna uma mensagem de sucesso

Scenario: Modificar bio
  Given o usuário está logado como "Breno_Miranda"
  And o sistema armazena {usuário : "Breno_Miranda" ,bio: "amo dar aulas"}
  When o usuário seleciona a opção "Modificar bio"
  And o usuário insere "amo dar aulas e estudar"
  Then o sistema armazena {usuário : "Breno_Miranda" ,bio: "amo dar aulas e estudar"}
  And o sistema retorna uma mensagem de sucesso

Scenario: Modificar nome de perfil com sucesso
  Given o usuário está logado como "Breno_Miranda"
  And o sistema armazena {usuário : "Breno_Miranda" ,nome_de_perfil: "Breno Miranda"}
  And o sistema armazena {usuário : "Odilon" ,nome_de_perfil: "Odilon de Eletromag"}
  When o usuário seleciona a opção "Modificar nome de perfil"
  And o usuário insere "Breinho de ESS"
  Then o sistema armazena {usuário : "Breno_Miranda" ,bio: "Breninho de ESS"}
  And o sistema retorna uma mensagem de sucesso

Scenario: Modificar nome de perfil sem sucesso
  Given o usuário está logado como "Breno_Miranda"
  And o sistema armazena {usuário : "Breno_Miranda" ,nome_de_perfil: "Breno Miranda"}
  And o sistema armazena {usuário : "Odilon" ,nome_de_perfil: "Odilon de Eletromag"}
  When o usuário seleciona a opção "Modificar nome de perfil"
  And o usuário insere "Odilon de Eletromag"
  Then o sistema armazena {usuário : "Breno_Miranda" ,nome_de_perfil: "Breno Miranda"}
  And o sistema retorna uma mensagem de erro 

