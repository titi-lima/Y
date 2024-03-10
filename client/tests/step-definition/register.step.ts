import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../support/custom-world";

// Scenario: Cadastro de usuário
Given(
  "eu estou na página {string}",
  async function (this: ICustomWorld, page: string) {
    await this.page!.goto(`http://localhost:3000/${page}`);
  }
);

When(
  "eu preencho o formulário com o username {string}, nome {string}, descrição {string} e senha {string} e aperto no botão de cadastrar",
  async function (
    this: ICustomWorld,
    username: string,
    name: string,
    description: string,
    password: string
  ) {
    await this.page!.fill('input[name="name"]', name);
    await this.page!.fill('input[name="nickName"]', username);
    await this.page!.fill('input[name="description"]', description);
    await this.page!.fill('input[name="password"]', password);
    await this.page!.click('button[type="submit"]');
  }
);

Then(
  "sou redirecionado para a tela de login",
  async function (this: ICustomWorld) {
    await expect(this.page!).toHaveURL(`http://localhost:3000/`);
  }
);
