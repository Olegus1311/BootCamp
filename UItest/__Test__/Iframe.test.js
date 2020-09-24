const {chromium} = require('playwright');

jest.setTimeout(30000000);

let browser;

afterAll(async () => {
    await browser.close()
})

describe('UI', ()=>{
    let page;
    test('lounch browser > Open page', async() =>{
        browser = await chromium.launch({headless:false, slowMo: 1000});
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://www.w3schools.com/html/html_iframe.asp', {
            networkIdleTimeout: 5000,
            waitUntil: 'networkidle',
            timeout: 3000000
        });
    });

    test('Write text to iframe', async () => {
        const handle = await page.$("[src='default.asp']");
        const contentFrame = await handle.contentFrame();

        if(contentFrame) {
            await contentFrame.click('[href="/css/default.asp"]')
            await contentFrame.click('[onclick="open_search(this)"]')
            await contentFrame.fill('input[class="gsc-input"]', 'hello')
            await contentFrame.click('[class="gsc-search-button"]')
        }
    });
    
});