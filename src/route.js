import { templateLogin } from './assets/views/templateLogin.js'

import { templateCreate } from './assets/views/templateCreate.js'

import { templateTimeLine } from './assets/views/templateTimeLine.js'

import { templateProfile } from './assets/views/templateProfile.js'

import { templateNewRecipe } from './assets/views/templateNewRecipe.js'

import { templateRecipe } from './assets/views/templateRecipe.js'


/*  crear una función que reciba el hash # y según la coincidencia retorne otra función que va 
    a imprimir el template en nuestro HTML 
*/
const changeRouter = (hash) => {

    if (hash === '#/login') {
        return showTemplate(hash);
    }

    if (hash === '#/create'){
        return showTemplate(hash);
    }
    if (hash === '#/timeline') {
        return showTemplate(hash);
    }
    if (hash === '#/profile'){
        return showTemplate(hash);
    }
    if(hash === '' ){
        return showTemplate(hash);
    }
    if (hash === '#/newrecipe') {
        return showTemplate(hash);
    }

    if(hash.includes('#/recipe')){
        return showTemplate('#/recipe');
    }
}

// imprimirá el template en el HTML
const showTemplate = (hash) => {
    const router = hash.substring(2);
    const containerRoot = document.getElementById('root');
    containerRoot.innerHTML = '';
    
    //hacemos el match del hash utilizado y el template que quiero msotrar

    switch (router) {
        case 'login': 
            firebase.auth().onAuthStateChanged(firebaseUser => {
                if (firebaseUser) {
                    
                   
                    return containerRoot.appendChild(templateTimeLine());

                }
                else{
                    
                   return containerRoot.appendChild(templateLogin()); 
                }
                });
        
        break;
        case 'create':
            firebase.auth().onAuthStateChanged(firebaseUser => {
                if (firebaseUser) {
                    
                    return containerRoot.appendChild(templateTimeLine());
                }
                else{
                    
                    /*containerRoot.innerHTML= templateCreate();*/
                     return containerRoot.appendChild(templateCreate());
                }
        });
        break;
        case 'timeline':
            firebase.auth().onAuthStateChanged(firebaseUser => {
                if (firebaseUser) {

                    console.log(firebaseUser)

                    return containerRoot.appendChild(templateTimeLine());
                }
                else{
                    
                    return containerRoot.appendChild(templateLogin());

                }
        });
        break;
        case 'profile':
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                return containerRoot.appendChild(templateProfile());
            }
            else{
                return containerRoot.appendChild(templateLogin());
            }
        });
        break;
        case 'newrecipe':
            firebase.auth().onAuthStateChanged(firebaseUser => {
                if (firebaseUser) {
                    
                    return containerRoot.appendChild(templateNewRecipe());
                }
                else{
                    console.log("Debes registrarte para poder ingresar");
                    return containerRoot.appendChild(templateLogin());

                }
        });
        break;
        case 'recipe':
            firebase.auth().onAuthStateChanged(firebaseUser => {
                if (firebaseUser) {
                    
                    return containerRoot.appendChild(templateRecipe());
                }
                else{
                    console.log("Debes registrarte para poder ingresar");
                    return containerRoot.appendChild(templateLogin());

                }

        });
        break;
        case '' :
           
            containerRoot.appendChild(templateLogin());
        break;
        default: 
        containerRoot.innerHTML = '<p>Error 404</p>'
    }
}

/*  inicializamos el tema de las rutas para que se ejecute nuestra función changeRouter()
    y en su defecto showTemplate() 
 */

 export const initRouter = () => {
     window.addEventListener('load', changeRouter(window.location.hash));


  }

  

     
     //reconoce un cambio en el hash y le pasa ese nuevo hash a changeRouter

     if ('onhashchange' in window){
         window.onhashchange = () => {
             changeRouter(window.location.hash)
         }
     }
