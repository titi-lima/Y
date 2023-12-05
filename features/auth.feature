SCENARIO: login de um usuário na plataforma
	GIVEN estou na tela de login
	WHEN preencho os campos email com “gpms@cin.ufpe.br”, senha com “123456”
  AND tento fazer login
	THEN sou redirecionado para a tela do feed

SCENARIO: logout de um usuário na plataforma
  GIVEN estou na tela do feed
  WHEN tento fazer logout
  THEN sou redirecionado para a tela de login

SCENARIO: login de um usuário na plataforma sem senha
  GIVEN estou na tela de login
  WHEN preencho os campos email com “gpms@cin.ufpe.br”, senha com ""
  AND tento fazer login
  THEN vejo uma mensagem de erro
  AND continuo na tela de login

SCENARIO: login de um usuário na plataforma sem email
  GIVEN estou na tela de login
  WHEN preencho os campos email com "", senha com “123456”
  AND tento fazer login
  THEN vejo uma mensagem de erro
  AND continuo na tela de login