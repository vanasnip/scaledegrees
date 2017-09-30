
/*
Copyright 2016 Google Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var idbApp = (function() {
  'use strict';

  // TODO 2 - check for support
  if(!('indexedDB' in window)){
      console.log('This browswer doesn\'t support IndexedDB');
      return;
  }


  var dbPromise = idb.open('key-sessions', 1, function(upgradeDb) {
    switch (upgradeDb.oldVersion) {
      case 0:
      console.log('Database does not need upgrading');
        // a placeholder case so that the switch block will 
        // execute when the database is first created
        // (oldVersion is 0)
      case 1:
        console.log('Creating the session object store');
        upgradeDb.createObjectStore('sessions', {keyPath: 'id'});
      case 2:
          // TODO 4.1 - create 'session' index
      var store = upgradeDb.transaction.objectStore('sessions');
      store.createIndex('session', 'session', {unique: false});
  
  
  
      // TODO 4.2 - create 'price' and 'description' indexes
  
      // TODO 5.1 - create an 'orders' object store
  
    }
  });



  function addSession(obj) {
    console.log('lalalala');
    // TODO 3.3 - add objects to the products store
    dbPromise.then(function(db) {
        var tx = db.transaction('sessions', 'readwrite');
        var store = tx.objectStore('sessions');
        var item = {
            session: obj.session,
            id: obj.id,
            key: obj.key,
            answers: obj.allResponses
        };
   
          console.log('Adding item: ', item);
          store.add(item);
 
        return tx.complete;
      }).then(function() {
        console.log('All items added successfully!');
      }).catch(function(e) {
        console.log('Error adding items: ', e);
      });
  }
  
  
 

  function getSessions() {
    return dbPromise.then(function(db){
      var tx = db.transaction('sessions');
      var sessionsOS = tx.objectStore('sessions');
      return sessionsOS;
    }).then(function(sOS){
      var getData = sOS.getAll();
      return getData;      
    }).then(function(data){  
      return  data;
    }).catch(function(e){
      console.log('Error adding items: ', e);
    })
    
  }


  return {
    dbPromise: (dbPromise),
    addSession: (addSession),
    getSessions: (getSessions)
  };
})();
