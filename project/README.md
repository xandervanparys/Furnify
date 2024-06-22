<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️-->
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#furnify-2)

# ➤ Furnify 2

<p align="left"><img src="https://www.furnifyhome.eu/cdn/shop/files/Logo_Full_Color_V1_1x_7fc06cc4-a6ac-4fbd-a607-81a4f85de9b7.jpg?v=1675388945&width=500" alt="project-image"></p>

Welkom op furnify2. Dit is versie 2.0.0!

Dit project is een 3D-kamerervaring ontwikkeld met React Three Fiber (R3F) en Vite op Node.js. Het stelt gebruikers in staat om aan de hand van een vragenlijst de kamer te configureren met de verschillende modules van Furnify.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

## ➤ Table of Contents

* [➤ Furnify 2](#-furnify-2)
	* [➤ Repository-indeling](#-repository-indeling)
	* [➤ Lokaal uitvoeren en testen](#-lokaal-uitvoeren-en-testen)
		* [Vite developer server opstarten (in project folder)](#vite-developer-server-opstarten-in-project-folder)
		* [MongoDB server opstarten (in project folder)](#mongodb-server-opstarten-in-project-folder)
		* [Tests Uitvoeren](#tests-uitvoeren)
			* [Zonder beeld](#zonder-beeld)
			* [Met beeld](#met-beeld)
	* [➤ Applicatie bereiken](#-applicatie-bereiken)
	* [➤ Gebruikershandleiding](#-gebruikershandleiding)
	* [➤ Zelf ontplooien in productie-omgeving met eigen Linux server](#-zelf-ontplooien-in-productie-omgeving-met-eigen-linux-server)
	* [➤ Contributors](#-contributors)


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#repository-indeling)

## ➤ Repository-indeling

- **/public/models/:** Bevat de models gebruikt voor het 3D model.
- **/public/other/skyboxes/:** Bevat de *skyboxes* gebruikt in de 3D omgeving.
- **/public/textures/:** Bevat de textures gebruikt voor het 3D model.
- **/src/:** Bevat de broncode van de applicatie.
  - **/src/2D/:** Bevat alle componenten voor het 2D vloerplan.
    - **/src/2D/components/:** Bevat alle basiscomponenten waaruit het vloerplan bestaat.
    - **/src/2D/FloorplanEditor.tsx:** Bevat de logica voor de werking van het vloerplan.
    - **/src/2D/FloorplanScene.jsx:** Bevat de compositie van de 3D scene die wordt getoond
  - **/src/3D/:** Bevat alle 3D componenten.
    - **/src/3D/Draggables/:** Bevat alle versleepbare 3D componenten.
    - **/src/3D/models/:** Bevat alle meshes van de models uit /public/models.
    - **/src/3D/other/:** Bevat alle andere 3D componenten.
    - **/src/3D/roomComponents/:** Bevat alle 3D componenten nodig voor de kamer.
    - **/src/3D/Scene.jsx:** Bevat de compositie van de 3D scene die wordt getoond op het canvas.
  - **/src/algorithm/:** Bevat algoritme componenten.
    - **/src/algorithm/module_choice.ts:** Bevat code voor bepalen van correcte module.
    - **/src/algorithm/module.ts:** Klasse voor de modules met getters en bepalingfuncties.
    - **/src/algorithm/read_file_csv.ts:** Bevat code voor inlezen van csv bestand.
  - **/src/assets/:**  Bevat afbeeldingen.
  - **/src/contexts/:** Bevat contexten (data die *realtime* in *state* aangepast en gebruikt kan worden in de volledige applicatie).
  - **/src/model/SuperModel.cjs:** Definieert schema's voor de *backend*.
  - **/src/Privacy/:** Bevat privacy componenten.
  - **/src/sidebar/:** Bevat sidebar componenten.
    - **/src/sidebar/components_sidebar/:** Bevat componenten gebruikt in de sidebar.
    - **/src/sidebar/Sidebar.jsx:** Bevat de sidebar compositie.
  - **/src/App.jsx:** React app.
  - **/src/i18n.ts:** Internationalisatie configuratie met alle vertalingen.
  - **/src/Login.jsx:** Bevat de login pagina voor admin.
  - **/src/main.jsx:** Bevat React app met alle *contextproviders*.
  - **/src/Routing.jsx** Definieert de routering voor gepubliceerde kamers terug op te vragen als admin.
- **/index.html** Bevat de html index.
- **/README.md** Bevat de README, gegenereerd door blueprint.md.
- **/blueprint.md** Genereerd de README.
- **/cypress.config.cjs** Configuratie van testen.
- **/MongoDB.cjs** Bestand voor databank.
- **/package.json** *Packages*.
- **/vite.config.js** Vite configuratie.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#lokaal-uitvoeren-en-testen)

## ➤ Lokaal uitvoeren en testen

### Vite developer server opstarten (in project folder)

**Installeer node packages:**

```bash
npm install
```

**start dev server:**

```bash
npm run dev
```

### MongoDB server opstarten (in project folder)

**start MongoDB server:**

```bash
npm run serve
```

### Tests Uitvoeren

#### Zonder beeld

**start dev test server als dit nog niet gebeurd is:**

```bash
npm run dev
```

**voer de tests uit:**

```bash
npm run testViewless
```

#### Met beeld

```bash
npm run dev
```

**voer de tests uit:**

```bash
npm run test
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#applicatie-bereiken)

## ➤ Applicatie bereiken

Productie is momenteel gedeployed op: http://157.193.171.41


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#gebruikershandleiding)

## ➤ Gebruikershandleiding

Wanneer de gebruiker de site opent, krijgt hij een standaard rechthoekige kamer te zien. Dit is het vertrekpunt, maar kan natuurlijk volledig aangepast worden.

1. Selecteer de woonruimte die u wenst te optimaliseren op de sidebar.
2. Selecteer de vorm van de ruimte.

   - Rechthoekig: Ga verder naar stap 3.
   - Anders:

     1. Kies of u met het raster wilt werken of niet.

        - Zo ja: selecteer de gewenste rastergrootte met de slider.
        - Nee: zet het raster uit (meest rechtse knop).
     2. Zet tekenmodus aan (meest linkse knop).
     3. Teken de vorm van uw woonruimte en zorg dat u de vorm sluit.

        - Het is mogelijk om:

          - Loodrecht te tekenen met de middelste knop.
          - Alles te verwijderen met de tweede knop van links.
     4. Klik op de net verschenen 3D knop (rechts).
     5. Bekijk u kamer in 3D (verdere functionaliteit is hier nog niet toegevoegd).
3. Voer de afmetingen van uw woonruimte in.
4. Kies de indeling van uw woonruimte.
5. Klik op het pijltje vanonder om naar het volgende tabblad te gaan.
6. Voeg aspecten toe in de ruimte, waar rekening mee moet worden gehouden bij het plaatsen van de meubel.

   - Klap een aspect open en vul de gevraagde gegevens in.
   - Een licht en “andere” aspecten kunnen versleept worden in de 3D omgeving.
   - Bij een raam, deur, stopcontact en schakelaar kiest u op welke muur deze moet worden geplaatst.
7. Ga naar het volgende tabblad.
8. Selecteer de functies die u graag zou hebben.
9. Ga naar het volgende tabblad.
10. Klik op modules zoeken.
11. U ziet de mogelijke modules die passen bij uw opgegeven specificaties of, indien hier geen combinatie van bestaat, een zachtere combinatie.
12. Draai en versleep de module zodat deze naar wens gepositioneerd is.
13. Klik op de controleer overlap knop en los eventuele problemen op.
14. Ga naar het volgende tabblad.
15. Geef de gewenste afwerkingen en eventuele andere vereisten aan.
16. Ga naar het volgende tabblad.
17. Vul uw contactgegevens in.
18. Druk op verzenden.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#zelf-ontplooien-in-productie-omgeving-met-eigen-linux-server)

## ➤ Zelf ontplooien in productie-omgeving met eigen Linux server

Zelf de site builden en ontplooien op een Linux server aan de hand van een Apache2-webserver, is mogelijk met Vite. Volg de onderstaande stappen:

Op de server:

1. Zorg dat MongoDB versie 7.0.9 op de server geïnstalleerd is.
2. Indien u het project als een .zip bestand hebt, unzipt u dit en opent u de nieuwe map “project”. Sla stap 2, 3 en 4 over en ga verder bij stap 7.
3. Installeer git (indien u dit nog niet hebt): [https://git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
4. Indien u toegang hebt tot GitLab:
   Zorg dat de GitLab-repository lokaal staat.

   a. Open een terminal venster.

   b. Voer het volgende commando uit: `git clone [repository-name]`
5. Ga in een terminal venster naar de map van de repository.
6. Voor de meest recente versie van de code te verkrijgen: `git pull`
7. Verifieer of u effectief in de project map zit door het commando `ls` uit te voeren in de terminal. Als u de mappen “src”, “public” en nog wat andere configuratiebestanden ziet staan, zit u in de correcte map.
8. Installeer Node en npm (indien u dit nog niet hebt): [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
9. Installeer de juiste packages met het volgende commando: `npm install`
10. Voer `npm run build` uit.
11. In de root van de server voer deze commando's uit om de site op de Apache2-server te zetten:

    a. `sudo rm -rf /var/www/html/*`

    b. `sudo cp -r furnify2/project/dist/* /var/www/html`
12. Start de MongoDB server: `npm run server`
13. Om de production build lokaal te previewen, gebruik: `npm run preview`


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contributors)

## ➤ Contributors
	

| [<img alt="Thomas Lonneville" src="https://gitlab.stud.atlantis.ugent.be/uploads/-/system/user/avatar/373/avatar.png?width=400" width="100">](https://gitlab.stud.atlantis.ugent.be/tlonnevi) | [<img alt="Xander Vanparys" src="https://gitlab.stud.atlantis.ugent.be/uploads/-/system/user/avatar/376/avatar.png?width=400" width="100">](https://gitlab.stud.atlantis.ugent.be/xvparys) | [<img alt="Wiebe Vandendriessche" src="https://gitlab.stud.atlantis.ugent.be/uploads/-/system/user/avatar/393/avatar.png?width=400" width="100">](https://gitlab.stud.atlantis.ugent.be/wievdndr) | [<img alt="Alexandra Ganseman" src="https://gitlab.stud.atlantis.ugent.be/uploads/-/system/user/avatar/268/avatar.png?width=400" width="100">](https://gitlab.stud.atlantis.ugent.be/algansem) | [<img alt="Nathan Salabiaku" src="https://gitlab.stud.atlantis.ugent.be/uploads/-/system/user/avatar/301/avatar.png?width=400" width="100">](https://gitlab.stud.atlantis.ugent.be/nathan.s) |
|:--------------------------------------------------:|:--------------------------------------------------:|:--------------------------------------------------:|:--------------------------------------------------:|:--------------------------------------------------:|
| [Thomas Lonneville](https://gitlab.stud.atlantis.ugent.be/tlonnevi) | [Xander Vanparys](https://gitlab.stud.atlantis.ugent.be/xvparys) | [Wiebe Vandendriessche](https://gitlab.stud.atlantis.ugent.be/wievdndr) | [Alexandra Ganseman](https://gitlab.stud.atlantis.ugent.be/algansem) | [Nathan Salabiaku](https://gitlab.stud.atlantis.ugent.be/nathan.s) |
| 🔥                                               | 🔥                                               | 🔥                                               | 🔥                                               | 🔥                                               |

