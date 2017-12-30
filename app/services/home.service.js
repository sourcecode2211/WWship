'use strict';

angular.module('myApp.services', [])
.service('BibleService', function ($http, $q) {
  var _this = this;
  this.returnLyrics = function(version,book) {
    console.log(version + " and " + book);
    var s = String(this);
    var url;
    while (s.length < (book || 2)) {s = "0" + s;}
    url = "/bible/"+version+"/01.json";
    console.log(url);
    var defer = $q.defer();
    $http.get(url)
    .success(function(data) {
      angular.extend(_this, data);
      defer.resolve();
    })
    .error(function() {
      defer.reject('could not find '+url);
    });
    return defer.promise;
  }
})

.service('booksOfTheBible', function ($http, $q) {
  var _this = this;
  this.versions = [
    {id:1,dir:'niv',version:'New International Version ',code:'NIV'},
    {id:2,dir:'kjv',version:'King James Version ',code:'KJV'},
    {id:3,dir:'newtamil',version:'பரிசுத்த வேதாகமம் - TAMIL',code:'ERV TAMIL'},
    {id:4,dir:'kannada',version:'ಪವಿತ್ರ ಬೈಬಲ್ - KANNADA',code:'KANNADA'},
    {id:5,dir:'hindi',version:'पवित्र बाइबिल - HINDI',code:'HINDI'},
    {id:6,dir:'telugu',version:'పవిత్ర బైబిల్ - TELUGU',code:'TELUGU'},
    {id:6,dir:'nkjv',version:'New King James Version',code:'NKJV'}
  ];
  this.booksofthebible = [
    {id:1,book:'Genesis',chaptercount:50},
    {id:2,book:'Exodus',chaptercount:40},
    {id:3,book:'Leviticus',chaptercount:27},
    {id:4,book:'Numbers',chaptercount:36},
    {id:5,book:'Deuteronomy',chaptercount:34},
    {id:6,book:'Joshua',chaptercount:24},
    {id:7,book:'Judges',chaptercount:21},
    {id:8,book:'Ruth',chaptercount:4},
    {id:9,book:'1 Samuel',chaptercount:31},
    {id:10,book:'2 Samuel',chaptercount:24},
    {id:11,book:'1 Kings',chaptercount:22},
    {id:12,book:'2 Kings',chaptercount:25},
    {id:13,book:'1 Chronicles',chaptercount:29},
    {id:14,book:'2 Chronicles',chaptercount:36},
    {id:15,book:'Ezra',chaptercount:10},
    {id:16,book:'Nehemiah',chaptercount:13},
    {id:17,book:'Esther',chaptercount:10},
    {id:18,book:'Job',chaptercount:42},
    {id:19,book:'Psalms',chaptercount:150},
    {id:20,book:'Proverbs',chaptercount:31},
    {id:21,book:'Ecclesiastes',chaptercount:12},
    {id:22,book:'Song of Songs',chaptercount:8},
    {id:23,book:'Isaiah',chaptercount:66},
    {id:24,book:'Jeremiah',chaptercount:52},
    {id:25,book:'Lamentations',chaptercount:5},
    {id:26,book:'Ezekiel',chaptercount:48},
    {id:27,book:'Daniel',chaptercount:12},
    {id:28,book:'Hosea',chaptercount:14},
    {id:29,book:'Joel',chaptercount:3},
    {id:30,book:'Amos',chaptercount:9},
    {id:31,book:'Obadiah',chaptercount:1},
    {id:32,book:'Jonah',chaptercount:4},
    {id:33,book:'Micah',chaptercount:7},
    {id:34,book:'Nahum',chaptercount:3},
    {id:35,book:'Habakkuk',chaptercount:3},
    {id:36,book:'Zephaniah',chaptercount:3},
    {id:37,book:'Haggai',chaptercount:2},
    {id:38,book:'Zechariah',chaptercount:14},
    {id:39,book:'Malachi',chaptercount:4},
    {id:40,book:'Matthew',chaptercount:28},
    {id:41,book:'Mark',chaptercount:16},
    {id:42,book:'Luke',chaptercount:24},
    {id:43,book:'John',chaptercount:21},
    {id:44,book:'Acts',chaptercount:28},
    {id:45,book:'Romans',chaptercount:16},
    {id:46,book:'1 Corinthians',chaptercount:16},
    {id:47,book:'2 Corinthians',chaptercount:13},
    {id:48,book:'Galatians',chaptercount:6},
    {id:49,book:'Ephesians',chaptercount:6},
    {id:50,book:'Philippians',chaptercount:4},
    {id:51,book:'Colossians',chaptercount:4},
    {id:52,book:'1 Thessalonians',chaptercount:5},
    {id:53,book:'2 Thessalonians',chaptercount:3},
    {id:54,book:'1 Timothy',chaptercount:6},
    {id:55,book:'2 Timothy',chaptercount:4},
    {id:56,book:'Titus',chaptercount:3},
    {id:57,book:'Philemon',chaptercount:1},
    {id:58,book:'Hebrews',chaptercount:13},
    {id:59,book:'James',chaptercount:5},
    {id:60,book:'1 Peter',chaptercount:5},
    {id:61,book:'2 Peter',chaptercount:3},
    {id:62,book:'1 John',chaptercount:5},
    {id:63,book:'2 John',chaptercount:1},
    {id:64,book:'3 John',chaptercount:1},
    {id:65,book:'Jude',chaptercount:1},
    {id:66,book:'Revelation',chaptercount:22}
  ];


  this.versesbychapter = [{	bookindex:1,
    verses:[31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26]
  },{	bookindex:2,
    verses:[22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38]
  },{	bookindex:3,
    verses:[17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34]
  },{	bookindex:4,
    verses:[54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13]
  },{	bookindex:5,
    verses:[46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12]
  },{	bookindex:6,
    verses:[18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33]
  },{	bookindex:7,
    verses:[36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25]
  },{	bookindex:8,
    verses:[22,23,18,22]
  },{	bookindex:9,
    verses:[28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,22,44,25,12,25,11,31,13]
  },{	bookindex:10,
    verses:[27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25]
  },{	bookindex:11,
    verses:[53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53]
  },{	bookindex:12,
    verses:[18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30]
  },{	bookindex:13,
    verses:[54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30]
  },{	bookindex:14,
    verses:[17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23]
  },{	bookindex:15,
    verses:[11,70,13,24,17,22,28,36,15,44]
  },{	bookindex:16,
    verses:[11,20,32,23,19,19,73,18,38,39,36,47,31]
  },{	bookindex:17,
    verses:[22,23,15,17,14,14,10,17,32,3]
  },{	bookindex:18,
    verses:[22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17]
  },{	bookindex:19,
    verses:[6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6,7,23,13,11,11,17,12,8,12,11,10,13,20,7,35,36,5,24,20,28,23,10,12,20,72,13,19,16,8,18,12,13,17,7,18,52,17,16,15,5,23,11,13,12,9,9,5,8,28,22,35,45,48,43,13,31,7,10,10,9,8,18,19,2,29,176,7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,13,10,7,12,15,21,10,20,14,9,6]
  },{	bookindex:20,
    verses:[33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31]
  },{	bookindex:21,
    verses:[18,26,22,16,20,12,29,17,18,20,10,14]
  },{	bookindex:22,
    verses:[17,17,11,16,16,13,13,14]
  },{	bookindex:23,
    verses:[31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24]
  },{	bookindex:24,
    verses:[19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34]
  },{	bookindex:25,
    verses:[22,22,66,22,22]
  },{	bookindex:26,
    verses:[28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35]
  },{	bookindex:27,
    verses:[21,49,30,37,31,28,28,27,27,21,45,13]
  },{	bookindex:28,
    verses:[11,23,5,19,15,11,16,14,17,15,12,14,16,9]
  },{	bookindex:29,
    verses:[20,32,21]
  },{	bookindex:30,
    verses:[15,16,15,13,27,14,17,14,15]
  },{	bookindex:31,
    verses:[21]
  },{	bookindex:32,
    verses:[17,10,10,11]
  },{	bookindex:33,
    verses:[16,13,12,13,15,16,20]
  },{	bookindex:34,
    verses:[15,13,19]
  },{	bookindex:35,
    verses:[17,20,19]
  },{	bookindex:36,
    verses:[18,15,20]
  },{	bookindex:37,
    verses:[15,23]
  },{	bookindex:38,
    verses:[21,13,10,14,11,15,14,23,17,12,17,14,9,21]
  },{	bookindex:39,
    verses:[14,17,18,6]
  },{	bookindex:40,
    verses:[25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20]
  },{	bookindex:41,
    verses:[45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20]
  },{	bookindex:42,
    verses:[80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53]
  },{	bookindex:43,
    verses:[51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25]
  },{	bookindex:44,
    verses:[26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31]
  },{	bookindex:45,
    verses:[32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27]
  },{	bookindex:46,
    verses:[31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24]
  },{	bookindex:47,
    verses:[24,17,18,18,21,18,16,24,15,18,33,21,14]
  },{	bookindex:48,
    verses:[24,21,29,31,26,18]
  },{	bookindex:49,
    verses:[23,22,21,32,33,24]
  },{	bookindex:50,
    verses:[30,30,21,23]
  },{	bookindex:51,
    verses:[29,23,25,18]
  },{	bookindex:52,
    verses:[10,20,13,18,28]
  },{	bookindex:53,
    verses:[12,17,18]
  },{	bookindex:54,
    verses:[20,15,16,16,25,21]
  },{	bookindex:55,
    verses:[18,26,17,22]
  },{	bookindex:56,
    verses:[16,15,15]
  },{	bookindex:57,
    verses:[25]
  },{	bookindex:58,
    verses:[14,18,19,16,14,20,28,13,28,39,40,29,25]
  },{	bookindex:59,
    verses:[27,26,18,17,20]
  },{	bookindex:60,
    verses:[25,25,22,19,14]
  },{	bookindex:61,
    verses:[21,22,18]
  },{	bookindex:62,
    verses:[10,29,24,21,21]
  },{	bookindex:63,
    verses:[13]
  },{	bookindex:64,
    verses:[14]
  },{	bookindex:65,
    verses:[14]
  },{	bookindex:66,
    verses:[20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,21]
  }];
});