function l(input){
    console.log(input);
}

function addToAllSessionData(item) {
    allSessionData.push(item);
}

function cleanSessionData(data) {
    for (var i = 0; i < data.length; i++) {
        addToAllSessionData(data[i]);
        return data;
    }
};



function cleanResultTime(rawTime) {
    var elapsed = Math.floor(rawTime / 100) / 10;
    if (Math.round(elapsed) == elapsed) {
        elapsed += '.0';
    };
    return elapsed;
}

function getArrayAverage(array){
    var num = 0;
    for(var i = 0; i < array.length; i++){
        num = num + array[i];
    }
    if(array.length > 0){
        var average = num / array.length;
    } else {
        var average = 0;
    }
    
    return average
}

function getAvarage(session) {
    //console.log(session);
    var start = cleanResultTime(Number(session.session));
    var fin = cleanResultTime(session.id);
    //console.log(start + " " + fin);
    var avarage = ((fin - start) / session.answers.length).toFixed(2);
    return parseFloat(avarage);
}

function drawCanvas(height, width) {
    var loc = document.getElementById('chart-div');
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", "chart-result");
    canvas.height = height;
    canvas.width = width;
    var context = canvas.getContext('2d');
    //console.log(context);
    loc.appendChild(canvas);
   
    return context;
}
function filterSession(session, comp) {
    if (session.key == comp.key) {
        return true;
    } else {
        return false;
    }
}
function filterKeys(session, comp) {
    if (session.key == comp) {
        return true;
    } else {
        return false;
    }
}
function addToFinalArray(session) {
    //console.log(session);
    //get avarage time for a session
    var sessionAverage = getAvarage(session);
    return sessionAverage;
}
function filterTheSession(session) {
    var array = [];
    
}

function filterAllSessions(data, comp) {
    var array = [];
    var session = data;
    //console.log(session);
    for (var i = 0; i < session.length; i++) {
        //console.log(session[i]);
        if (filterSession(session[i], comp)) {
            //console.log(session[i]);
            array.push(addToFinalArray(session[i]));
        }
    }
    return array;
}

async function stallData() {
    return await idbApp.getSessions()
};
function getAllKeyNames(){
    var allKeysArray = [];
    for(var key of model.keys){
        allKeysArray.push(key.keyName);
    }
    return allKeysArray;
}
function getAllDegreeNames(){
    var allDegreeArray = [];
    for(var deg of model.degrees){
        allDegreeArray.push(deg.degree);
    }
    return allDegreeArray;
}

function categoriseSessions(names, data){
    
    var allArray = [];
    //console.log(data);
    //for each key scan put in keySet array, then put in array when don
    // session loop until name matches
    for(var name of names){
        var keyObj = {
            name: name,
            keyData: []
        }

        //console.log(name);
        for(var session of data){
            //console.log(filterKeys(session, name));
            if(filterKeys(session, name)){
                keyObj.keyData.push(session);
            }
        }        
        allArray.push(keyObj);
    }

    //when match 
 
    //console.log(allArray);
    return allArray;
}

function getLastFive(srtArray){
    var lala = srtArray;
    for(cat of srtArray){
        var array = [];
        if(cat.keyData.length > 4){
            for(var i = 5; i >0; i--){
                var displace = cat.keyData.length - i;
                var eligableRec = cat.keyData[displace];
                array.push(eligableRec)
            }
            cat.keyData = array;
        }
    }
    //console.log(srtArray);
    return lala;
}

function getLastFiveAvg(array){
    var finalArray = [];
    //console.log(array);
    for(var keyObj of array){
        var tempArray = [];
        if(keyObj.keyData.length > 0){
            for(var session of keyObj.keyData){
                tempArray.push(getAvarage(session));
            }
            finalArray.push(getArrayAverage(tempArray));
        } else {
            finalArray.push(0);
        }
    }
    //console.log(finalArray);
    return finalArray;
} 

function getDegrees(arr){
    var answers = [];
    for(var ans of arr.answers){
        answers.push(ans);
    }
    return answers; 
}
function getExtractedAnswers(keysCatFive){
    var array = [];
    for(var key of keysCatFive){
        var keyDegDeg = []
        for(var arr of key.keyData){
            keyDegDeg.push(getDegrees(arr));
        }
        array.push(keyDegDeg);
    }
    return array;
}
function getSortedAnswers(array){
    var finalArray = [];
    for(var key of array){
        //****************** */
        var tempArray = [];
        for (var answers of key){
            for(var ans of answers){
                tempArray.push(ans);
            }
        }
        finalArray.push(tempArray);        
    }
   // console.log(finalArray);
    return finalArray;
}
function getSortedDegrees(array){
    //console.log(array);
    finalArray = [];
    for(var ans of array){
        for(var i = 0; i < ans.length; i++){
            var time;            
            if(i == 0){
                time = cleanResultTime(ans[i].id - ans[i].session);
            }else {
                if(ans[i].session == ans[i - 1].session){
                    time = cleanResultTime(ans[i].id - ans[i - 1].id);
                }
            }
            var degObj = {
                key: ans[i].mKey,
                degree: ans[i].degree,
                correct: ans[i].correct,
                time: time
            }
            finalArray.push(degObj);
        }
    }
    //console.log(finalArray);
    return finalArray;
}
function getFilteredDeg(data,key,deg,xAxis){
    var allDegArray = []
    for(var xKey of xAxis){
        var tempArray = [];
        for(var srtDeg of data){
            if(srtDeg.key == xKey && srtDeg.degree.ques == deg){
                tempArray.push(srtDeg.time);
            }
        }
        var obj = {
            name: xKey,
            keyData: tempArray
        }
        allDegArray.push(obj);
    }
    //console.log(allDegArray);
    return allDegArray;
}
function getFinalArrayPrep(array){
    //for each keydata, get array avaray
    var finalArray = [];
    for(var key of array){
        finalArray.push(getArrayAverage(key.keyData));
    }
    return finalArray;
}
function sortAndGetDegrees(asyncData){
    var xAxis = getAllKeyNames();
    var categoryKeys = categoriseSessions(xAxis, asyncData);
    var lastFiveSession = getLastFive(categoryKeys);
    var extractedAnswers = getExtractedAnswers(lastFiveSession);
    var sortAnswers = getSortedAnswers(extractedAnswers);
    var sortDegrees = getSortedDegrees(sortAnswers);
    return {
        degrees: sortDegrees,
        axis: xAxis
    };
}
function getFilteredSelectedKet(Data, key){
    var array = [];
    for(var ans of Data){
        if(ans.key == key){
            array.push(ans);
        }
    }
    //console.log(array)
    return array;
}
function getDegreeCategoriser(data){
    var xAxis = getAllDegreeNames();
    var array = [];
    for (var deg of xAxis){
        var tempArray = []
        for(var ans of data){
            var i = 0;
            if(ans.correct && ans.degree.ques == deg){
               
                tempArray.push(ans.time);
            }
        }
        var obj = {
            deg: deg,
            keyData: tempArray
        }
        array.push(obj);
    }
    //console.log(array);
    return array;
}
function getSelectedKeyAllDegreeChartData(asyncData,key,deg,situ){
    
    var sortDegrees = sortAndGetDegrees(asyncData);
    var filterIntoSelectedKey = getFilteredSelectedKet(sortDegrees.degrees, key)
    var categoriseIntoDegrees = getDegreeCategoriser(filterIntoSelectedKey)
    var lastFiveInstances = getLastFive(categoriseIntoDegrees);
    var lastFiveAvg = getFinalArrayPrep(lastFiveInstances)
    console.log(lastFiveAvg);
    return lastFiveAvg;

    

}


function getAllSessSelectedDegreeChartData(asyncData,key,deg,situ){
    var sortDegrees = sortAndGetDegrees(asyncData);
    var filteredSortedDeg = getFilteredDeg(sortDegrees.degrees, key, deg, sortDegrees.axis);
    var sendFinalArray = getFinalArrayPrep(filteredSortedDeg);
    return sendFinalArray;
}

function getAllSessAllDegChartData(asyncData){
    //array of all key names - for x axis
    var xAxis = getAllKeyNames();
    var categoryKeys = categoriseSessions(xAxis, asyncData); //array 12 elements
    //for each key..
    var lastFiveSession = getLastFive(categoryKeys);
    var lastFiveAvg = getLastFiveAvg(lastFiveSession)
    return lastFiveAvg;
}   

function getlastSessionChartArray(asyncData) {
    var lastSession = getLatestSession(asyncData);
    //{session: "1506758731436", id: 1506758735481, key: "C", answers: Array(2)}
    
    //process data
    var finalArray = filterAllSessions(asyncData, lastSession);
    // which key to result 

    //get latest session
    function getLatestSession(all) {
        //console.log(all);
        var lastKey = all.length - 1;
        //console.log(lastKey);
        var last = all[lastKey];
        //console.log(last.key);
        return last;
    }
    // filter all session of that key
    

    // add to array of average respose for session of that key
    

 
    return finalArray;
}

function populateChart(data, theChart, chartType, xAxisStat, chartLabels) {
    //console.log(data);
    let chartObject = new Chart(theChart, {
        type: chartType,
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Avg Time (sec)',
                data: data,
                borderColor: "#04b8bb",
                fill: false,
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    display: xAxisStat
                }]
            }
        }
    });
    return chartObject;
};

function getLaData(){
    return new Promise(async function(resolve, reject) {
        var allData = await stallData();
        window.addEventListener('unhandledrejection', event => {
            location.reload();
            // Prevent error output on the console:
            console.log('Reason: ' + event.reason);
            event.preventDefault();
        });
        //console.log(allData);
        if (allData.length > 0) {
            resolve(allData);
        } else {
            reject('data was not fetched');
        }
    });
}

function addAllKeyOptions(array, dataSrc){
    for(var i = 0; i < dataSrc.length; i++){
        array.push(dataSrc[i]);
    }
    return array;
}

function toggleAcci(set){

    if(set == 'flat'){
        var other = document.getElementsByClassName('sharp')[0];
        other.classList.remove('sharp-clicked');
        l(other);
    } else {
        var other = document.getElementsByClassName('flat')[0];
        other.classList.remove('flat-clicked');
        l(other);
    }
    
    var element = document.getElementsByClassName(set)[0];
    var classSet = set + '-clicked';
    l(element);


    element.classList.toggle(classSet);
}

function clearAllAcciStyle(){
    
    var sharp = document.getElementsByClassName('sharp')[0];
    var flat = document.getElementsByClassName('flat')[0];

    sharp.classList.remove('sharp-clicked');
    flat.classList.remove('flat-clicked');

    console.log('entered clear all styles');

}
function filterStyles(key){
    var keyButton = document.getElementsByClassName(key.key)[0];
    var addClass;
   
    switch(true){
        case (key.time == 0):
            //console.log(key.time + ' white');
            break;
        case (key.time < 1.5):
            //console.log(0);
            addClassColour = 'green';       
            keyButton.classList.add(addClassColour);
            break;
        case (key.time < 2):
            //console.log(key.time + ' lime');
            addClassColour = 'lime';       
            keyButton.classList.add(addClassColour);
            break;
        case (key.time < 3):
            //console.log(key.time + ' yello');
            addClassColour = 'yellow';       
            keyButton.classList.add(addClassColour);
            break;
        case (key.time < 4):
            //console.log(key.time + ' orange');
            addClassColour = 'orange';       
            keyButton.classList.add(addClassColour);
            break;
        case (key.time > 4):
            //console.log(key.time + ' red'); 
            addClassColour = 'red';       
            keyButton.classList.add(addClassColour);
            break;  
        default:
            console.log('going back in time are we?');
            break;  
    }
}
function conditionalStyling(array){
    // loop through all avarages
    // label with keyname 
    var keyObjArray = [];
    for(var i = 0; i < array.length; i++){
        var obj = {
            key: model.keys[i].keyName,
            time: array[i]
        }
        keyObjArray.push(obj);
    }
  
    for(var key of keyObjArray){
        filterStyles(key); 
    }
        // filter each results
        //apply class according to filter
}

