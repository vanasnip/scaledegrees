
var model = (function(){
    var noteNames = ["a","b","c","d","e","f","g"];
    var accidentals = [{sym:"♭", state:false, name:"flat"}, {sym:"♯", state:false, name:"sharp"}]
    var degrees = [
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
    var keys = [
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

    return {
        noteNames: noteNames,
        accidentals: accidentals,
        degrees: degrees,
        keys: keys
    }
})();
