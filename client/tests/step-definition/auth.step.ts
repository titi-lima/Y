import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../support/custom-world";

// Scenario: Login com falha
Given("eu estou na página de login", async function (this: ICustomWorld) {
  await this.page!.goto("http://localhost:3000/");
});

When(
  "eu preencho o formulário com o username {string} e a senha {string}, inválidos, e aperto no botão login",
  async function (this: ICustomWorld, username: string, password: string) {
    await this.page!.fill('input[name="username"]', username);
    await this.page!.fill('input[name="password"]', password);
    await this.page!.click('button[type="submit"]');
  }
);

Then("eu devo permanecer na página", async function (this: ICustomWorld) {
  await expect(this.page!).toHaveURL(`http://localhost:3000/`);
});

// Scenario: Login com sucesso
When(
  "eu preencho o formulário com o username {string} e a senha {string}, válidos, e aperto no botão login",
  async function (this: ICustomWorld, username: string, password: string) {
    await this.page!.fill('input[name="username"]', username);
    await this.page!.fill('input[name="password"]', password);
    await this.page!.click('button[type="submit"]');
  }
);

Then(
  "eu devo ser redirecionado para a página {string}",
  async function (this: ICustomWorld, page: string) {
    await expect(this.page!).toHaveURL(`http://localhost:3000/${page}`);
  }
);
