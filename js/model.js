
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
    var frq = [
      196.00,//, key:'G'
      207.65,//, key:'G#'
      220.00,//, key:'A'
      233.08,//, key:'A#'
      246.94,//, key:'B'
      261.63,//, key:'C'
      277.18,//, key:'C#'
      293.66,//, key:'D'
      311.13,//, key:'D#'
      329.63,//, key:'E'
      349.23,//, key:'F'
      369.99,//, key:'F#'
      392.00,//, key:'G'
      415.30,//, key:'G#'
      440.00,//, key:'A'
      466.16,//, key:'A#'
      493.88,//, key:'B'
      523.25,//, key:'C'
      554.36,//, key:'C#'
      587.33,//, key:'D'
      622.25,//, key:'D#'
      659.25,//, key:'E'
      698.46,//, key:'F'
      698.46,//, key:'F#'
      783.99,//, key:'G'
      783.99,//, key:'G#'
      880.00,//, key:'A'
      932.33,//, key:'A#'
      987.77
    ];//, key:'B'}];
    function getFrequencies(x){ 
      return [frq[x+0], frq[x+2], frq[x+4], frq[x+5], frq[x+7], frq[x+9], frq[x+11]];
    }
    var keys = [
      {
        keyName: "C",
        notes: ["c","d","e","f","g","a","b"],
        index: 1,
        freq: getFrequencies(5)
      },
      {
        keyName: "G",
        notes: ["g","a","b","c","d","e","f♯"],
        index: 2,
        freq: getFrequencies(0)
      },
      {
        keyName: "D",
        notes: ["d","e","f♯","g","a","b","c♯"],
        index: 3,
        freq:getFrequencies(7)
        //D, E, F♯, G, A, B, C♯
      },
      {
        keyName: "A",
        notes: ["a","b","c♯","d","e","f♯","g♯"],
        index: 4,
        freq:getFrequencies(2)
        //A, B, C♯, D, E, F♯, G♯
      },
      {
        keyName: "E",
        notes: ["e","f♯","g♯","a","b","c♯","d♯"],
        index: 5,
        freq:getFrequencies(9)
        //E, F♯, G♯, A, B, C♯, D♯
      },
      {
        keyName: "B",
        notes: ["b","c♯","d♯","e","f♯","g♯","a♯"],
        index: 6,
        freq:getFrequencies(4)
        //B, C♯, D♯, E, F♯, G♯, A♯
        //C♭, D♭, E♭, F♭, G♭, A♭, B♭
      },
      {
        keyName: "C♭",
        notes: ["c♭","d♭","e♭","f♭","g♭","a♭","b♭"],
        index: 7,
        freq:getFrequencies(4)
        //C♭, D♭, E♭, F♭, G♭, A♭, B♭
      },
      {
        keyName: "F♯",
        notes: ["f♯","g♯","a♯","b","c♯","d♯","e♯"],
        index: 8,
        freq:getFrequencies(11)
        //F♯, G♯, A♯, B, C♯, D♯, E♯
      },
      {
        keyName: "G♭",
        notes: ["g♭","a♭","b♭","c♭","d♭","e♭","f"],
        index: 9,
        freq:getFrequencies(11)
      },
      {
        keyName: "D♭",
        notes: ["d♭","e♭","f","g♭","a♭","b♭","c"],
        index: 10,
        freq:getFrequencies(6)
      },
      {
        keyName: "A♭",
        notes: ["a♭","b♭","c","d♭","e♭","f","g"],
        index: 11,
        freq:getFrequencies(1)
      },
      {
        keyName: "E♭",
        notes: ["e♭","f","g","a♭","b♭","c","d"],
        index: 12,
        freq:getFrequencies(8)
      },
      {
        keyName: "B♭",
        notes: ["b♭","c","d","e♭","f","g","a"],
        index: 13,
        freq:getFrequencies(3)
      },
      {
        keyName: "F",
        notes: ["f","g","a","b♭","c","d","e"],
        index: 14,
        freq:getFrequencies(11)
      }
      
    ];

    return {
        noteNames: noteNames,
        accidentals: accidentals,
        degrees: degrees,
        keys: keys,
        frq: frq
    }
})();
