'use strict';

angular.module('myApp.electronservices', [])
    .service('GenericService', function ($http, $q) {
        const desktopCapturer = require('electron')
        const ipcRender = require('electron').ipcRenderer;
        var findInFiles = require('find-in-files');
        const jsonseed = '{"songs":[],"scripture":[],"audio":[],"video":[],"images":[],"slides":[]}';
        var fs = require('fs');
        var jsonfile = require('jsonfile')

        var validation = true;
        // const BASE_DIR = path.join(__dirname, '/data');

        const BASE_DIR = 'C:\word-and-worship\appdata';
        // const BASE_DIR = '/Users/stkprabu/cmc/play/ww/app';

        var project = function (slug, params) {
            var defer = $q.defer();
            ipcRender.send(slug, params);
            defer.resolve('Success')
            return defer.promise;
        };

        var getLyricsPath = function () {
            var defer = $q.defer();
            defer.resolve(BASE_DIR + '/lyrics')
            return defer.promise;
        };

        var searchsongs = function (search, lang) {
            var filepath = path.join('C:','word-and-worship','appdata','songs',lang );
            var defer = $q.defer();
            findInFiles.find({ 'term': search, 'flags': 'ig' }, filepath, '.json$')
                .then(function (results) {
                    defer.resolve(results);
                });
            return defer.promise;
        };

        var getsonginfo = function (path) {
            var defer = $q.defer();
            $http.get(path).then(function (songinfo) {
                defer.resolve(songinfo.data);
            });
            return defer.promise;
        };

        var createarrangement = function (filename) {
            var defer = $q.defer();
            validation = true;
            // var filepath = BASE_DIR + '/arrangements/' + filename + '.wnw';
            var filepath = path.join('C:','word-and-worship','appdata','arrangements');
            filepath= filepath + '\\' +  filename + '.wnw';
            console.log(filepath);
            if (fs.existsSync(filepath)) {
                defer.reject("An arrangement with name "+ filename+" already exists! Try a different name");
                validation = false;
            }
            if (validation) {
                fs.writeFile(filepath, jsonseed, function (err) {
                    if (err) {
                        defer.reject('Something went wrong. Try saving again!');
                    }
                    else {
                        defer.resolve("Success! Arrangement Created Successfully");
                    }
                });
            }
            return defer.promise;
        };

        var getarrangements = function (flag) {
            var arr = [];
            var defer = $q.defer();
            var dirpath = path.join('C:','word-and-worship','appdata','arrangements');
            // console.log(dirpath);
            var files = fs.readdirSync(dirpath);
            for (var i = 0; i < files.length; i++) {
                var filename = path.join(dirpath, files[i]);
                var stat = fs.lstatSync(filename);
                if (stat.isDirectory()) {
                    //  $scope.fromDir(filename); //recurse
                }
                else if (filename.indexOf('.wnw') >= 0) {
                    var stats = fs.statSync(filename);
                    //console.log(stats);
                    var obj = {};
                    obj.file = filename;
                    obj.description = filename.substr(dirpath.length+1, filename.length - dirpath.length - 5);
                    obj.humantime = stats.mtime;
                    obj.modified = Math.floor(stats.mtime.getTime() / 1000);
                    arr.push(obj);
                }
            }
            arr.sort(function (a, b) { return (a.modified < b.modified) ? 1 : ((b.modified < a.modified) ? -1 : 0); });
            if (flag == 1 && arr.length > 10) {
                arr = arr.slice(0, 10);
            }
            defer.resolve(arr);
            return defer.promise;
        };

        var addsongtoarrangement = function (songpath, arrangementpath, songtitle) {
            var defer = $q.defer();
            var data = jsonfile.readFileSync(arrangementpath);
            data.songs.push({
                title: songtitle,
                filepath: songpath
            });
            jsonfile.writeFile(arrangementpath, data, function (err) {
                if (!err) defer.resolve("Successfully added!")
                else defer.resolve("Failed with " + err);
            });
            return defer.promise;
        };

        var addscripturetoarrangement = function (referenceobject, arrangementselection) {
            var filepath = path.join('C:','word-and-worship','appdata','bibles',referenceobject.bibletranslation );
            filepath= filepath + '\\' +  referenceobject.book + '\\' +referenceobject.chapter + '.json';
            console.log(filepath);
            var defer = $q.defer();
            var data = jsonfile.readFileSync(arrangementselection);
            data.scripture.push({
                filepath: filepath,
                verse: referenceobject.verse,
                reference: referenceobject.fulltextreference
            });
            jsonfile.writeFile(arrangementselection, data, function (err) {
                if (!err) defer.resolve("Successfully added")
                else defer.resolve("Failed with " + err);
            });
            return defer.promise;
        };

        // var fetchscripture = function(dir, id, chapter) {
        //     var url = path.join(BASE_DIR + '/bibles/' +dir + '/' + id + '/' + chapter + '.json');
        //     var defer = $q.defer();
        //     $http.get(url).then(function (scripture) {
        //         defer.resolve(scripture);
        //     });
        //     return defer.promise;

        // }

        var addnewsong = function (obj, filename,language) {
            console.log(obj, filename,language);
            var defer = $q.defer();
            var fullpath = path.join('C:','word-and-worship','appdata','songs',language, filename);
            // console.log(fullpath);
            if (fs.existsSync(fullpath)) {
                defer.resolve('A File already exists with the same name! Modify the Song Title and try again');
            }
            else {
                fs.writeFile(fullpath, JSON.stringify(obj), function (err) {
                    if (!err) defer.resolve("Success")
                    else defer.resolve("Failed with " + err);
                });
            }
            return defer.promise;
        };


        var editsong = function (obj, fullpath) {
            var defer = $q.defer();
                fs.writeFile(fullpath, JSON.stringify(obj), function (err) {
                    if (!err) defer.resolve("Success")
                    else defer.reject("Failed tp Save File. " + err);
                });
            return defer.promise;
        };

        var viewarrangement = function (path) {
            var defer = $q.defer();
            $http.get(path).then(function (arrangment) {
                // console.log(arrangment.data);
                defer.resolve(arrangment.data);
            });
            return defer.promise;
        };

        var getscripture = function (path) {
            var defer = $q.defer();
            $http.get(path).then(function (data) {
                // console.log(data);
                defer.resolve(data);
            });
            return defer.promise;
        };

        // var getdisplayslist = function () {
        //     var defer = $q.defer();
        //     desktopCapturer.getSources({ types: ['window', 'screen'] }, function (error, sources) {
        //         defer.resolve(sources);
        //         for (let source of sources) {
        //             console.log("Name: " + source.name);
        //             //addSource(source);
        //         }
        //     });
        //     return defer.promise;
        // };

        var getimagesfrompath = function (startPath) {
            var arr=[];
            var defer = $q.defer();
            var files = fs.readdirSync(startPath);
            for (var i = 0; i < files.length; i++) {
                var filename = path.join(startPath, files[i]);
                var stat = fs.lstatSync(filename);
                if (stat.isDirectory()) {
                    //  $scope.fromDir(filename); //recurse
                }
                else if (filename.indexOf('.jpg') >= 0 || filename.indexOf('.gif') >= 0 || filename.indexOf('.png') >= 0) {
                    arr.push(filename);
                };
            };
            defer.resolve(arr);
            return defer.promise;
        };

        var getvideosfrompath = function (startPath) {
            var arr=[], entry;
            var defer = $q.defer();
            var files = fs.readdirSync(startPath);
            for (var i = 0; i < files.length; i++) {
                var filename = path.join(startPath, files[i]);
                var stat = fs.lstatSync(filename);
                if (stat.isDirectory()) {
                    //  $scope.fromDir(filename); //recurse
                }
                else if (filename.indexOf('.mp4') >= 0 || filename.indexOf('.webm') >= 0) {
                    entry = {file: filename, description: filename.substr(startPath.length+1, filename.length - startPath.length-(filename.length - filename.lastIndexOf(".")+1))};
                    arr.push(entry);
                };
            };
            defer.resolve(arr);
            return defer.promise;
        };

        var getScriptureVerse = function (referenceobject) {
            var defer = $q.defer();

            var filepath = path.join('C:','word-and-worship','appdata','bibles',referenceobject.bibletranslation );
            filepath= filepath + '\\' +  referenceobject.book + '\\' +referenceobject.chapter + '.json';
            $http.get(filepath).then(function (scripture) {
                defer.resolve(scripture);
            });
            return defer.promise;
        };

        var addmediatoarrangement = function (filepath, arrangementselection, mediatype) {
            console.log(filepath, arrangementselection, mediatype);
            var defer = $q.defer();
            var data = jsonfile.readFileSync(arrangementselection);
            if (mediatype ==="images") {
                data.images.push({
                    filepath: filepath
                });
            }
            else {
                data.video.push({
                    filepath: filepath
                });
            }
           
            jsonfile.writeFile(arrangementselection, data, function (err) {
                if (!err) defer.resolve("Successfully added")
                else defer.resolve("Failed with " + err);
            });
            return defer.promise;
        };
        return {
            searchsongs: searchsongs,
            project: project,
            getsonginfo: getsonginfo,
            createarrangement: createarrangement,
            viewarrangement: viewarrangement,
            getarrangements: getarrangements,
            addsongtoarrangement: addsongtoarrangement,
            addscripturetoarrangement: addscripturetoarrangement,
            addnewsong: addnewsong,
            editsong: editsong,
            getLyricsPath: getLyricsPath,
            getscripture: getscripture,
            getdisplayslist: getdisplayslist,
            getimagesfrompath: getimagesfrompath,
            getvideosfrompath : getvideosfrompath,
            getScriptureVerse: getScriptureVerse,
            addmediatoarrangement : addmediatoarrangement
        };
    });