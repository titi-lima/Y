SCENARIO: cadastro de um novo usuário na plataforma
	GIVEN estou na tela de cadastro de usuário
	WHEN preencho os campos email com “gpms@cin.ufpe.br”, senha com “123456”, nome com “Guilherme da Matta” e idade com “21”
	AND tento salvar
	THEN vejo uma mensagem de sucesso
	AND sou redirecionado para a tela de login

SCENARIO: atualização dos dados de um usuário na plataforma
	GIVEN estou logado na plataforma com o email com “gpms@cin.ufpe.br” e senha com “123456”
	AND estou na tela de editar perfil
	WHEN preencho o campo bio com “Eu sou o Guilherme”
	AND tento salvar
	THEN vejo uma mensagem de sucesso
	AND sou redirecionado para a tela de perfil
	AND vejo a bio “Eu sou Guilherme”

SCENARIO: deleção dos dados de um usuário na plataforma
	GIVEN estou logado na plataforma com o email com “gpms@cin.ufpe.br” e senha com “123456”
	AND estou na tela de configurações
	WHEN tento deletar a conta
	THEN vejo uma mensagem de sucesso
	AND sou redirecionado para a tela de login

SCENARIO: cadastro de um novo usuário na plataforma sem sucesso
  GIVEN estou na tela de cadastro de usuário
	WHEN preencho os campos email com “gpms@cin.ufpe.br”, senha com “123456”, nome com “Guilherme da Matta” e idade com ""
  AND tento salvar
  THEN vejo uma mensagem de erro
  AND continuo na tela de cadastro de usuário

SCENARIO: atualização dos dados de um usuário na plataforma sem sucesso
	GIVEN estou logado na plataforma com o email com “gpms@cin.ufpe.br” e senha com “123456”
  AND estou na tela de editar perfil
  WHEN preencho o campo nome com “”
  AND tento salvar
  THEN vejo uma mensagem de erro
  AND continuo na tela de editar perfil
