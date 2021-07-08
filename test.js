const puppeteer = require('puppeteer');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const countdown = new Spinner('Testing...', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);
const chalk = require('chalk');


const pageTesting = 'https://www.amazon.fr/Final-Fantasy-VII-Remake-Intergrade/dp/B08XR74D8F/ref=pd_bxgy_img_1/257-0432693-3667925'


const app = {
    init: async () => {
        countdown.start();

        // Step 1
        countdown.message(chalk.blue('1 / 4 : Connect to Amazon.fr...'));
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(pageTesting);

        // Step 2
        countdown.message(chalk.blue('2 / 4 : Accepting cookies...'));
        await page.click('#sp-cc-accept');

        // Step 3
        countdown.message(chalk.blue('3 / 4 : Check if the add to cart button is present...'));
        const addToCartButton = await page.$('#add-to-cart-button');
        if (!addToCartButton) {
            countdown.message(chalk.red('This product is currently unavailable. Press Ctrl+C to exit`'));
        }

        // Step 4
        countdown.message(chalk.blue('4 / 4 : Try to click on the add to cart button...'));


        await page.click('#add-to-cart-button');
        await page.waitForSelector('a#hlb-ptc-btn-native')

        if (page.url() === pageTesting) {
           countdown.message(chalk.red('Add to Cart Button cannot be pressed. Press Ctrl+C to exit`'));
        }

        return console.log('OK');

    }
}

app.init()
 