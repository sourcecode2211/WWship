'use strict';

angular.module('myApp.stateservices', [])
    .service('StateContainer', function ($http, $q) { 
        var dirPathVideo ="C:\\word-and-worship\\appdata\\videos", dirPathImages="C:\\word-and-worship\\appdata\\images";
        var songslist = [], scripturelist = [];

        var addsong = function(songpath, songname) {
            songslist.unshift({
                filepath: songpath,
                desc: songname
            });
        };

        var addscripture = function(reference) {
            console.log(reference);
            scripturelist.unshift({
                reference: reference
            });
        };

        var getrecentsongs = function() {
            return songslist;
        };

        var getvideopath = function() {
            return dirPathVideo;
        }

        var setvideopath = function(p) {
            dirPathVideo = p;
        }

        var getimagepath = function() {
            return dirPathImages;
        }

        var setimagepath = function(p) {
            dirPathImages = p;
        }

        return { 
            addsong: addsong,
            addscripture: addscripture,
            getrecentsongs: getrecentsongs,
            getvideopath: getvideopath,
            setvideopath: setvideopath,
            getimagepath: getimagepath,
            setimagepath: setimagepath
        }
    });