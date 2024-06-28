import express from "express"
import {By,Builder,Browser} from "selenium-webdriver"
import assert from "assert"

const app = express()
const port = 3000


app.get('/', async(req, res) => {
    let driver;
try{
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get('https://www.google.com.ar/search?q=trabajos+de+programador+++Jr+&sca_esv=338ac2989bfe946c&ei=jtx-ZvyIGdaG5OUP0NmLyAU&uact=5&oq=trabajos+de+programador++remoto&gs_lp=Egxnd3Mtd2l6LXNlcnAiH3RyYWJham9zIGRlIHByb2dyYW1hZG9yICByZW1vdG8yBRAAGIAEMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBEjDKFCsFljVIHACeAGQAQCYAW2gAbMIqgEDNi41uAEDyAEA-AEBmAIHoAKkBMICChAAGLADGNYEGEeYAwCIBgGQBgiSBwMzLjSgB8Iu&sclient=gws-wiz-serp&ibp=htl;jobs&sa=X&ved=2ahUKEwixl_yK1P6GAxW6HLkGHftTDRoQutcGKAF6BAgYEAQ#fpstate=tldetail&htivrt=jobs&htidocid=KsAXthbWPMNVZANGAAAAAA%3D%3D')
    let title = await driver.getTitle();
    // assert.equal("LinkedIn: inicio de sesión o registro", title);

    await driver.manage().setTimeouts({implicit: 500});

    const xpathLi = '//ul/li[@class="iFjolb gws-plugins-horizon-jobs__li-ed"]';
    const elementos = await driver.findElements(By.xpath(xpathLi));

  
    for (let elemento of elementos) {
        try {
            let div1 = await elemento.findElement(By.xpath('.//div[@class="BjJfJf PUpOsf"]'));
            let texto = await div1.getText();
            console.log("Título del trabajo:", texto);

             await div1.click();
             const xpathDivs = '//div[@class="ocResc KKh3md"]/div[@class="I2Cbhb"]';
             const elementos = await driver.findElements(By.xpath(xpathDivs));
             let haceDias, tiempoCompleto;
             for (let elemento of elementos) {
                // Busca el span con la clase LL4CDc dentro del div actual
                let spanPrincipal = await elemento.findElement(By.xpath('.//span[@class="LL4CDc"]'));
    
                // Obtén el texto del span hijo con aria-hidden="true"
                let spanHijo = await spanPrincipal.findElement(By.xpath('.//span[@aria-hidden="true"]'));
                let texto = await spanHijo.getText();
    
                // Verifica si es "hace X días" o "Tiempo completo" y guarda en variables correspondientes
                if (texto.includes("hace")) {
                    haceDias = texto;
                } else if (texto.includes("Tiempo completo")) {
                    tiempoCompleto = texto;
                }
            }
    
            // Imprime los valores guardados en las variables
            console.log("Hace  días:", haceDias);
            console.log("Tiempo completo:", tiempoCompleto);

           
        } catch (err) {
            console.log("Error al obtener la información del elemento:", err);
        }
    }

    // await inputFirst.sendKeys('lucas@gmail.com');

    // let inputSecond = await driver.findElement(By.id("password"))
    // await inputSecond.sendKeys('123asc');

    // const xpath1 = '//button[@class="btn__primary--large from__button--floating" and @data-litms-control-urn="login-submit" and @aria-label="Inicia sesión" and @type="submit"]';
    // const loc = await driver.findElement(By.xpath(xpath1));

    // await loc.click();


    // let submitButton = await driver.findElement(By.css('button'));

    // await textBox.sendKeys('Selenium gente');
    // await submitButton.click();

    // let message = await driver.findElement(By.id('message'));
    // let value = await message.getText();
    // assert.equal("Received!", value);


    // console.log("aaaa",value)


    // await driver.quit();


}catch(error){
    console.log(error)
}
   

    res.send('¡Hola, mundo!');
});


app.listen(port,()=>{
    console.log(`Servidor corriendo en http://localhost:${port}`)
})






