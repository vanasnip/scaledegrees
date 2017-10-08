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
    var average = num / array.length;
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

function categoriseSessions(names, data){
    var allArray = [];
    console.log(data);
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
 
    console.log(allArray);
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
    console.log(finalArray);
    return finalArray;
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

function chartMaker(){
    
}