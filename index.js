

module.exports=function MFirebase(){
const _mfirebase={
  initializeApp:initializeApp,
  getAnalytics:getAnalytics,
  getStorage:getStorage,
  getDatabase:getDatabase,
  getAuth:getAuth,
  firebaseApp:null,
  init:function(config){
    this.firebaseApp=this.initializeApp(config);
    return this.getAnalytics(this.firebaseApp);
  },
  Auth:null,
  DB:null,
  Storage:null,
};
/* firebase auth */
_mfirebase.Auth=function(){
this.resource={
  auth:_mfirebase.getAuth(_mfirebase.firebaseApp),
  createUser:createUserWithEmailAndPassword,
  signIn:signInWithEmailAndPassword,
  signOut:signOut,
};
this.createUser=function(email,password,cb){
  cb=typeof cb==='function'?cb:function(){};
  var auth=this.resource.auth;
  this.resource.createUser(auth,email,password).then(r=>{
    return cb(r);
  }).catch(e=>{
    return cb(e);
  });
};
this.signOut=function(cb){
  cb=typeof cb==='function'?cb:function(){};
  var auth=this.resource.auth;
  this.resource.signOut(auth).then(r=>{
    return cb(r);
  }).catch(e=>{
    return cb(e);
  });
};
this.signIn=function(email,password,cb){
  cb=typeof cb==='function'?cb:function(){};
  var auth=this.resource.auth;
  this.resource.signIn(auth,email,password).then(r=>{
    return cb(r);
  }).catch(e=>{
    return cb(e);
  });
};
};
/* firebase database */
_mfirebase.DB=function(dbname){
this.dbname=typeof dbname==='string'
  &&dbname.match(/^[a-z0-9]+$/)
  ?dbname:'unknown';
this.resource={
  db:_mfirebase.getDatabase(_mfirebase.firebaseApp),
  ref:dbRef,
  set:dbSet,
  get:dbGet,
  child:dbChild,
};
this.set=function(k,v,cb){
  cb=typeof cb==='function'?cb:function(){};
  var ref=this.resource.ref(this.resource.db,this.dbname+'/'+k);
  this.resource.set(ref,JSON.stringify(v)).then(r=>{
    return cb(true,r);
  }).catch(e=>{
    return cb(false,e);
  });
};
this.get=function(k,cb){
  cb=typeof cb==='function'?cb:function(){};
  var ref=this.resource.ref(this.resource.db),
  loc=this.dbname+'/'+k,
  trap=this.resource.child(ref,loc);
  this.resource.get(trap).then(r=>{
    return cb(r.exists()?JSON.parse(r.val()):null);
  }).catch(e=>{
    return cb(null);
  });
};
};
/* firebase storage */
_mfirebase.Storage=function(path){
this.path=typeof path==='string'
  &&path.match(/^[a-z0-9]+$/)
  ?path:'unknown';
this.resource={
  storage:_mfirebase.getStorage(_mfirebase.firebaseApp),
  ref:ref,
  uploadString:uploadString,
  getDownloadURL:getDownloadURL,
};
this.set=function(f,c,cb,md,up){
  cb=typeof cb==='function'?cb:function(){};
  up=typeof up==='function'?up:function(){};
  md=typeof md==='object'&&md!==null?md:{};
  var ref=this.resource.ref(this.resource.storage,this.path+'/'+f);
  this.resource.uploadString(ref,c,'data_url',md).then(r=>{
    r.on('state_changed',e=>{
      return up({
        loaded:e.bytesTransferred,
        total:e.totalBytes,
        type:'upload',
      });
    },e=>{
      return false;
    });
    return cb(true,r);
  }).catch(e=>{
    return cb(false,e);
  });
};
this.get=function(f,cb){
  cb=typeof cb==='function'?cb:function(){};
  var ref=this.resource.ref(this.resource.storage,this.path+'/'+f);
  this.resource.getDownloadURL(ref).then(url=>{
    return cb(url);
  }).catch(e=>{
    return cb(false,e);
  });
};
};
return _mfirebase;
}; /* end of exports */

