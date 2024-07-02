import { By, Builder, Browser,until } from "selenium-webdriver";
import assert from "assert";



export const allPosition = async (req,res)=>{

  let driver;
  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    driver.manage().window().maximize()
    await driver.get(
      "https://www.google.com.ar/search?q=trabajos+de+programador+++Jr+&sca_esv=338ac2989bfe946c&ei=jtx-ZvyIGdaG5OUP0NmLyAU&uact=5&oq=trabajos+de+programador++remoto&gs_lp=Egxnd3Mtd2l6LXNlcnAiH3RyYWJham9zIGRlIHByb2dyYW1hZG9yICByZW1vdG8yBRAAGIAEMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBEjDKFCsFljVIHACeAGQAQCYAW2gAbMIqgEDNi41uAEDyAEA-AEBmAIHoAKkBMICChAAGLADGNYEGEeYAwCIBgGQBgiSBwMzLjSgB8Iu&sclient=gws-wiz-serp&ibp=htl;jobs&sa=X&ved=2ahUKEwixl_yK1P6GAxW6HLkGHftTDRoQutcGKAF6BAgYEAQ#fpstate=tldetail&htivrt=jobs&htilrad=-1.0&htidocid=EjM3RzVanyWPlBgPAAAAAA%3D%3D"    );
    let title = await driver.getTitle();
    // assert.equal("LinkedIn: inicio de sesión o registro", title);

    await driver.manage().setTimeouts({ implicit: 500 });

    const xpathUl = '/html/body/div[2]/div/div[2]/div[1]/div/div/div[3]/div[1]/div[1]/div[4]/div[1]/div/ul';
    await driver.wait(until.elementLocated(By.xpath(xpathUl)), 10000);

    const ulElement = await driver.findElement(By.xpath(xpathUl));

    const elementos = await ulElement.findElements(By.xpath('./li'));

    for (let elemento of elementos) {
      try {
        let div = await elemento.findElement(By.xpath('.//div[@class="BjJfJf PUpOsf"]'));
        let divempresa = await elemento.findElement(By.xpath('.//div[@class="vNEEBe"]'))

        let texto = await div.getText();
        let textoEmpresa= await divempresa.getText();
        console.log(texto);
        console.log(textoEmpresa);

         await div.click();
      } catch (err) {
        console.error('No se encontró el div con clase "BjJfJf PUpOsf" en este <li>.', err);
      }

        try{
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
        }catch (err) {
          console.error('No se encontró el div con clase "BjJfJf PUpOsf" en este <li>.', err);
        }

try {
  let spanElement = await driver.wait(until.elementLocated(By.xpath('/html/body/div[2]/div/div[2]/div[1]/div/div/div[3]/div[2]/div/div[1]/div/div/div[4]/g-expandable-container/div/div/div/span')), 5000);
  // Espera a que el elemento esté visible y sea interactuable
  await driver.wait(until.elementIsVisible(spanElement), 5000);
   // Obtener el texto del <span>
    let spanText = await spanElement.getText();
  console.log("textooooooooooooooooooooo",spanText);
} catch (error) {
  console.error("debug errrr", error)
}
    }

// /* */       

//         await div1.click();

        ///////////////////////////////
        // const xpathDivs = '//div[@class="ocResc KKh3md"]/div[@class="I2Cbhb"]';
        // const elementos = await driver.findElements(By.xpath(xpathDivs));
        // let haceDias, tiempoCompleto;
        // for (let elemento of elementos) {
        //   let spanPrincipal = await elemento.findElement(
        //     By.xpath('.//span[@class="LL4CDc"]')
        //   );
        //   let spanHijo = await spanPrincipal.findElement(
        //     By.xpath('.//span[@aria-hidden="true"]')
        //   );
        //   let texto = await spanHijo.getText();
        //   if (texto.includes("hace")) {
        //     haceDias = texto;
        //   } else if (texto.includes("Tiempo completo")) {
        //     tiempoCompleto = texto;
        //   }
        // }
        // console.log("Hace  días:", haceDias);
        // console.log("Tiempo completo:", tiempoCompleto);
//////////////////////////////

// try {
//   let spanElement = await driver.wait(until.elementLocated(By.xpath('/html/body/div[2]/div/div[2]/div[1]/div/div/div[3]/div[2]/div/div[1]/div/div/div[4]/g-expandable-container/div/div/div/span')), 5000);
//   // Espera a que el elemento esté visible y sea interactuable
//   await driver.wait(until.elementIsVisible(spanElement), 5000);
//    // Obtener el texto del <span>
//     let spanText = await spanElement.getText();
//   console.log("textooooooooooooooooooooo",spanText);
// } catch (error) {
//   console.error("debug errrr", error)
// }
         
    //         console.log(1)
    //       await driver.sleep(2000);
    //   } catch (err) {
    //     console.log("Error al obtener la información del elemento:", err);
    //   }
    // }
;

    // await driver.quit();
  } catch (error) {
    console.log(error);
  }



  res.send("hol")


}

  