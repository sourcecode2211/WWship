'use strict';

angular.module('myApp.ipcservices', [])
    .service('PrimaryServices', function ($http, $q) {
        const desktopCapturer = require('electron')
        const ipcRender = require('electron').ipcRenderer;
        var findInFiles = require('find-in-files');
        const jsonseed = '{"songs":[],"scripture":[],"audio":[],"video":[],"images":[],"slides":[]}';
        var fs = require('fs');
        var jsonfile = require('jsonfile')
        const getVideoInfo = require('get-video-info')

        var validation = true, slide, i,j, lines,line, slidesfromfile=[];

        var dirPathVideo ='', dirPathImages='';
        var songslist = [], scripturelist = [];

        const BASE_DIR = path.join('C:','word-and-worship','appdata');
        var scripturestyling, lyricstyling,imagestyling,marqueestyling, slidestyling,generalstyling;
        var interfacedata = {
            datatype:"WELCOME",
            displaytext:"Welcome to Word & Worship!<br/>",
            url:"NA",
            reference:"NA"
          };


          var openDialogWindow = function(slug) {
            ipcRender.send(slug, true);
          };

          var projectorparser = function(datatype, displaytext, url, reference) {
            interfacedata.datatype = datatype;
            interfacedata.displaytext = displaytext;
            interfacedata.url = url;
            interfacedata.reference = reference;
            // console.log(interfacedata);
            projector();
          };

          var projectslide = function(slideobj) {
            ipcRender.send('project-content', {
                styling: slidestyling,
                data: slideobj
            });
          };

        var projector = function() {
            switch(interfacedata.datatype.toUpperCase()) {
                case "SCRIPTURE":
                    ipcRender.send('project-content', {
                        styling: scripturestyling,
                        data: interfacedata
                    });
                break;
                case "LOWERTHIRD":
                case "UPPERTHIRD":
                case "FULLSCREEN":
                    ipcRender.send('project-content', {
                        styling: lyricstyling,
                        data: interfacedata
                    });
                break;
                case "UPPERMARQUEE":
                case "LOWERMARQUEE":
                    ipcRender.send('project-content', {
                        styling: marqueestyling,
                        data: interfacedata
                    });
                break;
                case "DISPLAYIMAGE":
                    ipcRender.send('project-content', {
                        styling: scripturestyling,
                        data: interfacedata
                    });
                break;
                case "PLAYVIDEO":
                    ipcRender.send('project-content', {
                        styling: scripturestyling,
                        data: interfacedata
                    });
                break;
                case "SLIDES-1":
                case "SLIDES-2":
                case "SLIDES-3":
                case "SLIDES-4":
                case "SLIDES-5":
                    ipcRender.send('project-content', {
                        styling: slidestyling,
                        data: interfacedata
                    });
                break;
            };
        };

        var searchsongs = function (search, filepath) {
            var defer = $q.defer();
            findInFiles.find({ 'term': search, 'flags': 'ig' }, filepath, '.json$')
                .then(function (results) {
                    defer.resolve(results);
                });
            return defer.promise;
        };

        var getsonginfo = function (filepath) {
            // console.log("SERVICE CALL",filepath);
            var defer = $q.defer();
            $http.get(filepath).then(function (songinfo) {
                // console.log(songinfo);
                defer.resolve(songinfo.data);
            });
            return defer.promise;
        };

        var createarrangement = function (filename) {
            var defer = $q.defer();
            validation = true;
            var filepath = path.join('C:','word-and-worship','appdata','arrangements');
            filepath= filepath + '\\' +  filename + '.wnw';
            // console.log(filepath);
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
            var files = fs.readdirSync(dirpath);
            for (var i = 0; i < files.length; i++) {
                var filename = path.join(dirpath, files[i]);
                var stat = fs.lstatSync(filename);
                if (stat.isDirectory()) {
                    //  do NOTHING
                }
                else if (filename.indexOf('.wnw') >= 0) {
                    var stats = fs.statSync(filename);
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

        var addsongtoarrangement = function (songpath, arrangementpath, songtitle, GUID) {
            var defer = $q.defer();
            var data = jsonfile.readFileSync(arrangementpath);
            data.songs.push({
                title: songtitle,
                filepath: songpath,
                guid: GUID
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
            // console.log(filepath);
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

        var addnewsong = function (obj, filename,language) {
            // console.log(obj, filename,language);
            var defer = $q.defer();
            var fullpath = path.join('C:','word-and-worship','appdata','songs',language, filename);
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
                defer.resolve(arrangment.data);
            });
            return defer.promise;
        };

        var getscripture = function (path) {
            var defer = $q.defer();
            $http.get(path).then(function (data) {
                defer.resolve(data);
            });
            return defer.promise;
        };

        var getimagesfrompath = function (startPath) {
            var arr=[];
            var defer = $q.defer();
            var files = fs.readdirSync(startPath);
            for (var i = 0; i < files.length; i++) {
                var filename = path.join(startPath, files[i]);
                var stat = fs.lstatSync(filename);
                if (stat.isDirectory()) {
                    //  do NOTHING
                }
                else if (filename.toUpperCase().indexOf('.JPG') >= 0 || filename.toUpperCase().indexOf('.GIF') >= 0 || filename.toUpperCase().indexOf('.PNG') >= 0) {
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
                    //  do NOTHING
                }
                else if (filename.toUpperCase().indexOf('.MP4') >= 0 || filename.toUpperCase().indexOf('.WEBM') >= 0) {
                    entry = {file: filename,description: filename.substr(startPath.length+1, filename.length - startPath.length-(filename.length - filename.lastIndexOf(".")+1))};
                    arr.push(entry);
            
                }
            };
            defer.resolve(arr);
            return defer.promise;
        };

        var getScriptureVerse = function (referenceobject) {
            //console.log(scripturelist);
            var defer = $q.defer();

            var filepath = path.join('C:','word-and-worship','appdata','bibles',referenceobject.bibletranslation );
            filepath= filepath + '\\' +  referenceobject.book + '\\' +referenceobject.chapter + '.json';
            $http.get(filepath).then(function (scripture) {
                defer.resolve(scripture);
            });
            // StateContainer.addscripture(referenceobject).then(function(d) {
            //     console.log('Success from StateContainer');
            // });
            // scripturelist.push({
            //     reference: referenceobject
            // });
            return defer.promise;
        };

        var addmediatoarrangement = function (filepath, arrangementselection, mediatype) {
            // console.log(filepath, arrangementselection, mediatype);
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

        function sendToProjector(slug,param) {
            ipcRender.send(slug, param);
        };

        function init () {
            $http.get(BASE_DIR + "\\settings\\display-settings.json").then(function (settings) {
                scripturestyling = settings.data.scripture;
                lyricstyling = settings.data.lyrics;
                imagestyling = settings.data.image;
                marqueestyling = settings.data.marquee;
                generalstyling = settings.data.general;
                slidestyling = settings.data.slides;
                //console.log(scripturestyling, lyricstyling,imagestyling,marqueestyling, generalstyling);
            });
        };

        init();


        var getVideoInformation = function() {
            var defer = $q.defer();
            $http.get(BASE_DIR + "\\settings\\display-settings.json").then(function (settings) {
                defer.resolve(settings.data);
            });
            return defer.promise;
        }

        var getSettingInfo = function(filepath) {
            var defer = $q.defer();
            getVideoInfo(filepath).then(function(info) {
                defer.resolve(info);
            });
            return defer.promise;
        }

        var setVideoInformation = function(data) {
            var defer = $q.defer();
            fs.writeFile(BASE_DIR + "\\settings\\display-settings.json", JSON.stringify(data), function (err) {
                if (!err) defer.resolve("Success")
                else defer.reject("Failed tp Save File. " + err);
                init();
            });
            return defer.promise;
        }

        var getgeneralsettings = function() {
            var defer = $q.defer();
            $http.get(BASE_DIR + "\\settings\\display-settings.json").then(function (settings) {
                generalstyling = settings.data.general;
                defer.resolve(generalstyling)
            });
            return defer.promise;
        };

        var addslidetoarrangement = function (slidetype, slidetitle, slidebullets, slideimage, arrangementpath, guid) {
            var defer = $q.defer();
            var data = jsonfile.readFileSync(arrangementpath);
            data.slides.push({
                slidetype : slidetype,
                slidetitle: slidetitle,
                slidebullets: slidebullets,
                slideimage : slideimage,
                uuid: guid
            });
            jsonfile.writeFile(arrangementpath, data, function (err) {
                if (!err) defer.resolve("Successfully added!")
                else defer.resolve("Failed with " + err);
            });
            return defer.promise;
        };

        var updateslideinarrangement = function(slidelayout,selectedpath, GUID, title, bullets, imageurl) {
             console.log("Modifying slide",GUID,slidelayout,title,bullets);
            var defer = $q.defer();
            switch(slidelayout) {
                case 1:
                case 2:
                    lines =bullets.replace(/\n+/g, '\n');
                    line = lines.split("\n");
                    $http.get(selectedpath).then(function (arrangement) {
                        for (i=0;i < arrangement.data.slides.length; i++) {
                            if (arrangement.data.slides[i].uuid === GUID) {
                                arrangement.data.slides[i].slidetitle = title;
                                arrangement.data.slides[i].slidebullets = line; 
                            }
                        };
                        jsonfile.writeFile(selectedpath, arrangement.data, function (err) {
                            if (!err) defer.resolve("Successfully modified slide!")
                            else defer.reject("Failed to modify slide. Try Again !");
                        });
                    });
                break;
                case 3:
                break;
                case 4:
                case 5:
                    $http.get(selectedpath).then(function (arrangement) {
                        for (i=0;i < arrangement.data.slides.length; i++) {
                            if (arrangement.data.slides[i].uuid === GUID) {
                                arrangement.data.slides[i].slidetitle = title; 
                            }
                        };
                        jsonfile.writeFile(selectedpath, arrangement.data, function (err) {
                            if (!err) defer.resolve("Successfully modified slide!")
                            else defer.reject("Failed to modify slide. Try Again !");
                        });
                    });
                break;

            };
            
            return defer.promise;
        };

        var deleteslideinarrangement = function(arrangementpath, GUID) {
            var defer = $q.defer();
            $http.get(arrangementpath).then(function (arrangement) { 
                slidesfromfile = arrangement.data.slides;
                j=-1;
                for (i=0;i< slidesfromfile.length; i++) {
                    if (slidesfromfile[i].uuid === GUID) {
                        j = i;
                    }
                }
                if (j > -1) {
                    slidesfromfile.splice(j,1);
                    arrangement.data.slides = slidesfromfile;
                    // console.log("SLIDES NEW",arrangement.data.slides);
                    jsonfile.writeFile(arrangementpath, arrangement.data, function (err) {
                        if (!err) defer.resolve("Slide Deleted Successfully");
                        else defer.reject("Something went wrong. Try again !");
                    });
                    
                }
                else {
                    defer.reject("Something went wrong. Try again !");
                }
            });
            return defer.promise;
        };

        var stopprojection = function() {
            ipcRender.send('stop-projection', true);
        };

        return {
            stopprojection : stopprojection,
            deleteslideinarrangement:deleteslideinarrangement,
            updateslideinarrangement: updateslideinarrangement,
            getVideoInformation : getVideoInformation,
            setVideoInformation: setVideoInformation,
            sendToProjector : sendToProjector,
            searchsongs: searchsongs,
            projectorparser: projectorparser,
            getsonginfo: getsonginfo,
            createarrangement: createarrangement,
            viewarrangement: viewarrangement,
            getarrangements: getarrangements,
            addsongtoarrangement: addsongtoarrangement,
            addscripturetoarrangement: addscripturetoarrangement,
            addnewsong: addnewsong,
            editsong: editsong,
            getscripture: getscripture,
            getimagesfrompath: getimagesfrompath,
            getvideosfrompath : getvideosfrompath,
            openDialogWindow: openDialogWindow,
            getScriptureVerse: getScriptureVerse,
            addmediatoarrangement : addmediatoarrangement,
            getgeneralsettings: getgeneralsettings,
            addslidetoarrangement: addslidetoarrangement,
            projectslide: projectslide,
            getSettingInfo : getSettingInfo 
        };
    });