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
      .when("/allresults", {
        templateUrl: "all_results.html",
        controller: "myCtrl"
      })
      .otherwise ({redirectTo:"/home"});

  });

  app.controller('allResultsCtrl', function($scope, $route){
    $scope.typeOfChart = 'bar';
    var myChartData;
    $scope.l = function(x){l(x);};

   var initKeyArray = [{keyName:'All', index: 0}];
   $scope.resultingKeys = addAllKeyOptions(initKeyArray, model.keys);
   $scope.allKeys = $scope.resultingKeys[0];      
   $scope.changeKey = function(){l($scope.allKeys);}

   var initDegreeArray = [{degree:'All', degKey: 0}];
   $scope.resultingDegrees = addAllKeyOptions(initDegreeArray, model.degrees);
   $scope.allDegrees = $scope.resultingDegrees[0];
   $scope.changeDegree = function(){l($scope.allDegrees);}
   
   
   $scope.selectedAction = function(){
     var key = $scope.allKeys;
     var deg = $scope.allDegrees;

     var chartLabels = getAllKeyNames();
     
        getLaData().then(function(data){    
           //console.log(data);  
            
           drawCanvas(400,400);
           sessionChart = document.getElementById("chart-result");
           var chartData = (function(){
             var key = $scope.allKeys.keyName;
             var deg = $scope.allDegrees.degree;
  
             switch([key, deg].join(' ')) {
               case 'All All':
                    //console.log(key + ' ' + deg);
                    return getAllSessAllDegChartData(data);
                    break;

               case ['All', deg].join(' '):
                    //console.log(key + ' ' + deg);
                    return getAllSessSelectedDegreeChartData(data, key, deg, 0);
                   
                    break;

               case [key, 'All'].join(' '):
                    //console.log(key + ' ' + deg);
                    getSelectedKeyAllDegreeChartData(data, key, deg, 1);
                    return getAllSessAllDegChartData(data);
                    break;
                    
              case [key, deg].join(' '):
                    //console.log(key + ' ' + deg);
                    getSelectedKeyAllDegreeChartData(data, key, deg, 2);
                    return getAllSessAllDegChartData(data);
                    break;

               default:
                    return getlastSessionChartArray(data);
             }
           })();
           var myFancyChart = populateChart(chartData, sessionChart, $scope.typeOfChart, true, chartLabels);
           myFancyChart.render();
     
          return data;
        }).catch(function(error){
          console.log(error);
        });

     
   }

  



  });
  
  app.controller('sessionResultsCtrl', function($scope, $route){
    $scope.typeOfChart = 'bar';
      var sessionChart;
       getLaData().then(function(data){
          //console.log(data); 
         
            drawCanvas(400,400);
            sessionChart = document.getElementById("chart-result");
            var chartData = getlastSessionChartArray(data);//custom for all resules
            var myFancyChart = populateChart(chartData, sessionChart, $scope.typeOfChart, false, chartData);
            myFancyChart.render();

           return data;
         }).catch(function(error){
           console.log(error);
         });

       

  });

  app.controller('myCtrl', function($scope, $location, $routeParams, $timeout) {

      getLaData().then(function(data){
        var theScore = getAllSessAllDegChartData(data);
        conditionalStyling(theScore);
      }).catch(function(error){
        console.log(error);
      });
      // model.js data
      $scope.noteNames = model.noteNames;
      $scope.accidentals = model.accidentals; 
      $scope.degrees = model.degrees; 
      $scope.keys = model.keys;
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
      $scope.allResults = function(){      
        $location.path("/allresults");      
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
      $scope.acciStat = false;
      $scope.acci = [false, ""];
      $scope.settingStat = false;
      $scope.romaOrAlpha = true;

      


      $scope.accihap = function(mod){
        $scope.acciStat = !$scope.acciStat;

        $scope.acci = [$scope.acciStat, mod];
        $scope.acciStat = false;
        console.log($scope.acciStat);
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

      $scope.toggleAcci = function(x){
        toggleAcci(x);
      }

      $scope.respondings = function(note){
        
        if ($scope.acci[0]){
          note = note + $scope.acci[1].sym;
          $scope.acci[0] = false;
          $scope.acciStat = false;
        };
        if(note === $scope.theQuests.answ){
          $scope.correct[1]++;
          $scope.acci[0] = false;          
          $scope.acciStat = false;
          clearAllAcciStyle();
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
          $scope.acci[0] = false;          
          $scope.acciStat = false;
          clearAllAcciStyle();
        }
      }

  });
})();


