'use strict';

angular.module('myApp.settings', [])

    .controller('settingsCtrl')

    settingsCtrl.$inject = ['$scope', '$http', 'PrimaryServices'];


function settingsCtrl($scope, $http, PrimaryServices) { 
    var _=this;
    var scriptureBgcolor,scriptureFontcolor,scriptureFontsizeVerse,scriptureFontsizeReference,scriptureRadio,GUID;
    _.selection = 0;
    _.settingsdata={};

    _.view = function(id) {
        _.selection = id;
    }

    _.init=function() {
        PrimaryServices.getVideoInformation().then(function(data) {
            console.log(data);
            _.settingsdata = data;
        });
    };

    _.init();

    _.savegeneral = function() {
        var e = document.getElementById('language');
        scriptureBgcolor = e.options[e.selectedIndex].value;

        e = document.getElementById('translation');
        scriptureFontcolor = e.options[e.selectedIndex].value;

        GUID = createGuid();
        _.settingsdata.general.GUID = GUID;
        _.settingsdata.general.language = scriptureBgcolor;
        _.settingsdata.general.bibleversion = scriptureFontcolor;

        PrimaryServices.setVideoInformation(_.settingsdata).then(function(data) {
            console.log(data);
        });
    };


    _.savescripture = function() {
        scriptureBgcolor = document.getElementById('scripture-bgcolor').value;
        scriptureBgcolor = /^#[0-9a-f]{3,6}$/i.test(scriptureBgcolor) ? scriptureBgcolor : "#000000";
        scriptureFontcolor = document.getElementById('scripture-fontcolor').value;
        scriptureFontcolor = /^#[0-9a-f]{3,6}$/i.test(scriptureFontcolor) ? scriptureFontcolor : "#FFFFFF";
        scriptureFontsizeVerse = document.getElementById('scripture-fontsize-verse').value + "px";
        scriptureFontsizeReference = document.getElementById('scripture-fontsize-reference').value + "px";
        console.log(document.getElementById("result").value);
        GUID = createGuid();
        _.settingsdata.scripture.GUID = GUID;
        _.settingsdata.scripture.bgcolor = scriptureBgcolor;
        _.settingsdata.scripture.fontReference = scriptureFontsizeReference;
        _.settingsdata.scripture.fontcolor = scriptureFontcolor;
        _.settingsdata.scripture.fontsize = scriptureFontsizeVerse;
        _.settingsdata.scripture.textTransform = document.getElementById("result").value;
        PrimaryServices.setVideoInformation(_.settingsdata).then(function(data) {
            console.log(data);
        });
    };

    _.savelyrics = function() {
        scriptureBgcolor = document.getElementById('lyrics-bgcolor').value;
        scriptureBgcolor = /^#[0-9a-f]{3,6}$/i.test(scriptureBgcolor) ? scriptureBgcolor : "#000000";
        scriptureFontcolor = document.getElementById('lyrics-fontcolor').value;
        scriptureFontcolor = /^#[0-9a-f]{3,6}$/i.test(scriptureFontcolor) ? scriptureFontcolor : "#FFFFFF";
        scriptureFontsizeVerse = document.getElementById('lyrics-fontsize-verse').value + "px";
        console.log(document.getElementById("result").value);
        GUID = createGuid();
        _.settingsdata.lyrics.GUID = GUID;
        _.settingsdata.lyrics.bgcolor = scriptureBgcolor;
        _.settingsdata.lyrics.fontcolor = scriptureFontcolor;
        _.settingsdata.lyrics.fontsize = scriptureFontsizeVerse;
        _.settingsdata.lyrics.textTransform = document.getElementById("result").value;
        PrimaryServices.setVideoInformation(_.settingsdata).then(function(data) {
            console.log(data);
        });
    };

    _.savemarquee = function() {
        scriptureBgcolor = document.getElementById('marquee-bgcolor').value;
        scriptureBgcolor = /^#[0-9a-f]{3,6}$/i.test(scriptureBgcolor) ? scriptureBgcolor : "#000000";
        scriptureFontcolor = document.getElementById('marquee-fontcolor').value;
        scriptureFontcolor = /^#[0-9a-f]{3,6}$/i.test(scriptureFontcolor) ? scriptureFontcolor : "#FFFFFF";
        scriptureFontsizeVerse = document.getElementById('marquee-fontsize').value + "px";
        console.log(document.getElementById("result").value);
        GUID = createGuid();
        _.settingsdata.marquee.GUID = GUID;
        _.settingsdata.marquee.bgcolor = scriptureBgcolor;
        _.settingsdata.marquee.fontcolor = scriptureFontcolor;
        _.settingsdata.marquee.fontsize = scriptureFontsizeVerse;
        _.settingsdata.marquee.textTransform = document.getElementById("result").value;
        PrimaryServices.setVideoInformation(_.settingsdata).then(function(data) {
            console.log(data);
        });
    };

    function createGuid()
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
}