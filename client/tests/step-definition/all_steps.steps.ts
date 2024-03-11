import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../support/custom-world";

const base_url = "http://localhost:3000/";




//GIVEN

Given(
    "eu estou na página de login",
    async function (this: ICustomWorld) {
        await this.page!.goto(base_url);
});

Given(
    "eu estou logado com username {string} e senha {string}",
    async function (this: ICustomWorld, username: string, password: string) {
        await this.page!.goto(base_url);
        await this.page!.fill('input[name="username"]', username);
        await this.page!.fill('input[name="password"]', password);
        await this.page!.click('button[type="submit"]');
        // console.log(this.page!.url());
});

Given(
    "há uma postagem com data {string}",
    async function (this: ICustomWorld, date: string) {
        await expect(this.page!.locator('body')).toContainText(date);
    }
  );

Given(
    "eu estou na aba {string}",
    // await expect(page.getByText('Meu perfil')).toBeVisible();
    async function (this: ICustomWorld, aba: string) {
        await expect(this.page!.locator('body')).toContainText(aba);
    }
)

Given(
    "Given dado que {string1} segue o usuário {string2}",
    async function (this: ICustomWorld, string1: string, string2: string) {
    }
)

//WHEN

When(
  "eu preencho o formulário com o username {string} e a senha {string}, inválidos, e aperto no botão login",
    async function (this: ICustomWorld, username: string, password: string) {
        await this.page!.fill('input[name="username"]', username);
        await this.page!.fill('input[name="password"]', password);
        await this.page!.click('button[type="submit"]');
    }
);

When(
    "eu preencho o formulário com o username {string} e a senha {string}, válidos, e aperto no botão login",
    async function (this: ICustomWorld, username: string, password: string) {
      await this.page!.fill('input[name="username"]', username);
      await this.page!.fill('input[name="password"]', password);
      await this.page!.click('button[type="submit"]');
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

When(
    "eu busco postagens no dia {string}, mês {string} e ano {string}",
    async function (
        this: ICustomWorld,
        day: string,
        month: string,
        year: string,
        ) {
        await this.page!.getByLabel('Dia').fill(day);
        await this.page!.getByLabel('Mês').fill(month);
        await this.page!.getByLabel('Ano').fill(year);
        await this.page!.getByRole('button', { name: 'Buscar postagens:' }).click();
    }
  );

  When(
    "eu clico no botão de aaa",
    async function (this: ICustomWorld) {
        await this.page!.click('button[id="list-follows-button"]');
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
      await expect(this.page!.locator('body')).toContainText(username);
    }
);

Then(
    "eu devo permanecer na página",
    async function (this: ICustomWorld) {
        await expect(this.page!).toHaveURL(base_url);
});


Then(
    "eu devo ser redirecionado para a página {string}",
    async function (this: ICustomWorld, page: string) {
        console.log(this.page!.url());
        await expect(this.page!).toHaveURL(base_url+page);
  }
);

Then(
    "sou redirecionado para a tela de login",
    async function (this: ICustomWorld) {
        await expect(this.page!).toHaveURL(base_url);
    }
  );

Then(
    "aparece uma postagem com a data {string}",
    async function (this: ICustomWorld, date: string) {
        await expect(this.page!.locator('body')).toContainText(date);
    }
);

Then(
    "não aparece uma postagem com a data {string}",
    async function (this: ICustomWorld, date: string) {
        await expect(this.page!.locator('body')).not.toContainText(date);
    }
);
