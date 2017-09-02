var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
  $scope.change = $scope.value;
    $scope.degrees = {
      d1: {
        degree: "I",
        degKey: 0
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
        notes: ["c","d","e","f","g","a","b"]
      },
      {
        keyName: "G",
        notes: ["g","a","b","c","d","e","f♯"]
      },
      {
        keyName: "D",
        notes: ["d","e","f♯","g","a","b","c♯"]
        //D, E, F♯, G, A, B, C♯
      },
      {
        keyName: "A",
        notes: ["a","b","c♯","d","e","f♯","g♯"]
        //A, B, C♯, D, E, F♯, G♯
      },
      {
        keyName: "E",
        notes: ["e","f♯","g♯","a","b","c♯","d♯"]
        //E, F♯, G♯, A, B, C♯, D♯
      },
      {
        keyName: "B",
        notes: ["b","c♯","d♯","e","f♯","g♯","a♯"]
        //B, C♯, D♯, E, F♯, G♯, A♯
        //C♭, D♭, E♭, F♭, G♭, A♭, B♭
      },
      {
        keyName: "C♭",
        notes: ["c♭","d♭","e♭","f♭","g♭","a♭","b♭"]
        //C♭, D♭, E♭, F♭, G♭, A♭, B♭
      },
      {
        keyName: "F♯",
        notes: ["f♯","g♯","a♯","b","c♯","d♯","e♯"]
        //F♯, G♯, A♯, B, C♯, D♯, E♯
      },
      {
        keyName: "G",
        notes: ["g","a","b","c","d","e","f♯"]
      },
      {
        keyName: "G",
        notes: ["g","a","b","c","d","e","f♯"]
      },
      {
        keyName: "G",
        notes: ["g","a","b","c","d","e","f♯"]
      },
      {
        keyName: "G",
        notes: ["g","a","b","c","d","e","f♯"]
      },
      {
        keyName: "G",
        notes: ["g","a","b","c","d","e","f♯"]
      }
      
    ];
     $scope.myKeys = $scope.keys[0];
});

/*
G, A, B, C, D, E, and F♯
*/


