# Projet_Open_data

L'objectif général de ce projet était de construire une API joignant au moins deux APIs tierces pour proposer une version enrichie du contenu de l'une et de l'autre, tout en proposant deux formats de récupération des données. Après un début de recherche sur des APIs orientées vers d'autres thèmes, nous avons finalement axé notre projet sur un regroupement de données géographiques (d'où le nom Geograp'API).

## Etape 1 - Choix des API

Notre objectif de départ était de créer une application simple à utiliser pour le client, et utile. Ainsi, à partir du nom d'un pays saisi par l'utilisateur (en anglais et avec une proposition d'auto-complétion), l'application renvoie un ensemble de données sur le pays en question avec en plus la conversion de 1€ dans la monnaie du pays sélectionné.

En termes d'APIs, notre choix s'est donc porté sur une première API listant les pays ainsi que des informations les concernant (capitale, population, continent sur lequel le pays se trouve, code de la monnaie nationale...). Cette API s'appelle ***"Rest countries v1 API"*** et est disponible sur : https://rapidapi.com/apilayernet/api/rest-countries-v1?fbclid=IwAR2jLpKuALWK2BpwV-co3bCn6QIxaCFNXzER9-mNRPNyzwik7kzpIBR1_ME .

La seconde API, ***"Currency Exchange API"*** disponible sur https://rapidapi.com/fyhao/api/currency-exchange?endpoint=53aa60c0e4b0596140341c57&fbclid=IwAR1jYK4ZjBJICzJqnr8R1A-dbuoHQI7NHOc7dpuJYcve1eZAqalARh9uuzw, contient une liste de noms de monnaies associé à leur code et le taux de change entre les différentes monnaies. 

Ces deux API seront donc jointes par le code de la monnaie. 

## Etape 2 - Côté client

Grâce au fichier HTML créé dans un second temps, l'accès à l'API peut également se faire via un système "clic-bouton" simple : L'utilisateur saisi le nom d'un pays et le format dans lequel il souhaite récupérer ses données (entre JSON et CSV), et il reçoit en réponse un affichage des données en json ou un fichier CSV à télécharger, dans lequel sera disponible les informations sur le pays ainsi que l'équivalent de 1€ dans la monnaie du pays. Si plusieurs monnaies sont disponibles dans le pays, seul l'équivalence pour la première monnaie indiqué sera fourni.


## Les routes et requêtes disponibles

La route principale de notre API est https://countryproj.herokuapp.com, elle permet d'accéder à la page d'accueil côté client. Nous proposons ensuite une deuxième route de la forme : https://countryproj.herokuapp.com/country/country_name qui permet d'accéder aux données sur le pays ainsi qu'au taux de change présenté précédemment.

D'autres routes ont commencé à être implémentées notamment pour accéder spécifiquement à une donnée comme le taux de change (*/currency/country_name*) ou la capitale (*/capital/country_name*). Cependant suite à des problèmes avec la récupération au format JSON, nous avons été contraind d'arrêter sans aboutir.

De manière plus précise, la requête GET https://countryproj.herokuapp.com/country/country_name permet de récupérer pour le pays choisi :
 - son nom ("name"),
 - les codes ISO 3166-1 2 lettres ("alpha2Code") et 3 lettres ("alpha3Code"),
 - le code d'appel ("callingCodes") commme +33 pour la France,
 - sa capitale ("capital"),
 - le continent auquel le pays appartient ("region"),
 - la sous-partie du continent ("subregion"),
 - le nombre d'habitants ("population"), 
 - la langue ("languages"),
 - le fuseau horaire ("timezones"),
 - le code de la monnaie ("currencies"),
 - etc
 + l'équivalence de 1€ dans la monnaie nationale ("conversionMoney")  /Cette dernière donnée étant issue de la deuxième API choisie

Différentes requêtes sont utilisées pour mener à bien ce projet, et récupérer les données nécessaires :
- *"GET https://restcountries-v1.p.rapidapi.com/all"* permet de récupérer les informations pour tous les pays et donc tous les noms des pays qui ont ensuite été stockés dans une variable pour l'auto-complétion côté client (cette requête a donc été réalisée qu'une seule fois),
- *"GET https://restcountries-v1.p.rapidapi.com/name/nom_pays"* est la requête exécutée à chaque fois qu'un pays est saisi, elle renvoie les données indiquées ci-dessus, au format JSON ou CSV selon ce qui est spécifié dans le header de la requête ('application/json' ou 'text/csv'),
- *"GET https://currency-exchange.p.rapidapi.com/exchange"* permet de récupérer le taux de conversion entre l'euro est la monnaie du pays.

## Description du site 

Bienvenue sur Geogr'API ! Vous partez en voyage, ou vous êtes simplement curieux ? 
Vous partez en Tunisie, et vous souhaitez savoir le taux de conversion de votre monnaie ? Un doute sur la capitale ?
Alors Geogr'API et fait pour vous ! Nous vous donnons le taux de conversion de l'euro dans le pays sélectionné, ainsi que sa capitale, et d'autres informations qui peuvent vous êtres utiles. 

Alors n'hésitez plus, à vos clics !

Notre site a été déployé sur Heroku, et est disponible à l'addresse suivante : ***https://countryproj.herokuapp.com***


## Les difficultés rencontrées

**- Le choix de l'API** 

L'une de nos principales difficultés rencontrées a été le choix des API. Notre premier choix était d'utiliser l'API Open Food Facts, ainsi que l'API rest countries. L'objectif aurait été de pouvoir lister, par pays/ville, une liste d'ingrédient par catégorie (petit déjeuner/ diner...).
La difficulté que nous avons rencontrée était dans l'utilisation de l'API d'Open Food Facts : le format des données était compliqué à utiliser, et le nettoyage des données aurait été trop chronophage. 

Nous avons donc cherché une autre API pour la remplacer: nous avions trouvé une API sur la qualité de l'air par pays. Cependant, après une utilisation, cette API s'est bloquée, et est devenue payante.

Nous avons donc trouvé notre API finale: celle rencensant les taux de change des monnaies. 
 
**- Le merge entre les deux API**

Notre seconde difficulté a été de récupérer l'information nous permettant de merger les deux API. 





