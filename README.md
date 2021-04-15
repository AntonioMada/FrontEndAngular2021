# Groupe 26 - FrontEnd Angular 2021
Application pour la gestion d'assignments

# Membres du groupes
- RANDRIANAVONY Harentsoa Antonio 42
- Zakanirina Ny Aina Herimanana 59

# Installation
1-  Cloner le git avec la commande : 
- $ git clone git@github.com:AntonioMada/FrontEndAngular2021.git

2- Entrer dans le répertoire local :
- $ cd FrontEndAngular2021

3- Installer les modules avec : 
- $ npm install

4- Lance l'application avec :
- $ ng serve
- Pour lancer l'application avec le serveur local, il faut changer les uri dans
- - /src/app/shared/assignments.service.ts
- - /src/app/shared/login.service.ts
- - /src/app/shared/matieres.service.ts
en localhost

# Fonctionnalités
## Login
Vous atterirez sur la page de login(des exmples d'utilisateurs seront cités plus bas)

## Accueil
Sur la page d'accueil, tout en haut se trouve le nom de l'application, il pourra être cliqué à tout moment pour revenir à la page d'accueil.  
Le bouton Peupler BD permet d'insérer 500 données dans la base de données avec des variables aléatoires.  

Deux containers se présentent après les boutons : 
- Le container se trouvant à gauche contient la liste des assignments non rendus
- Le container se trouvant à droite contient la liste des assignments rendus


Pour rendre un assignment non rendu > rendu, il faut glisser l'assignment voulu vers le container à droite,  
Pour rendre un assignment rendu > non rendu, il faut glisser l'assignment voulu vers le container à gauche,  
Un Dialog pour confirmer l'action se montrera dans les deux cas.  
Dans le cas de non rendu > rendu, il faut saisir la note correspondante.  

Chaque Card montrant un assignment contient un bouton Détail, le détail vous ramènera à la page de détails de l'assignment correspondant.

## Recherche
Recherche simple de nom d'assignements

## Detail
- Dans la page détails se trouve le même header que l'accueil qui va être suivi des détails de l'assignment
- Après les détails se trouve le bouton Edit qui n'est actif que si l'utilisateur connecté est Admin
- Le bouton Delete est là pour supprimer l'assignment correspondant

## Edit
- Modifier les valuers à modifier puis appuyer sur Modifer l'assignment pour confirmer

# Utilisateurs :
### Admin:
Elisha/XXQLvscyOW4G

## Non Admin:
Edy/peMCg4yZ


# Liens utilisés :
- https://material.angular.io/components/
- https://mongoosejs.com/docs/
