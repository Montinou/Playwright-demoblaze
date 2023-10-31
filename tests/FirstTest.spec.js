const { test, expect } = require('@playwright/test');

test.describe('testing Demoblaze', () =>{
    test.beforeEach(async ({page}) => {
        await page.goto('https://demoblaze.com/')
    })

    test('Open Cart', async ({page}) => {
        await page.locator("xpath = //a[@class='nav-link'][contains(.,'Cart')]").click()
        await expect(page.locator("xpath= /html/body/div[6]/div/div[1]/h2")).toBeVisible()
    })

    test('Add product to the cart', async({page}) => {
        await page.locator('xpath= //*[@id="tbodyid"]/div[1]/div/div/h4/a').click()
        await page.locator("xpath = //a[@href='#'][contains(.,'Add to cart')]").click()
        const response = await page.waitForResponse(response => {
            return response.url().includes('https://api.demoblaze.com/addtocart') && response.request().method() === 'POST';
          });
        expect(response.status()).toBe(200);
        await page.locator("xpath = //a[@class='nav-link'][contains(.,'Cart')]").click()
        
    //https://api.demoblaze.com/addtocart
})

}
)