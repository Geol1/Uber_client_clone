import LocalizedStrings from 'react-native-localization'

const strings= new LocalizedStrings({
    en:{
        name: "Name",
        placeholderName: "luffy",
        email: "Email",
        placeholderEmail: "example@gmail.com",
        pass: "Password",
        telephone:"Phone",
        placeholderTelephone: "+237 *********",
        authentification: {
           title: "Welcome 😊",
           subtitle: "Sign in to continu",
           description:"Enter a password of at least 6 characters.",
           oublie: "Forgot Passworrd.",
           btn2:"Login.",
           text1:"I'am a new user. ",
           btn1: "SignUp?",
           newAccount: "New Account?"
        },
        reinit: {
           title: "Reset Password?",
           description:"Enter your account email.",
           button1: "Send"
        },
        nouveau_compte: {
           connexion: "New Account",
           description:"Enter a password of at least 6 characters.",
           btn1: "New Account",
           text: "Thank 😊"
        },
        profil: {
            title: "Profil",
           text: "Open Gallery",
           description1: "The phone number must contain at least 9 characters.",
           description:"Developper by Geol",
           btn1: "Edit",
           btn2: "Settings",
           btn3: "Log Out",
           btn4: "Cancel"
        },
        avatar:{
           text1:"How do you want",
           text2:"choose an image?",
           text3:"To take a picture",
           text4:"click on the picture",
           text5:"Open Gallery"
        },
        home:{
            dashboard: "Dashboard",
            dashboardTitle: "Dashboard",
            transaction: "Transaction",
            transactionTitle: "Transactions",
            profil: "Profile",
            destination: "Destination",
            search: "SearchResults",
            searchTitle: "Result Search",
            historique: "HistoriqueTransaction",
            historiqueTitle: "Story of Transactions",
            profilTitle: " User Profil",
            createAccount: "Create Account.",
            forgot: "Forgot Password ?",
            setting: "Setting."
        },params:{
            description: "Please select language.",
            en: "English",
            fr: "French",
            theme: "Theme"
        }
    },
      fr: {
        name: "Nom",
        placeholderName: "luffy",
        email: "Email",
        placeholderEmail: "example@gmail.com",
        pass: "Mot de passe",
        telephone:"Telephone",
        placeholderTelephone: "+237 *********",
        authentification: {
           title: "Bienvenu 😊",
           subtitle: "Connectez-vous pour continuer.",
           description:"Entrer un mot de passe d'au moins 6 caracteres.",
           oublie: "Mot de passe oublie",
           btn2:"Connexion",
           text1:"je suis un nouvel utilisateur. ",
           btn1: "Creation de Compte?",
           newAccount: "Nouveau compte?"
        },
        reinit: {
           title: "Re-initialise Mot de passe?",
           description:"Entrer l'email dee votre compte",
           button1: "Envoyer"
        },
        nouveau_compte: {
           connexion: "Creer de compte",
           description:"Entrer un mot de passe d'au moins 6 caracteres.",
           btn1: "Nouveau Compte.",
           text: "Merci 😊"
        },
        profil: {
           title: "Profil",
           text: "Ouvrir La Gallery",
           description1: "Le numero de telephone doit contenir au moins 9 caracteres. ",
           description:"Developper par Geol",
           btn1: "Edit",
           btn2: "Parametres",
           btn3: "Off",
           btn4: "Annuler"
        },
        avatar:{
           text1:"Comment voulez-vous",
           text2:"choisir une image?",
           text3:"Prendre une photo",
           text4:"cliquer sur l'image",
           text5:"Ouvrir la Gallery"
        },
        home:{
            dashboardTitle: "Tableau de bord",
            dashboard: "Dashbord",
            transaction: "Operations",
            transactionTitle: "Transaction",
            profil: "Profile",
            profilTitle: "Profile Utilisateur",
            destination: "Destination",
            search: "SearchResults",
            searchTitle: "Resultat Recherche",
            historique: "HistoriqueTransaction",
            historiqueTitle: "Historique de Transactions",
            createAccount: "Creation de compte.",
            forgot: "Mot de Passe Oublie ?",
            setting: "Parametres."
        },
        params:{
            description: "S'il vous plait selectionner une langue.",
            en: "Anglais",
            fr: "Francais",
            theme: "Theme"
        }
    }
})


export default strings ;