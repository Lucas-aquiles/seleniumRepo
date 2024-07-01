import express from "express";
import { By, Builder, Browser,until } from "selenium-webdriver";
import assert from "assert";

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  let driver;
  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get(
      "https://www.google.com.ar/search?q=trabajos+de+programador+++Jr+&sca_esv=338ac2989bfe946c&ei=jtx-ZvyIGdaG5OUP0NmLyAU&uact=5&oq=trabajos+de+programador++remoto&gs_lp=Egxnd3Mtd2l6LXNlcnAiH3RyYWJham9zIGRlIHByb2dyYW1hZG9yICByZW1vdG8yBRAAGIAEMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBEjDKFCsFljVIHACeAGQAQCYAW2gAbMIqgEDNi41uAEDyAEA-AEBmAIHoAKkBMICChAAGLADGNYEGEeYAwCIBgGQBgiSBwMzLjSgB8Iu&sclient=gws-wiz-serp&ibp=htl;jobs&sa=X&ved=2ahUKEwixl_yK1P6GAxW6HLkGHftTDRoQutcGKAF6BAgYEAQ#fpstate=tldetail&htivrt=jobs&htidocid=KsAXthbWPMNVZANGAAAAAA%3D%3D"
    );
    let title = await driver.getTitle();
    // assert.equal("LinkedIn: inicio de sesión o registro", title);

    await driver.manage().setTimeouts({ implicit: 500 });

    const xpathLi = '//ul/li[@class="iFjolb gws-plugins-horizon-jobs__li-ed"]';
    const elementos = await driver.findElements(By.xpath(xpathLi));



    for (let elemento of elementos) {
      try {
        let div1 = await elemento.findElement(
          By.xpath('.//div[@class="BjJfJf PUpOsf"]')
        );
        let texto = await div1.getText();
        console.log("Título del trabajo:", texto);
/* */       

        await div1.click();

        ///////////////////////////////
        const xpathDivs = '//div[@class="ocResc KKh3md"]/div[@class="I2Cbhb"]';
        const elementos = await driver.findElements(By.xpath(xpathDivs));
        let haceDias, tiempoCompleto;
        for (let elemento of elementos) {
          let spanPrincipal = await elemento.findElement(
            By.xpath('.//span[@class="LL4CDc"]')
          );
          let spanHijo = await spanPrincipal.findElement(
            By.xpath('.//span[@aria-hidden="true"]')
          );
          let texto = await spanHijo.getText();
          if (texto.includes("hace")) {
            haceDias = texto;
          } else if (texto.includes("Tiempo completo")) {
            tiempoCompleto = texto;
          }
        }
        console.log("Hace  días:", haceDias);
        console.log("Tiempo completo:", tiempoCompleto);
//////////////////////////////


          let spanElement = await driver.wait(until.elementLocated(By.css('div.YgLbBe.YRi0le span.HBvzbc')), 1000);
          await driver.wait(until.elementIsVisible(spanElement), 1000);
           // Obtener el texto del <span>
            let spanText = await spanElement.getText();
          console.log("textooooooooooooooooooooo",spanText);
            console.log(1)
          await driver.sleep(2000);
      } catch (err) {
        console.log("Error al obtener la información del elemento:", err);
      }
    }
;

    // await driver.quit();
  } catch (error) {
    console.log(error);
  }

  res.send("¡Hola, mundo!");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
