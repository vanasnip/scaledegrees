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

function sessionsOfAKey(session) {}

function cleanResultTime(rawTime) {
    var elapsed = Math.floor(rawTime / 100) / 10;
    if (Math.round(elapsed) == elapsed) {
        elapsed += '.0';
    };
    return elapsed;
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
    console.log(context);
    loc.appendChild(canvas);
    return context;
}
async function stallData() {
    return await idbApp.getSessions()
};
function getAllSessAllDegreeChartData(asyncData){
    //array of all key names - for x axis
    //array of avarage of of the last 5 sessions for each key
}

function getlastSessionChartArray(asyncData) {
    //process data
    var finalArray = [];
    // which key to result 
    var lastSession = getLatestSession(asyncData);
    //{session: "1506758731436", id: 1506758735481, key: "C", answers: Array(2)}
    filterAllSessions(asyncData);
    //get latest session
    function getLatestSession(all) {
        console.log(all);
        var lastKey = all.length - 1;
        //console.log(lastKey);
        var last = all[lastKey];
        console.log(last.key);
        return last;
    }
    // filter all session of that key
    function filterSession(session) {
        if (session.key == lastSession.key) {
            return true;
        } else {
            return false;
        }
    }

    function filterAllSessions(data) {
        var session = data;
        for (var i = 0; i < asyncData.length; i++) {
            //console.log(session[i].id);
            if (filterSession(session[i])) {
                addToFinalArray(session[i]);
            }
        }
    }
    // add to array of average respose for session of that key
    function addToFinalArray(session) {
        //console.log(session);
        //get avarage time for a session
        var sessionAverage = getAvarage(session);
        finalArray.push(sessionAverage);
    }
    return finalArray
}

function populateChart(data, theChart, chartType) {
    //console.log(data);
    let chartObject = new Chart(theChart, {
        type: chartType,
        data: {
            labels: data,
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
                    display: false
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