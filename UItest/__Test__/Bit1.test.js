jest.setTimeout(30000000);
const {chromium} = require('playwright');
const url = 'https://btc.bitaps.com';

let browser;
afterAll(async () => {
    await browser.close()
})

describe('UI', ()=>{
    let page;

    test('lounch browser > Open Blocks page', async() =>{
        browser = await chromium.launch({headless:false});
        const context = await browser.newContext();
        
        page = await context.newPage();

        await page.goto('https://btc.bitaps.com', {
            networkIdleTimeout: 5000,
            waitUntil: 'networkidle',
            timeout: 3000000
        });
        await page.click('a.nav-link[href="/blocks"]');
    });

    test('Hide/Show dashboard', async () => {
        await page.goto('https://btc.bitaps.com', {
                networkIdleTimeout: 5000,
                waitUntil: 'networkidle',
                timeout: 3000000
            });
        await page.click('.hide-dashboard')
        await page.click('.show-dashboard')

    });

    test('Search bar', async () => {
        await page.fill('[id="search-box"]', '649400')
        await page.click('.search_icon')
        await page.goto('https://btc.bitaps.com', {
                networkIdleTimeout: 5000,
                waitUntil: 'networkidle',
                timeout: 3000000
            });
    });

    test('Go to Statistic', async () => {
    
        await page.click('[href="/statistics"]')
        await page.goto('https://btc.bitaps.com', {
            networkIdleTimeout: 5000,
            waitUntil: 'networkidle',
            timeout: 3000000
        });
    });

    test('Change Theme', async () => {
        await page.click('.moon');
    });

});