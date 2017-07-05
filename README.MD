# ![Hacklol Modifier](img/logo_hacklol_modifier.png =306x)
![Screeenshot](img/screenshot.png =640x)

## Français :

Hacklol Modifier est une application disponible sur navigateur web qui permet de modifier des sites Internet, en simulant un hack de celui-ci.
Elle dispose de nombreux outils, comme la possibilité de modifier les textes d'une page, de dessiner dessus, de la faire exploser, et bien plus.
L'application est disponible en français et en anglais.

* Version en ligne : http://hacklol.eliastiksofts.com

### A propos de l'application

* By Eliastik ( http://www.eliastiksofts.com )
* Langages : HTML, CSS, Javascript, PHP
* Version actuelle : 1.4 (4/07/2017)
* Dépôt Github : https://github.com/Eliastik/hacklol-modifier
* Licence : GNU GPL 3.0

### Installation

L'application nécessite un serveur PHP pour fonctionner.

Pour l'installer sur votre serveur, téléchargez l'archive du dépôt ici et extrayez la tout simplement sur votre serveur : https://github.com/Eliastik/hacklol-modifier/archive/master.zip

Ou faites un git clone :

````
git clone https://github.com/Eliastik/hacklol-modifier.git
````

Normalement, l'application devrait fonctionner sans modifications particulières.

Vous pouvez la configurer en modifiant le fichier config.php à la racine du dépôt.

### Mettre à jour certains fichiers

Vous pouvez mettre à jour les librairies utilisées pour le formulaire (Bootstrap, Jquery) en lançant cette commande (en étant dans le répertoire du projet, il faut avoir installé Bower) :

````
bower update
````

Vous pouvez recompiler les fichiers d'Hacklol Modifier en lançant ces commandes (nécessite node.js et gulp) :
````
npm install
gulp
````

Pour mettre à jour PHP-Proxy (nécessite composer) :

````
cd hacklol-modifier/page_loader
composer update
````

### Fonctionnement

L'application inclus un formulaire basique pour lancer Hacklol Modifier. Pour lancer l'application, il suffit d'entrer l'adresse du site que l'on souhaite modifier. Google ReCaptcha v2 est également inclus dans le formulaire (activable en modifiant le fichier config.php). Le site est chargé sur le serveur via un proxy, PHP-Proxy ( https://github.com/Athlon1600/php-proxy-app ), et envoyé à l'utilisateur via une iframe. Cette fonction est désactivable dans les options.

PHP-Proxy est installé à l'aide de composer dans hacklol-modifier/page_loader. Les seuls fichiers modifiés/ajoutés sont /plugins/ProtectPlugin.php, /plugins/ban_ip.php, /templates/main.php et /templates/url_form.php.

Le nom de l'application est modifiable en éditant le fichier config.php et hacklol-modifier/assets/src/js/main.js.

### Journal des mises à jour

* Version 1.4 (4/07/2017) :
    - Release initiale pour Github ;
    - Amélioration de l'architecture générale de l'application ;
    - Mise à jour de l'architecture de traduction de l'application (via i18next) ;
    - Amélioration de l'écran de chargement (barre de chargement ajoutée, etc) ;
    - Mise à jour de PHP-Proxy ;
    - Mise à jour des librairies ;
    - Ajout du jeu de la chasse aux Easter Eggs dans l'outil Defacer la page et ajout de nouveaux Easter Eggs (4) ;
    - Ajout d'un formulaire qui permet de changer de site internet lancé sans quitter l'application (dans la fenêtre A propos...) ;
    - Changement du thème de couleur du navigateur Chrome pour Android en fonction de la couleur des barres d'outils choisie ;
    - Les boutons d'ouverture des barres d'outils peuvent désormais être déplacés ;
    - L'outil Dessiner sur la page est désactivé lorsque l'outil Modifier la page est activé ;
    - Corrections de bugs et ajustements :
        - Ajustement de la fenêtre A propos... ;
        - Ajout d'une couleur pour les liens ;
        - Correction d'un bug avec l'outil Secouer la page ;
        - Correction d'un bug avec la fonction d'ouverture/fermeture des barres d'outils ;
        - Correction d'un bug avec les cases à cocher de la fenêtre Paramètres ;
        - Délai avant le chargement des données au démarrage ;
        - Simplification de certains parties du code ;
        - Autres corrections mineures.
    
* Ancien journal des changements : http://hacklol.eliastiksofts.com/news.php

### To-do list

Choses qui sont planifiées pour être ajoutées à l'application (peut-être) :

- Outil "Gravity", comme Google Gravity : http://mrdoob.com/projects/chromeexperiments/google-gravity/ ;
- Outil "DDOS", simulation d'un DDOS sur le site ;
- Ajout de nouveaux Easter Eggs.

### Librairies/crédits

- Jquery (Licence MIT), Jquery UI (Licence MIT) et jQuery UI Touch Punch (GPL 2.0 - http://touchpunch.furf.com/ ) ;
- Magnific Popup (Licence MIT - https://github.com/dimsemenov/Magnific-Popup/blob/master/LICENSE ) ;
- jStorage (The Unlicense - https://github.com/andris9/jStorage/blob/master/LICENSE ) ;
- IcoMoon Free (GPL/CC BY 4.0) ;
- Open Sans (Apache License 2.0 - https://fonts.google.com/specimen/Open+Sans ) ;
- colpick Color Picker (GPL 2.0 - https://github.com/mrgrain/colpick/blob/master/LICENSE ) ;
- Mini paint HTML5 (https://www.vincent-rousseau.net/paint-html5-canvas/ ) ;
- Matrix Effect HTML5+Javascript (http://www.arungudelli.com/html5/matrix-effect-using-html5-and-javascript/ ) ;
- FakeBSOD (GPL 3.0 - https://github.com/mohammadg/FakeBSOD.com/blob/master/LICENSE ) ;
- CodeMirror (Licence MIT - https://github.com/codemirror/CodeMirror/blob/master/LICENSE ) ;
- CSSHake (Licence MIT - https://github.com/elrumordelaluz/csshake/blob/master/LICENSE ) ;
- PHP-Proxy (Licence MIT - https://github.com/Athlon1600/php-proxy-app/blob/master/LICENSE ) ;
- i18next (Licence MIT - https://github.com/i18next/i18next ).

### Licence

Copyright (C) 2014-2017 Eliastik (eliastiksofts.com)

Ce programme est un logiciel libre ; vous pouvez le redistribuer ou le modifier suivant les termes de la GNU General Public License telle que publiée par la Free Software Foundation ; soit la version 3 de la licence, soit (à votre gré) toute version ultérieure.

Ce programme est distribué dans l'espoir qu'il sera utile, mais SANS AUCUNE GARANTIE ; sans même la garantie tacite de QUALITÉ MARCHANDE ou d'ADÉQUATION à UN BUT PARTICULIER. Consultez la GNU General Public License pour plus de détails.

Vous devez avoir reçu une copie de la GNU General Public License en même temps que ce programme ; si ce n'est pas le cas, consultez http://www.gnu.org/licenses.

## English

Hacklol Modifier is an app available on web browsers which allows to modify websites, simulating a hack of it.
It has many tools, including the ability to edit text on a page, draw on it, explode it, and more.
The app is available in english and in french.

* Online version: http://hacklol.eliastiksofts.com

### A propos de l'application

* By Eliastik ( http://www.eliastiksofts.com )
* Languages : HTML, CSS, Javascript, PHP
* Current version: 1.4 (4/07/2017)
* Github repository: https://github.com/Eliastik/hacklol-modifier
* License: GNU GPL 3.0

### Installation

A PHP server is required for the app to work.

To install it on your server, download the repository archive here and extract it on your server: https://github.com/Eliastik/hacklol-modifier/archive/master.zip

Or clone the repository on your server:

````
git clone https://github.com/Eliastik/hacklol-modifier.git
````

Normally, the application should work without special modifications.

You can configure it by editing the config.php file at the root of the project.

### Update files

You can update the libraries used by the form (Bootstrap, Jquery) by launching this command (in the project root directory, it is necessary to install Bower):

````
bower update
````

You can recompile the Hacklol Modifier files by launching these commands (require node.js and gulp):
````
npm install
gulp
````

To update PHP-Proxy (require composer) :

````
cd hacklol-modifier/page_loader
composer update
````

### How the app works

The application includes a basic form to launch Hacklol Modifier. To launch the app, it is required to enter a website address. Google ReCaptcha v2 is also included (can be activated by modifying the config.php file). The website is loaded via a proxy, PHP-Proxy ( https://github.com/Athlon1600/php-proxy-app ), and returned to the user via an iframe. This function can be disabled via the Hacklol Modifier settings.

PHP-Proxy is installed via composer in the folder hacklol-modifier/page_loader. The only files edited/added are /plugins/ProtectPlugin.php, /plugins/ban_ip.php, /templates/main.php and /templates/url_form.php.

The app name is editable by modifying the files config.php and hacklol-modifier/assets/src/js/main.js.

### Journal des mises à jour

* Version 1.4 (4/07/2017):
    - Initial release for Github
    - Enhanced the overall application architecture
    - Updated the translation architecture of the application (via i18next)
    - Enhanced the loading screen (loading bar added, etc)
    - Updated PHP-Proxy
    - Updated libraries
    - Added the Easter Eggs hunt game in the Deface the website tool and added new Easter Eggs (4)
    - Added a form to change of website without leaving the application (in the About... window)
    - Changed the color theme of Chrome for Android based on the selected color of the toolbars
    - The toolbar opening buttons can now be moved
    - The tool Draw on the page is disabled when the tool Edit the page is enabled
    - Bug fixes and minor adjustments:
        - Adjustments of the About... window
        - Added a link color
        - Fixed a bug with the tool Shake the page
        - Fixed a bug with the open/close toolbar buttons
        - Fixed a bug with the checkboxes of the Settings window
        - Delay before the loading of data at application startup
        - Simplification of certain parts of the code
        - Other minor adjustments.
    
* Old changelog page (FR): http://hacklol.eliastiksofts.com/news.php

### To-do list

Things that are planned to be added to the application (maybe):

- "Gravity" tool, like Google Gravity: http://mrdoob.com/projects/chromeexperiments/google-gravity/ ;
- "DDOS" tool, too simulate a DDOS of the website ;
- Add new Easter Eggs.

### Libraries/credits

- Jquery (MIT license), Jquery UI (MIT license) and jQuery UI Touch Punch (GPL 2.0 - http://touchpunch.furf.com/ ) ;
- Magnific Popup (MIT license - https://github.com/dimsemenov/Magnific-Popup/blob/master/LICENSE ) ;
- jStorage (The Unlicense - https://github.com/andris9/jStorage/blob/master/LICENSE ) ;
- IcoMoon Free (GPL/CC BY 4.0) ;
- Open Sans (Apache License 2.0 - https://fonts.google.com/specimen/Open+Sans ) ;
- colpick Color Picker (GPL 2.0 - https://github.com/mrgrain/colpick/blob/master/LICENSE ) ;
- Mini paint HTML5 (https://www.vincent-rousseau.net/paint-html5-canvas/ ) ;
- Matrix Effect HTML5+Javascript (http://www.arungudelli.com/html5/matrix-effect-using-html5-and-javascript/ ) ;
- FakeBSOD (GPL 3.0 - https://github.com/mohammadg/FakeBSOD.com/blob/master/LICENSE ) ;
- CodeMirror (MIT license - https://github.com/codemirror/CodeMirror/blob/master/LICENSE ) ;
- CSSHake (MIT license - https://github.com/elrumordelaluz/csshake/blob/master/LICENSE ) ;
- PHP-Proxy (MIT license - https://github.com/Athlon1600/php-proxy-app/blob/master/LICENSE ) ;
- i18next (MIT license - https://github.com/i18next/i18next ).

### License

Copyright (C) 2014-2017 Eliastik (eliastiksofts.com)

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
