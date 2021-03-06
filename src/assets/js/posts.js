export const postRecipe = (title,description,type) =>{
		var user = firebase.auth().currentUser;
		

		firebase.database().ref('recipe/').push({
	  	user: user.uid, 
	    username: user.displayName,
	    titleRecipe : title,
	    ingredients : ingredientes,
	    preparation : preparacion,
	    tipe: type,
	})
	.then(res => {
			alert("tu publicación se ha realizado con éxito");
		})
};

export const showRecipeTimeLine = () =>{
let post = []; 
 		firebase.database().ref('recipe/').on('value', (snapshot) =>{
 		let counter = 0;
		snapshot.forEach(function (childsnapshot){
		let childData = childsnapshot.val();
		childData.key = Object.keys(snapshot.val())[counter];
		
		 post.push(childData);
		 counter++;
		})
	})
 console.log(post);

 return post;
};

export const showRecipeProfile = () => {

	let post = []; 
	var user = firebase.auth().currentUser;
			firebase.database().ref('recipe/').orderByChild('user').equalTo(user.uid).once('value', (snapshot) =>{
			snapshot.forEach(function (childsnapshot){
			let childData = childsnapshot.val();
			 post.push(childData);
			})
		})
	 
	 return post;

};


export const showInfoUser = () =>{

	let post = []; 
	    var user = firebase.auth().currentUser;
 		firebase.database().ref('userInfo/'+user.uid).on('value', (snapshot) =>{
		 post.push(snapshot.val());
		})

 
 return post;

}



