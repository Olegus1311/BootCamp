const { chromium } = require('playwright');

jest.setTimeout(30000000);

let browser;
let page;

afterAll(async () => {
    await browser.close()
})

beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

beforeEach(async () => {
    await goToPage()
});

async function goToPage() {
    await page.goto('https://btc.bitaps.com', {
        networkIdleTimeout: 5000,
        waitUntil: 'networkidle',
        timeout: 3000000
    });

}

describe('UI', () => {
    test('lounch browser > Open Blocks page', async () => {
        await page.click('a.nav-link[href="/blocks"]');
    });

    test('Hide/Show dashboard', async () => {
        await page.click('.hide-dashboard')
        await page.click('.show-dashboard')

    });

    test('Search bar', async () => {
        await page.fill('[id="search-box"]', '649400')
        await page.click('.search_icon')
    });

    test('Go to Statistic', async () => {
        await page.click('[href="/statistics"]')
    });

    test('Change Theme', async () => {
        await page.click('.moon');
    });

});