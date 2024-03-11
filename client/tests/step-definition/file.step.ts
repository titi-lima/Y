import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../support/custom-world";

Given(
  "eu estou logado no sistema com o username {string} e a senha {string}",
  async function (this: ICustomWorld, username: string, password: string) {
    await this.page!.goto("http://localhost:3000/");
    await this.page!.fill('input[name="username"]', username);
    await this.page!.fill('input[name="password"]', password);
    await this.page!.click('button[type="submit"]');
  }
);

Given(
  "estou na página {string}",
  async function (this: ICustomWorld, page: string) {
    await this.page?.waitForURL(`**${page}`, {
      timeout: 30000,
    });
  }
);

When(
  "eu clico no botão de adicionar post, com id {string}",
  async function (this: ICustomWorld, id: string) {
    await this.page!.click(`#${id}`);
  }
);

Then("um modal deve ser aberto", async function (this: ICustomWorld) {
  const modal = this.page!.getByRole("dialog");
  expect(modal).toBeTruthy();
});

When(
  "eu seleciono o arquivo {string}",
  async function (this: ICustomWorld, file: string) {
    await this.page!.setInputFiles('input[type="file"]', `./${file}`);
    await this.page!.waitForTimeout(2000);
  }
);

When(
  "eu escrevo {string} no campo com id {string}",
  async function (this: ICustomWorld, text: string, id: string) {
    await this.page!.fill(`#${id}`, text);
  }
);

When(
  "eu clico no botão com id {string}",
  async function (this: ICustomWorld, id: string) {
    await this.page!.click(`#${id}`);
  }
);

Then(
  "eu devo ver um toast com a mensagem {string}",
  async function (this: ICustomWorld, message: string) {
    const toast = this.page!.getByText(message);
    expect(toast).toBeTruthy();
  }
);
