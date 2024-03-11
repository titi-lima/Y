import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ICustomWorld } from "../support/custom-world";

Given(
    "há uma postagem com comentário {string} de {string} postado em {string}",
    async function (this: ICustomWorld, desc: string, name: string, date: string) {
        await expect(this.page!.locator('body')).toContainText(name+date+desc);
    }
  );


When(
    "eu adiciono o comentário {string} e envio",
    async function (this: ICustomWorld, comm: string) {
        await this.page!.getByRole('button', { name: 'Adicionar comentário' }).nth(-1).click();
        await this.page!.getByRole('textbox').click();
        await this.page!.getByRole('textbox').fill(comm);
        await this.page!.getByRole('button', { name: 'Enviar' }).click();
    }
);

Then(
    "aparece o comentário {string} de {string} abaixo do comentário {string} de {string} postado em {string}",
    async function (
        this: ICustomWorld, comm1: string, name1: string, comm2: string, name2: string, date: string) {
        await expect(this.page!.locator('body')).toContainText(name2+date+comm2+name1);
        await expect(this.page!.locator('body')).toContainText(comm1);
    }
);


