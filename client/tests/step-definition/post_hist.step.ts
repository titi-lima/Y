import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../support/custom-world";

const base_url = "http://localhost:3000/";

Given(
  "há uma postagem com data {string}",
  async function (this: ICustomWorld, date: string) {
    await expect(this.page!.locator("body")).toContainText(date);
  }
);


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
