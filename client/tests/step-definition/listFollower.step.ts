import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../support/custom-world";

const base_url = "http://localhost:3000/";

//GIVEN

Given(
  "eu estou logado com username {string} e senha {string}",
  async function (this: ICustomWorld, username: string, password: string) {
    await this.page!.goto(base_url);
    await this.page!.fill('input[name="username"]', username);
    await this.page!.fill('input[name="password"]', password);
    await this.page!.click('button[type="submit"]');
    // console.log(this.page!.url());
  }
);

Given(
  "eu estou na aba {string}",
  // await expect(page.getByText('Meu perfil')).toBeVisible();
  async function (this: ICustomWorld, aba: string) {
    await expect(this.page!.locator("body")).toContainText(aba);
  }
);

When(
  "eu clico no botão de {string}",
  async function (this: ICustomWorld, button: string) {
    await this.page!.click(button);
  }
);

When(
  "eu clico na opção {string}",
  async function (this: ICustomWorld, optionText: string) {
    await this.page!.click(`text="${optionText}"`);
  }
);

//THEN

Then(
  "eu visualizo o usuário {string}",
  async function (this: ICustomWorld, username: string) {
    await expect(this.page!.locator("body")).toContainText(username);
  }
);
