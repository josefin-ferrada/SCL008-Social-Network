
import { postRecipe, showRecipeTimeLine } from './../js/posts.js';
import { verifyRecipe, verifyTitle } from '../js/auth.js';



export  const templateNewRecipe = () =>{

  document.getElementById('root').innerHTML='';
   const containerNewRecipe = document.createElement('div');
   const contentNewRecipe = `    <div class=''>
                      <div class='row '>
                        <div class='column'>
                         <div class='grid-title-create'>
                            Nueva Receta
                          </div>
                        </div>
                        <div class='column'>
                          <div class="more-info">
                           
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                 <div class="create-recipe">
                    <div class="cfield" >
                     <p2>Nombre de tu receta<p2><br><br>
                    <input type="text" id="titleRecipe" minlength="3">
                     
                  </div>
                  <p2 class="align">Ingredientes<p2>
                  <div class="center">
                     
                     <textarea class="notes" minlength="5" maxlength="100" cols="40" rows="5" placeholder="ingresa tu receta" id="description"></textarea>

                  </div>
                  <p2 class="align">Preparación<p2>
                    <div class="center">
                     
                     <textarea class="notes" minlength="5" maxlength="100" cols="40" rows="5" placeholder="ingresa tu receta" id="description"></textarea>

                  </div>
                    
                    
                    <select id="tipe-recipe" class="soflow">
                        <option value="none">Mi receta es apta para :</option>
                        <option value="celiaco">Celíaco</option>
                        <option value="Diabetico">Diabéticos</option>
                        <option value="Intolerante a la lactosa">Intolerante a la lactosa</option>
                        <option value="Vegano">Vegano</option>
                    </select>
                    <input id="file" type="file" name="pic" accept="image/*">
                    <button id="postBtn">Publicar</button>
                </div>
                    <footer><a href="#/timeline"><img class="timeline" src='assets/Moodboard/home.png'  alt="home"></a>
                    <a href="#/likes"><img class="like" src='assets/Moodboard/like.png'  alt="like"></a>
                    <a href="#/newrecipe"><img class="newRecipe" src='assets/Moodboard/add2.png'  alt="newRecipe"></a>
                    <a href="#/profile"><img class="user" src='assets/Moodboard/user.png'  alt="user"></a>
                    </footer>
    `;

    containerNewRecipe.innerHTML= contentNewRecipe;
    const btnPostNewRecipe = containerNewRecipe.querySelector('#postBtn');

    btnPostNewRecipe.addEventListener('click', () =>{
      const title = containerNewRecipe.querySelector('#title-recipe').value;
      const description = containerNewRecipe.querySelector('#description').value;
      const tipeRecipe = containerNewRecipe.querySelector('#tipe-recipe').value;
      const file = containerNewRecipe.querySelector('#file').files[0];
      let result = verifyTitle(titleRecipe);
      let resultRecipe = verifyRecipe(description)

      if (file) {
        const ref = firebase.storage().ref();
        const name = (+new Date())+'-'+ file.name;
        const metadata = { contentType: file.type };
        const task = ref.child(name).put(file,metadata);
      }


// Condicional para que el usuario ingrese por lo menos 3 carácteres en el título y menos de 100 en la receta


      if (result === false) {
        alert('El título debe tener por lo menos tres carácteres')
      } else if (resultRecipe === false) {
        alert('La receta debe tener menos de 100 carácteres')
      } else
      window.location.href= "#/timeline"
      postRecipe(title,description,tipeRecipe);
      
    })  


    return containerNewRecipe;
}

