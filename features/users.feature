Feature: Users Feature
	As a user
	I want to be able to create, update and delete my account
	So that I can use the platform

	Scenario: cadastro de um novo usuário na plataforma
		Given estou na tela de cadastro de usuário
		When preencho os campos email com 'gpms@cin.ufpe.br', senha com '123456', nome com 'Guilherme da Matta' e idade com '21'
		And tento salvar
		Then vejo uma mensagem de sucesso
		And sou redirecionado para a tela de login

	Scenario: atualização dos dados de um usuário na plataforma
		Given estou logado na plataforma com o email com 'gpms@cin.ufpe.br' e senha com '123456'
		And estou na tela de editar perfil
		When preencho o campo bio com 'Eu sou o Guilherme'
		And tento salvar
		Then vejo uma mensagem de sucesso
		And sou redirecionado para a tela de perfil
		And vejo a bio 'Eu sou Guilherme'

	Scenario: deleção dos dados de um usuário na plataforma
		Given estou logado na plataforma com o email com 'gpms@cin.ufpe.br' e senha com '123456'
		And estou na tela de configurações
		When tento deletar a conta
		Then vejo uma mensagem de sucesso
		And sou redirecionado para a tela de login

	Scenario: cadastro de um novo usuário na plataforma sem sucesso
		Given estou na tela de cadastro de usuário
		When preencho os campos email com 'gpms@cin.ufpe.br', senha com '123456', nome com 'Guilherme da Matta' e idade com ''
		And tento salvar
		Then vejo uma mensagem de erro
		And continuo na tela de cadastro de usuário

	Scenario: atualização dos dados de um usuário na plataforma sem sucesso
		Given estou logado na plataforma com o email com 'gpms@cin.ufpe.br' e senha com '123456'
		And estou na tela de editar perfil
		When preencho o campo nome com ''
		And tento salvar
		Then vejo uma mensagem de erro
		And continuo na tela de editar perfil
