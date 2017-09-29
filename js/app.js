(function(){
  
  var app = angular.module('myApp', ["ngRoute"]);

  app.config(function($routeProvider){
    $routeProvider
      .when("/home", {
        templateUrl: "home.html",
        controller: "myCtrl"
      })
      .when("/keytest/:theKey/:leStart/:quess/:degStyle", {
        templateUrl: "keytest.html",
        controller: "myCtrl"
      })
      .when("/results/:leScore/:time/:totalQuess", {
        templateUrl: "results.html",
        controller: "myCtrl"
      })
      .otherwise ({redirectTo:"/home"});

  });
  var allSessionData = [];
  //console.log(allSessionData.length);
  function addToAllSessionData(item){
    allSessionData.push(item);
  }
  function cleanSessionData(data){

    for(var i = 0; i < data.length; i++){
      addToAllSessionData(data[i]);
    }
  };
  //get latest session
  function getLatestSession(all){
    var lastKey = all.length - 1;
    console.log(lastKey);
    var last = all[11];
    console.log(last);
    return last;
  }
  function sessionsOfAKey(session){

  }
  function cleanResultTime(rawTime){
    var elapsed = Math.floor(rawTime / 100) / 10;
    if(Math.round(elapsed) == elapsed) { elapsed += '.0'; };
    return elapsed;
  }



  function getAvarage(session){
    console.log(session);
    var start = cleanResultTime(Number(session.session));
    var fin = cleanResultTime(session.id);
    console.log(start + " " + fin);
    var avarage = (fin - start)/ session.answers.length;

    return avarage; 

  }
 
  
  app.controller('resultsCtrl', function($scope){
    $scope.latestSessioAvarage;
    var latestSession;
   
    
      var response = new Promise(function(resolve, reject){
        async function fetchData(){
          idbApp.getSessions()
          .then(function(sessionData){
            console.log(resolve(sessionData));
            resolve(sessionData);
            return sessionData;
          }).catch(function(e){
            reject('no no drama');
            console.log(e);
          });
        }
        fetchData();
      })

      response.then(function(sessionData){
        console.log(sessionData);
        return sessionData;
      }, function(err){
        console.log(err);
      })
    
    console.log(response);
      




  });

  app.controller('myCtrl', function($scope, $location, $routeParams, $timeout) {
      
      $scope.noteNames = ["a","b","c","d","e","f","g"];
      $scope.accidentals = [{sym:"♭", state:false, name:"flat"}, {sym:"♯", state:false, name:"sharp"}]
      $scope.degrees = [
        {
          degree: "I",
          degKey: 0,
          alphaN: "1"
        },
        {
          degree: "II",
          degKey: 1,
          alphaN: "2"
        },
        {
          degree: "III",
          degKey: 2,
          alphaN: "3"
        },
        {
          degree: "IV",
          degKey: 3,
          alphaN: "4"
        },
        {
          degree: "V",
          degKey: 4,
          alphaN: "5"
        },
        {
          degree: "VI",
          degKey: 5,
          alphaN: "6"
        },
        {
          degree: "VII",
          degKey: 6,
          alphaN: "7"
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
          notes: ["a♭","b♭","c","d♭","e♭","f","g"],
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
      $scope.leScore = $routeParams.leScore;
      $scope.leStart = $routeParams.leStart;
      $scope.quess = $routeParams.quess;
      $scope.totalQuess = $routeParams.totalQuess;
      $scope.degStyle = $routeParams.degStyle;
      $scope.myKeys = $scope.keys[0];
      $scope.selectedKey = "?";
      $scope.keyArray;
      var start;
      var elapsed = '0.0';
      $scope.time = $routeParams.time;
      var mySession = {};
      mySession.allResponses = [];
      $scope.keyTest = function(){
        if($scope.selectedKey != "?"){
          
          $scope.leStart = new Date().getTime();
          $location.path("/keytest/" + $scope.selectedKey +  "/" + $scope.leStart + "/" + $scope.enquiries + "/" + $scope.romaOrAlpha);
          
          
        }
      }

      $scope.goHome = function(){      
          $location.path("/home");      
      }
  
      $scope.myResults = function(score, session){
        
        $scope.time = cleanTime(getFinalTime());
       // console.log($scope.time);
        
        $location.path("/results/" + score + "/" + $scope.time + "/" + $scope.quess);
        idbApp.addSession(session);
        
      }

      

      $scope.selectKey = function(leKey){
        $scope.selectedKey = leKey.keyName;
        //idbApp.addSession();//******************************************************************************************** */
       // console.log($scope.enquiries);
          return $scope.selectedKey;

      }

      $scope.noQuestion = [2,10,50,100];

      $scope.enquiries = $scope.noQuestion[0];
      $scope.score = 0;
      $scope.correct = [true, 0];
      $scope.incorrect = 0;
      $scope.romanNumDeg = "";
      $scope.dispDegree = "";
      $scope.answer = "";
      $scope.acci = [false, ""];
      $scope.settingStat = false;
      $scope.romaOrAlpha = true;

      


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

      function getNewTime(){
        var newTime = new Date().getTime();
        return newTime;
      }
      function getFinalTime(){
        var finalTime = getNewTime() - $scope.leStart;        
        return finalTime;
      }
    
      function cleanTime(rawTime){
        elapsed = Math.floor(rawTime / 100) / 10;
        if(Math.round(elapsed) == elapsed) { elapsed += '.0'; };
        return elapsed;
      }

      var getQNAObj = function(obj){ 
          var quessFunc = function(){
            
                if($scope.degStyle === "true"){
                  
                  return myDeg.degree;
                } else if($scope.degStyle === "false") {
                  
                  return myDeg.alphaN;
                }
                
              };
            var myDeg = randomise();        
            var QNAObj = {
              ques: quessFunc(),
              answ: obj[0].notes[myDeg.degKey],
              loc: myDeg.degKey
            };
            return QNAObj;
          }

          
          //scalePosition:

      
      var delayMe = function(time){  
    
        setTimeout(function() {}, time);
      }
      $scope.theQuests;
      $scope.resolveMe = false;
      $scope.quality = "normal";

      $scope.gotItRight = true;

      $scope.questions = function(obj){   
          //console.log('got in');
          $scope.theQuests =  getQNAObj(obj);
          //console.log($scope.theQuests);        
          $scope.romanNumDeg = $scope.theQuests.ques;          
      }

      $scope.respondings = function(note){
        
        if ($scope.acci[0]){
          note = note + $scope.acci[1].sym;
          $scope.acci[0] = false;
        };
        if(note === $scope.theQuests.answ){
          $scope.correct[1]++;
          //console.log($scope.gotItRight);
          if($scope.gotItRight == true){        
            $scope.score++;
           
          };
          var sessionObject = {
            session: $scope.leStart,
            id: getNewTime(),
            mKey: $scope.theKey,
            degree: $scope.theQuests,
            correct: $scope.gotItRight
          };
          //console.log(sessionObject);
          mySession.allResponses.push(sessionObject);
          $scope.gotItRight = true;
          $scope.correct[0] = true;
          $scope.answer = "correct";
          $scope.quality = "correct"
        
          $timeout(function(){
            $scope.quality = "normal";
            $scope.searchKey($scope.theKey);
            //console.log($scope.correct[1] == $scope.quess);
            if($scope.correct[1] == $scope.quess){
              mySession.session = $scope.leStart;
              mySession.key = $scope.theKey;
              mySession.id = getNewTime();
              //console.log(mySession);
              
              $scope.myResults($scope.score, mySession);
            }
          }, 250);
          
        } else if(note != $scope.theQuests.answ){
          $scope.gotItRight = false;

          $scope.incorrect++;
          if($scope.correct[0]){

            $scope.gotItRight = false;
            $scope.correct[0] = false;
          }
          
          $scope.quality = "wrong"
          $scope.answer = "not quite, try again";
        }
      }

  });
})();


