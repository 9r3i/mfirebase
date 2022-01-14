
[![Author](https://img.shields.io/badge/author-9r3i-lightgrey.svg)](https://github.com/9r3i)
[![License](https://img.shields.io/github/license/9r3i/mfirebase.svg)](https://github.com/9r3i/mfirebase/blob/master/license.txt)
[![Forks](https://img.shields.io/github/forks/9r3i/mfirebase.svg)](https://github.com/9r3i/mfirebase/network)
[![Stars](https://img.shields.io/github/stars/9r3i/mfirebase.svg)](https://github.com/9r3i/mfirebase/stargazers)
[![Issues](https://img.shields.io/github/issues/9r3i/mfirebase.svg)](https://github.com/9r3i/mfirebase/issues)
[![Release](https://img.shields.io/github/release/9r3i/mfirebase.svg)](https://github.com/9r3i/mfirebase/releases)
[![Package](https://img.shields.io/npm/v/@9r3i/mfirebase.svg?label=npm)](https://www.npmjs.com/package/@9r3i/mfirebase)


# Mobile Firebase
Simple way to use firebase library.


# Usage
```js
const Firebase=new MFirebase;
Firebase.init(firebaseConfig);
```


# Primitive Usage
```html
<script type="module" src="mfirebase.js"></script>
```


# Installation
```
npm i mfirebase
```


# Test
```js
/* authentication */
const auth=new Firebase.Auth;
auth.createUser('email@gmail.com','password',pre);
auth.signIn('email@gmail.com','password',pre);
auth.signOut(pre);


/* database */
const db=new Firebase.DB('users'),
id='0001',
username='9r3i',
password=password;
db.set(id,{username:username,password:password},pre);
db.get(id,pre);


/* storage */
const storage=new Firebase.Storage('images'),
input=document.createElement('input');
storage.get('grey.jpg',url=>{
  var img=new Image;
  img.src=url;
  img.style.maxWidth='300px';
  document.body.appendChild(img);
});
document.body.appendChild(input);
input.type='file';
input.onchange=function(e){
  var file=this.files[0],
  fr=new FileReader;
  fr.onloadend=function(e){
    var data=e.target.result;
    pre({
      type:'reader',
      data:file,
      url_length:data.length,
      upto:Math.ceil(data.length/file.size*100),
    });
    storage.set(file.name,data,pre);
  };
  fr.readAsDataURL(file);
};


/* output log */
function pre(e){
  console.log(e);
}
```


