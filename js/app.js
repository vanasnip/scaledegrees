(function(){
  
  var app = angular.module('myApp', ["ngRoute"]);

  app.config(function($routeProvider){
    $routeProvider
      .when("/home", {
        templateUrl: "home.html",
        controller: "myCtrl"
      })
      .when("/keytest/:theKey/:leStart/:quess/:degStyle/:sound", {
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
 
   
   
   $scope.selectedAction = function(){
     var key = $scope.allKeys;
     var deg = $scope.allDegrees;

     var chartLabels;
     
        getLaData().then(function(data){    
           //console.log(data);  
            
           drawCanvas(400,400);
           sessionChart = document.getElementById("chart-result");
           var cDat = (function(){
             var key = $scope.allKeys.keyName;
             var deg = $scope.allDegrees.degree;
  
             switch([key, deg].join(' ')) {
               case 'All All':
                    //console.log(key + ' ' + deg);
                    chartLabels = getAllKeyNames();
                    var context = getAllSessAllDegChartData(data);
                    return  {                    
                      chartData: context,
                      chartType: 'bar',
                      visibility: true,
                      chartLabels: chartLabels
                    }
                     
                    break;

               case ['All', deg].join(' '):
                    //console.log(key + ' ' + deg);
                    chartLabels = getAllKeyNames();
                    var context =  getAllSessSelectedDegreeChartData(data, key, deg);
                    return  {                    
                      chartData: context,
                      chartType: 'bar',
                      visibility: true,
                      chartLabels: chartLabels
                    }
                    
                    break;

               case [key, 'All'].join(' '):
                    //console.log(key + ' ' + deg);
   
                    chartLabels = getAllDegreeNames();
                    var context = getSelectedKeyAllDegreeChartData(data, key, deg);
                    return  {                    
                      chartData: context,
                      chartType: 'bar',
                      visibility: true,
                      chartLabels: chartLabels
                    }
                    
                    break;
                    
              case [key, deg].join(' '):
                    var context = getSelKeySelDegreeChartData(data, key, deg);
                    chartLabels = context;
                    return  {                    
                      chartData: context,
                      chartType: 'bar',
                      visibility: false,
                      chartLabels: context
                    }
                    
                    break;

               default:
                    return getlastSessionChartArray(data);
             }
           })();
           var myFancyChart = populateChart(cDat.chartData, sessionChart, cDat.chartType, cDat.visibility, cDat.chartLabels);
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
    
      $scope.conditionallyFormat = function(){
        getLaData().then(function(data){
          var theScore = getAllSessAllDegChartData(data);
          conditionalStyling(theScore);
        }).catch(function(error){
          console.log(error);
        });
      }
      
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
      $scope.sound = $routeParams.sound;
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
          $location.path("/keytest/" + $scope.selectedKey +  "/" + $scope.leStart + "/" + $scope.db_enquiries + "/" + $scope.db_romaOrAlpha + "/" + $scope.db_sound);
          
          
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
    
          return $scope.selectedKey;

      }

      $scope.noQuestion = [20,10,50,100,2];
      
      $scope.score = 0;
      $scope.correct = [true, 0];
      $scope.incorrect = 0;
      $scope.romanNumDeg = "";
      $scope.dispDegree = "";
      $scope.answer = "";
      $scope.acciStat = false;
      $scope.acci = [false, ""];
      $scope.settingStat = false;
      //$scope.romaOrAlpha = true;
      var enqPos ;
      $scope.db_romaOrAlpha;
      $scope.db_enquiries =  $scope.noQuestion[0];
      $scope.db_sound;
      $scope.playSound = function(note){
        playSound(note);
      }
     
      
 
      var chkEnq = function( comp1, comp2){     
        for(var i = 0; i < comp2.length; i++){         
          if(comp1 == comp2[i]){
            return i;
          } 
        }
        return 0;
      }
     

      
      $scope.changeSettings = function(){
       
        var settings = {
          degreeLabel: $scope.db_romaOrAlpha,
          plcInArr: chkEnq($scope.db_enquiries, $scope.noQuestion),
          sound: $scope.db_sound
        }
        //idbApp.clearSettings();
        idbApp.addSettings(settings);
        settingsBridge();
        //console.log('settings changed');
      }
      
      function settingsBridge(){
        idbApp.getSettings().then(function(data){
            checkSettings(data);
        }).catch(function(error){
          console.log(error);
        });
      }
      settingsBridge();

      
   
       

      function checkSettings(data){
        var settings;
        if(data.length == 0){
            settings = {
              degreeLabel: true,
              plcInArr: 0,
              sound: true
          }          
          idbApp.addSettings(settings);
          enqPos = settings.plcInArr;
          $scope.db_enquiries = $scope.noQuestion[enqPos];
          $scope.db_romaOrAlpha = settings.degreeLabel;
          $scope.db_sound = settings.sound;
        }else if(data.length > 0){
          settings = data[data.length - 1];
        }
        $scope.db_romaOrAlpha = settings.degreeLabel;
        enqPos = settings.plcInArr;  
        $scope.db_enquiries =  $scope.noQuestion[enqPos]; 
        $scope.db_sound = settings.sound;
        
        //console.log(settings);  
      }

      

      
      
  
      


      $scope.accihap = function(mod){
        $scope.acciStat = !$scope.acciStat;

        $scope.acci = [$scope.acciStat, mod];
        $scope.acciStat = false;
        //console.log($scope.acciStat);
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
        var num = randomNumber();
        var randomDegree = $scope.degrees[num];
        // randomDegree.frq = $scope.freq[num];
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
 
        return elapsed;
      }

      var getQNAObj = function(obj){ 
        //console.log(obj);
          var quessFunc = function(){
            
                if($scope.degStyle === "true"){
                  
                  return myDeg.degree;
                } else if($scope.degStyle === "false") {
                  
                  return myDeg.alphaN;
                }
                
              };
            var myDeg = randomise();    
            //console.log(myDeg);    
            var QNAObj = {
              ques: quessFunc(),
              answ: obj[0].notes[myDeg.degKey],
              loc: myDeg.degKey,
              frq: obj[0].freq[myDeg.degKey]
            };
            //console.log(QNAObj);
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
          console.log($scope.db_sound);
          if($scope.db_sound){
            playSound($scope.theQuests.frq); 
          }
                 
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


