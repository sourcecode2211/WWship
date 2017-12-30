'use strict';

angular.module('myApp.bible', [])

  .controller('bibleCtrl')

bibleCtrl.$inject = ['$scope', 'booksOfTheBible', 'BibleService', '$http', 'PrimaryServices','$location','$anchorScroll','$window']
function bibleCtrl($scope, booksOfTheBible, BibleService, $http, PrimaryServices,$location, $anchorScroll, $window) {
  var i, scrollPoint, settings, _ = this;
  //var element = $window.document.getElementById(id);
  var BookID, ChapterID, VerseID;
  _.booksofthebible = booksOfTheBible.booksofthebible;
  _.bibleversions = booksOfTheBible.versions;
  _.versesbychapter = booksOfTheBible.versesbychapter;
  _.chaps = [];
  _.versesinchaps = [];

  _.inProjectionMode = false;
  _.chapSelected = false;
  _.displayVerse = {};
  _.chaptercount = [];
  _.bookofbible = {};
  _.selected = true;
  _.isResult = false;
  _.showarrangementlines=false;

  _.bibleversion = "";
  _.arrangementselection = "";
  _.reference = {
    book: 0,
    chapter: 0,
    verse: 0,
    slide: 0,
    fulltextreference: "",
    bibletranslation: "none"
  };

  _.visibilityobj = {
    verseclicked: -1,
    slideclicked: -1,
};

  var maxLength = 200, trimmedString, str, verselength = 0, slidedetail = [], numwords = 0;

  _.clearverses = function () {
    _.verses = null;
    _.selected = true;
    _.reference = null;
    _.bookofbible.selected = null;
    _.isResult = false;
  };

  _.slideselected = function (verse, reference, verseIndex, slideIndex) {
   _.visibilityobj.verseclicked = verseIndex;
   _.visibilityobj.slideclicked = slideIndex;
    _.reference.verse = verseIndex + 1;
    _.reference.fulltextreference = reference;
    PrimaryServices.projectorparser("SCRIPTURE", verse, "NA", reference);
    _.showarrangementlines=true;
  };

  _.getPosition = function (string, subString, index) {
    return string.split(subString, index).join(subString).length;
  };

  _.init = function () {
    BookID=document.getElementById('bookname');
    ChapterID=document.getElementById('chapternumber');
    VerseID=document.getElementById('versenumber');

    PrimaryServices.getarrangements(1).then(function (data) {
      _.arrangements = data;
      //console.log(_.booksofthebible);
      // console.log(data);
    });

    PrimaryServices.getgeneralsettings().then(function(data) {
      settings = data;
      _.bibleversion = settings.bibleversion;
      // console.log(_.bibleversion);
  });
  };

  _.init();

  _.addtoarrangement = function () {

    var arrangepath;
    var e = document.getElementById('arrangement-id');
    var arrangepath = e.options[e.selectedIndex].value;
    //console.log(path);
    if (arrangepath) {
      PrimaryServices.addscripturetoarrangement(_.reference, arrangepath).then(function (data) {
        _.snackbarview(data);
      });
    }
    else {
      _.snackbarview('Select an Arrangement First !');
    }
    

  };

  _.bookselected = function (id) {
    _.chapSelected = false;
    _.inProjectionMode = false;
    if (!_.bibleversion || _.bibleversion === "none") {
      _.snackbarview("Choose a Bibe Translation!");
    }
    else {
      _.reference.bibletranslation =  _.bibleversion ;
      _.reference.chapter = 0;
      _.reference.verse = 0;
      _.reference.book = id;
      _.chaps = [];
      _.versesinchaps = [];
      for (i = 1; i <= _.versesbychapter[id - 1].verses.length; i++) {
        _.chaps.push(i);
      }
      // console.log(_.chaps);
    }

  };

  _.chapterselected = function (id) {
    _.chapSelected = true;
    _.inProjectionMode = false;
    _.reference.chapter = id;
    _.versesinchaps = [];
    _.reference.verse = 0;
    for (i = 1; i <= _.versesbychapter[_.reference.book - 1].verses[id - 1]; i++) {
      _.versesinchaps.push(i);
    };
    _.getchapter();
  };

  _.verseselected = function (id) {
    _.inProjectionMode = false;
    _.reference.verse = id;
    _.reference.fulltextreference = _.verses[id-1].reference;
    $location.hash('verse-'+id);
    $anchorScroll();
  };

  _.getchapter = function() {
    _.reference.bibletranslation = _.bibleversion;
    PrimaryServices.getScriptureVerse(_.reference).then(function (response) {
      var data = response.data;
      _.verses = [];
      var wordsperpage =( _.reference.bibletranslation === "newtamil"  ||  _.reference.bibletranslation === "telugu" ||  _.reference.bibletranslation === "hindi" ||  _.reference.bibletranslation === "kannada")? 12 : 26;
      for (var i = 0; i < data.length; i++) {
        var singleVerse = { reference: data[i].reference, chapter: data[i].chapter, verse: data[i].verse, slides: slidedetail = [] };
        str = data[i].versetext;
        verselength = data[i].versetext.length;
        if (data[i].versetext.length > maxLength) {
          numwords = data[i].versetext.split(" ").length - 1;
          var pages = Math.ceil(numwords / wordsperpage);
          while (pages != 0) {
            var pos = _.getPosition(str, " ", wordsperpage);
            trimmedString = str.substr(0, pos);
            str = str.substr(pos);
            pages = pages - 1;
            slidedetail.push(trimmedString + " ...");
          }
          slidedetail[slidedetail.length - 1] = slidedetail[slidedetail.length - 1].slice(0, -4);
        }
        else {
          slidedetail.push(data[i].versetext);
        }
        singleVerse.slides = slidedetail;
        slidedetail = [];
        _.verses.push(singleVerse);
      };
    });
  }

  _.onBookSelected = function() {
    // console.log(_.selectedbook);
    _.chapSelected = false;
    _.inProjectionMode = false;
    if (!_.bibleversion || _.bibleversion === "none") {
      _.snackbarview("Choose a Bibe Translation!");
    }
    else {
      _.reference.bibletranslation =  _.bibleversion ;
      _.reference.chapter = 0;
      _.reference.verse = 0;
      _.reference.book = _.selectedbook.id;
      _.chaps = [];
      _.versesinchaps = [];
      for (i = 1; i <= _.selectedbook.chaptercount; i++) {
        _.chaps.push({
          chapter: i});
      }
    }
    _.chapter = null;
    _.versevalue = null;

  };
  
  _.onChapSelected = function() {
    _.versesinchaps = [];
    _.reference.verse = 0;
    for (i = 1; i <= _.versesbychapter[_.selectedbook.id - 1].verses[_.selectedchapter.chapter - 1]; i++) {
      _.versesinchaps.push({
        verse: i});
    };
    _.reference.book = _.selectedbook.id;
    _.reference.chapter = _.selectedchapter.chapter;
    _.getchapter();
  };

  _.onVerseSelected = function() {
    _.verseselected(_.selectedverse.verse);
  }

  _.clear = function() {
    _.showarrangementlines = false;
    _.book = null;
    _.chapter = null;
    _.versevalue = null;
    BookID.focus();
  };

  _.snackbarview = function (message) {
    var x = document.getElementById("snackbar")
    x.innerHTML = message;
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
  };

};