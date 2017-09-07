var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider){
  $routeProvider
    .when("/home", {
      templateUrl: "home.html",
      controller: "myCtrl"
    })
    .when("/keytest/:theKey/:keyArr", {
      templateUrl: "keytest.html",
      controller: "myCtrl"
    })
    .otherwise ({redirectTo:"/home"});

});

app.controller('myCtrl', function($scope, $location, $routeParams) {
    
    $scope.noteNames = ["a","b","c","d","e","f","g"];
    $scope.accidentals = [{sym:"♯", state:false}, {sym:"♭", state:false}]
    $scope.degrees = [
      {
        degree: "I",
        degKey: 0,
      },
      {
        degree: "II",
        degKey: 1
      },
      {
        degree: "III",
        degKey: 2
      },
      {
        degree: "IV",
        degKey: 3
      },
      {
        degree: "V",
        degKey: 4
      },
      {
        degree: "VI",
        degKey: 5
      },
      {
        degree: "VII",
        degKey: 6
      }
      
    ];
    $scope.keys = [
      {
        keyName: "C",
        notes: ["c","d","e","f","g","a","b"],
        index: 0
      },
      {
        keyName: "G",
        notes: ["g","a","b","c","d","e","f♯"],
        index: 1
      },
      {
        keyName: "D",
        notes: ["d","e","f♯","g","a","b","c♯"],
        index: 2
        //D, E, F♯, G, A, B, C♯
      },
      {
        keyName: "A",
        notes: ["a","b","c♯","d","e","f♯","g♯"],
        index: 3
        //A, B, C♯, D, E, F♯, G♯
      },
      {
        keyName: "E",
        notes: ["e","f♯","g♯","a","b","c♯","d♯"],
        index: 4
        //E, F♯, G♯, A, B, C♯, D♯
      },
      {
        keyName: "B",
        notes: ["b","c♯","d♯","e","f♯","g♯","a♯"],
        index: 5
        //B, C♯, D♯, E, F♯, G♯, A♯
        //C♭, D♭, E♭, F♭, G♭, A♭, B♭
      },
      {
        keyName: "C♭",
        notes: ["c♭","d♭","e♭","f♭","g♭","a♭","b♭"],
        index: 6
        //C♭, D♭, E♭, F♭, G♭, A♭, B♭
      },
      {
        keyName: "F♯",
        notes: ["f♯","g♯","a♯","b","c♯","d♯","e♯"],
        index: 7
        //F♯, G♯, A♯, B, C♯, D♯, E♯
      },
      {
        keyName: "G♭",
        notes: ["g♭","a♭","b♭","c♭","d♭","e♭","f"],
        index: 8
      },
      {
        keyName: "D♭",
        notes: ["d♭","e♭","f","g♭","a♭","b♭","c"],
        index: 9
      },
      {
        keyName: "A♭",
        notes: ["a♭","b♭","c♯","d♭","e♭","f","g"],
        index: 10
      },
      {
        keyName: "E♭",
        notes: ["e♭","f","g","a♭","b♭","c","d"],
        index: 11
      },
      {
        keyName: "B♭",
        notes: ["b♭","c","d","e♭","f","g","a"],
        index: 12
      },
      {
        keyName: "F",
        notes: ["f","g","a","b♭","c","d","e"],
        index: 13
      }
      
    ];
     $scope.theKey = $routeParams.theKey;
     $scope.keyArr = $routeParams.keyArr;
     $scope.myKeys = $scope.keys[0];
     $scope.selectedKey = "?";
     $scope.keyArray;

     $scope.keyTest = function(){
      if($scope.selectedKey != "?"){
        $scope.keyArray = $scope.getKeyArray($scope.selectedKey);
        $location.path("/keytest/" + $scope.selectedKey +"/"+$scope.keyArray);
        
        

      }
     }

      $scope.getKeyArray = function(key){
        for(var i = 0; i < $scope.keys.length; i++){
          if(key === $scope.keys[i].keyName){
            return $scope.keys[i].notes;
          }          
        }
      }
     

     $scope.selectKey = function(leKey){
      $scope.selectedKey = leKey.keyName;
        return $scope.selectedKey;
     }

     $scope.enquiries = 10;
     $scope.romanNumDeg = "";
     $scope.dispDegree = "";
     $scope.answer = "";
     $scope.acci = [false, ""];
     $scope.accihap = function(mod){
      $scope.acci = [true, mod];
     };



     $scope.searchKey = function(key){
      $scope.answer = "";
      //console.log(key);
      var newArray = [];
      var text = "";
      var myKeyObj = [];
      

      for (var i = 0; i < $scope.keys.length; i++) {
        
        if(key.toLowerCase() === $scope.keys[i].notes[0]){
          myKeyObj = [$scope.keys[i]];
          //console.log($scope.keys[i].notes)
          //console.log(myKeyObj);
          return $scope.questions(myKeyObj);
        }
      }
      
      
     }
     var incri;

     var randomNumber = function(){
        var leNumero = Math.floor((Math.random() * 7));
        while(leNumero === incri){
          leNumero = Math.floor((Math.random() * 7));
        }
        incri = leNumero;
        return leNumero;
     } 

     var randomise = function(){
      var randomDegree = $scope.degrees[randomNumber()];
      return randomDegree;

      //{degreeLab: II, ans: "d"}
     }

     var getQNAObj = function(obj){ 
          var myDeg = randomise();        
          var QNAObj = {
            ques: myDeg.degree,
            answ: obj[0].notes[myDeg.degKey]
          };
          return QNAObj;
        }

        
        //scalePosition:

     
     
     $scope.theQuests;
     $scope.resolveMe = false;

     $scope.questions = function(obj){   
        console.log('got in');
        $scope.theQuests =  getQNAObj(obj);
        console.log($scope.theQuests);        
        $scope.romanNumDeg = $scope.theQuests.ques;          
     }

     $scope.respondings = function(note){

      if ($scope.acci[0]){
        note = note + $scope.acci[1].sym
      };

      if(note === $scope.theQuests.answ){
        $scope.answer = "correct";
        $scope.searchKey($scope.theKey);
      } else if(note != $scope.theQuests.answ){
        $scope.answer = "not quite, try again";
      }
     }

      
});

/*
G, A, B, C, D, E, and F♯
*/


