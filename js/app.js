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
    $scope.degrees = {
      d1: {
        degree: "I",
        degKey: 0,
      },
      d2: {
        degree: "II",
        degKey: 1
      },
      d3: {
        degree: "III",
        degKey: 2
      },
      d4: {
        degree: "IV",
        degKey: 3
      },
      d5: {
        degree: "V",
        degKey: 4
      },
      d6: {
        degree: "VI",
        degKey: 5
      },
      d7: {
        degree: "VII",
        degKey: 6
      }
      
    };
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
        console.log("testing " + key);
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

     $scope.enquiries = 50;
     $scope.dispDegree = "";
     $scope.answer = "";
     $scope.resp = "";

     var cleanArray = function(arr){

      console.log("entered cleanArray")
      var newArray = [];
      var text = "";
      for(var i = 0; i < arr.length; i++){
        if(arr[i] != ","){
          text = text + arr[i];
        } else {
          newArray.push(text);
          text = "";
        }
      }
      newArray.push(text);
      return newArray;
     }
     var incri = 0;
     

     $scope.questions = function(arr){
        var newArray = cleanArray(arr);
          $scope.dispDegree = "a";
          if($scope.resp === $scope.dispDegree){
            $scope.answer = "correct";            
            incri++;
          }else{
            setTimeout(function(){$scope.answer ="incorrect try again";}, 1000);
            
        }
      }

     


});

/*
G, A, B, C, D, E, and F♯
*/


