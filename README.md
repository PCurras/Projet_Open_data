# Projet_Open_data

# Etape 1 - Choix des API

Notre objectif de départ était de faire une application simple à utiliser pour le client, et utile.

Nous avons donc pensé à une application permettant à l'utilisateur de choisir pour son pays d'origine, 
la conversion dans le pays dans lequel il souhaite voyager. 
Notre choix s'est donc positionné sur une API listant les pays, et des informations les concernant (monnaie, capitale, population...). 
La seconde API contient des monnaies et le taux de change entre les différentes monnaies. 

La première API est ***"Rest countries v1 API"***, elle est disponible sous : https://rapidapi.com/apilayernet/api/rest-countries-v1?fbclid=IwAR2jLpKuALWK2BpwV-co3bCn6QIxaCFNXzER9-mNRPNyzwik7kzpIBR1_ME .

La seconde API est  ***"Currency Exchange API"***, et est disponible sous : https://rapidapi.com/fyhao/api/currency-exchange?endpoint=53aa60c0e4b0596140341c57&fbclid=IwAR1jYK4ZjBJICzJqnr8R1A-dbuoHQI7NHOc7dpuJYcve1eZAqalARh9uuzw .

Ces deux API seront donc jointes par le code de la monnaie. 

# Etape 2 - Côté client

Le client pourra choisir son pays de voyage, ainsi que sa monnaie d'origine. Il recevra en retour un fichier json ou un fichier CSV (il a le choix),
dans lequel sera disponible le taux de conversion de la monnaie (si plusieurs monnaies sont disponibles dans le pays, alors les différents taux de conversion seront fournis)


# Description du site 

Bienvenue sur Geogr'API ! Vous partez en voyage, ou vous êtes simplement curieux ? 
Vous partez en Tunisie, et vous souhaitez savoir le taux de conversion de votre monnaie ? Un doute sur la capitale ?
Alors Geogr'API et fait pour vous !
Nous vous donnons le taux de conversion du dollars dans le pays sélectionné, ainsi que sa capitale, et d'autres informations qui peuvent vous êtres utiles. 

Alors n'hésitez plus, à vos clics !


# rajouter les routes
