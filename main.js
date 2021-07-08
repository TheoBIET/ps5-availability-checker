const puppeteer = require('puppeteer');
const chalk = require('chalk');

const amazon = {
    linksURL: [
        ratchet = {
            name: 'Ratchet & Clank: Rift Apart',
            url: 'https://www.amazon.fr/Ratchet-Clank-Rift-Apart-PS5/dp/B08WQMRHPS/ref=pd_sbs_1/257-0432693-3667925'
        },
        PlayStation5 = {
            name: 'Sony PlayStation 5 Édition Standard, PS5 avec 1 Manette Sans Fil DualSense',
            url: 'https://www.amazon.fr/PlayStation-%C3%89dition-Standard-DualSense-Couleur/dp/B08H93ZRK9/ref=sr_1_1'
        },
        ff = {
            name: 'Final Fantasy VII Remake Intergrade (PS5)',
            url: 'https://www.amazon.fr/Final-Fantasy-VII-Remake-Intergrade/dp/B08XR74D8F/ref=pd_bxgy_img_1/257-0432693-3667925'
        }
    ],

    init: async () => {
        const isAvailableList = []
        let linkIndex = 1;
        console.log(chalk.magenta('================================================================='))
        console.log(chalk.magenta('================== AMAZON Availability Checker =================='))
        console.log(chalk.magenta('================================================================='))
        for (const product of amazon.linksURL) {
            console.log(chalk.yellow(`${linkIndex} / ${amazon.linksURL.length} : Currently checking ${product.name}...`))
            const isAvailable = await amazon.testLink(product);
            if (isAvailable) {
                console.log(chalk.green(`✅ This product is available : ${product.name}`))
                isAvailableList.push(product);
            } else {
                console.log(chalk.red('❌ This product is currently unavailable!'));
            }
            linkIndex++;
        }
        console.log(chalk.magenta('================================================================='))
        console.log(chalk.magenta(`===== Results ${isAvailableList.length} / ${amazon.linksURL.length} products available. Press Ctrl+C to exit ====`));
        console.log(chalk.magenta('================================================================='))
    },

    testLink: async (product) => {
        // Step 1
        console.log(chalk.blue(`1 / 4 : Connect to ${product.url}...`))
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(product.url);

        // Step 2
        console.log(chalk.blue('2 / 4 : Accepting cookies...'))
        await page.click('#sp-cc-accept');


        // Step 3
        console.log(chalk.blue('3 / 4 : Check if the add to cart button is present...'));

        try { await page.click('#add-to-cart-button') }
        catch { return false }
        await page.waitForSelector('a#hlb-ptc-btn-native')

        if (page.url() === product.url) {
            return false;
        }

        browser.close();
        return true
    }
}

amazon.init();