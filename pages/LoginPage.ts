import { Page, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;

    constructor(page:Page){
        this.page = page;
    }

    async goto() {
        await this.page.goto('/login');
    }

    async loginWith(email: string, password: string, rememberMe: boolean){
        await this.page.locator('#Email').fill(email);
        await this.page.locator('#Password').fill(password);

        if(rememberMe){
            await this.page.locator('#RememberMe').click();
        }

        await this.page.locator('input[type="submit"][value="Log in"]').click();
    }



}