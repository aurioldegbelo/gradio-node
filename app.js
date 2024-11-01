// change require to import
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { Client } from "@gradio/client";


const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Home Route')
})

let example_text = `Münster is an independent city (Kreisfreie Stadt) in North Rhine-Westphalia, Germany. It is in the northern part of the state and is considered to
 be the cultural centre of the Westphalia region. It is also a state district capital. Münster was the
  location of the Anabaptist rebellion during the Protestant Reformation and the site of the signing of the
   Treaty of Westphalia ending the Thirty Years' War in 1648. Today, it is known as the bicycle capital of Germany.
Münster gained the status of a Großstadt (major city) with more than 100,000 inhabitants in 1915.[4]
 As of 2014, there are 300,000[5] people living in the city, with about 61,500 students,[6]
 only some of whom are recorded in the official population statistics as having their primary residence in Münster.
 Münster is a part of the international Euregio region with more than 1,000,000 inhabitants (Enschede, Hengelo, Gronau, Osnabrück). Companies offering jobs in
 Münster include the Institute for Geoinformatics at the University of Münster, the Münster University of Applied Sciences, Reedu GmbH, con terra,
 the Deutsche Bank, IKEA, LIDL, REWE, ALDI and BASF Coatings.`


// declare the public folder as a static folder
app.use(express.static(path.join(__dirname, '/public')))
console.log("Directory: ", __dirname)

app.get('/input', (req, res) => {
  res.send(example_text)
})

app.get('/output', async (req, res) => 
{

    const client = await Client.connect("aurioldegbelo/ner_space_2023");
    const result = await client.predict("/predict", { 		
            sentence: example_text, 
    });

    console.log(result.data);
  res.send(result.data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})