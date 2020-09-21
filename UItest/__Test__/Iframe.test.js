jest.setTimeout(30000000);
const {chromium} = require('playwright');
const url = 'https://the-internet.herokuapp.com/';

let browser;



describe('UI', ()=>{
    let page;
    test('lounch browser > Open page', async() =>{
        browser = await chromium.launch({headless:false, slowMo: 1000});
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/frames');
    });

    test('Go to iframe page', async () => {
        await page.click('[href="/iframe"]');
    });

    test('Click on "p" button to select text', async () => {
        let temp;
        for(let frame of await page.frames()) {
            temp = await frame.$('[id=mceu_29-0]');
            if(temp)
            {
                console.log('button ok');
                break;
            }
        }    
        await temp.click();
    });

    test('Write text to iframe', async () => {
        const handle = await page.$('[id=mce_0_ifr]');
        const contentFrame = await handle.contentFrame();
        if(contentFrame)
        {
            contentFrame.textContent = 'Hello world';
            expect(contentFrame.textContent).toBe("Hello world");
            console.log('textarea ok');
        }
    });
    
});