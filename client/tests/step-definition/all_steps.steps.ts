import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../support/custom-world";

const base_url = "http://localhost:3000/";

//GIVEN

// Given(
//   "eu estou logado com username {string} e senha {string}",
//   async function (this: ICustomWorld, username: string, password: string) {
//     await this.page!.goto(base_url);
//     await this.page!.fill('input[name="username"]', username);
//     await this.page!.fill('input[name="password"]', password);
//     await this.page!.click('button[type="submit"]');
//     // console.log(this.page!.url());
//   }
// );

Given(
  "há uma postagem com data {string}",
  async function (this: ICustomWorld, date: string) {
    await expect(this.page!.locator("body")).toContainText(date);
  }
);

// Given(
//     "Given dado que {string1} segue o usuário {string2}",
//     async function (this: ICustomWorld, string1: string, string2: string) {
//     }
// )

//WHEN

When(
  "eu busco postagens no dia {string}, mês {string} e ano {string}",
  async function (
    this: ICustomWorld,
    day: string,
    month: string,
    year: string
  ) {
    await this.page!.getByLabel("Dia").fill(day);
    await this.page!.getByLabel("Mês").fill(month);
    await this.page!.getByLabel("Ano").fill(year);
    await this.page!.getByRole("button", { name: "Buscar postagens:" }).click();
  }
);

//THEN

Then(
  "aparece uma postagem com a data {string}",
  async function (this: ICustomWorld, date: string) {
    await expect(this.page!.locator("body")).toContainText(date);
  }
);

Then(
  "não aparece uma postagem com a data {string}",
  async function (this: ICustomWorld, date: string) {
    await expect(this.page!.locator("body")).not.toContainText(date);
  }
);
