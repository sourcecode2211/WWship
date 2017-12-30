'use strict';

angular.module('myApp.home', [])
    .controller('lyricsCtrl')

lyricsCtrl.$inject = ['$scope', '$sce', '$http', '$location', '$state', 'PrimaryServices','hotkeys','$anchorScroll','StateContainer']

function lyricsCtrl($scope, $sce, $http, $location, $state, PrimaryServices,hotkeys,$anchorScroll,StateContainer) {
    var lyricslist = [], lyrics, arr = [], i, j, soloslide = "", pendingpush = 1, locatorText = "",indicationslide, _ = this, tempProps;
    _.songsearchresult = [], _.recentsongs=[];

    _.isSearched = false;
    _.searchinprogress = false;
    _.searchresults = [];
    _.dirPath;
    _.selectedPath = '', _.songsearchquery = '';
    _.iseditmode = false;
    var filepath,  title="", settings;

    _.display = {
        lowertab: "none",
        selectedsong: false,
        songpath: ""
    };

    _.songdisplay = {
        layout: 2,
        orientation: 1
    };

    _.visibilityobj = {
        selected: "none",
        songslideclicked: -1,
        editsong: false
    };

    _.init = function () {
        _.srclang = "none";
        // _.addlang = "none";
        PrimaryServices.getarrangements(1).then(function (data) {
            _.arrangements = data;
            // console.log(data);
        });

        PrimaryServices.getgeneralsettings().then(function(data) {
            settings = data;
            _.srclang = settings.language;
            console.log(_.srclang);
        });

        _.recentsongs = StateContainer.getrecentsongs();
        
    };

    _.addSong = function () {
        if (_.srclang != "none") {
            _.clearAllTextboxes();
            _.display.lowertab = "addsong";
        }
        else {
            _.snackbarview("Choose a language first!");
        }

    };

    _.search = function () {
        if (_.songsearchquery.length > 2 && _.srclang != "none") {
            filepath = path.join('C:', 'word-and-worship', 'appdata', 'songs', _.srclang);
            _.songsearchresult = [];
            lyricslist = [];
            _.searchinprogress = true;
            PrimaryServices.searchsongs(_.songsearchquery, filepath)
                .then(function (results) {
                    _.searchinprogress = false;
                    for (var result in results) {
                        lyricslist.push({ "desc": result.substr(filepath.length + 1, result.length - filepath.length - 6), "filepath": result });
                    }
                    _.songsearchresult = lyricslist;
                    _.display.lowertab = "results";
                    _.display.selectedsong = false;
                });
            _.searchstring = _.songsearchquery;
        }
        else {
            _.snackbarview("Enter atleast 3 characters to search");
        }

    };

    _.myFunct = function(keyEvent) {
        if (keyEvent.which === 13)
        _.search()
      };

    _.selectionsong = function (songpath, linecount, boolval) {
        // console.log("IN SELECTIONSONG",songpath,linecount);
        filepath = path.join('C:', 'word-and-worship', 'appdata', 'songs', _.srclang);
        _.firstslideofverse=[];
        _.firstslideofverse.push(0);
        _.selectedPath = songpath;
        _.visibilityobj.songslideclicked = -1;
        var indicator=true;
        PrimaryServices.getsonginfo(songpath).then(function (data) {
            // console.log(data);
            title = data.properties.titles[0];
            lyrics = data.lyrics.verse;
            _.GUID = data.properties.GUID;
            arr = [];
            for (i = 0; i < lyrics.length; i++) {
                for (j = 0; j < lyrics[i].lines.length; j++) {
                    soloslide = soloslide + "<br/>" + lyrics[i].lines[j];
                    pendingpush = 1;
                    if ((j + 1) % linecount == 0) {
                        arr.push({
                        slide: soloslide.slice(5),
                        stanza: i+1,
                        indicator: indicator});
                        soloslide = "";
                        pendingpush = 0;
                        indicator = false;
                    }
                }
                if (pendingpush == 1) {
                    arr.push({
                        slide: soloslide.slice(5),
                        stanza: i+1,
                        indicator: indicator});
                    soloslide = "";
                    pendingpush = 0;
                    indicator = false;
                }
                indicator = true;
                _.firstslideofverse.push(arr.length);
            }
            _.firstslideofverse.splice(-1);
            _.songslides = arr;
        });
        _.display.selectedsong = true;
        if (boolval) { _.display.lowertab = "results"; }
        // console.log(_.display.lowertab,"=LOWERTAB",_.display.selectedsong,"=SelectedSong");
        var index = _.recentsongs.findIndex(x => x.filepath===songpath);
        if (index === -1){
            // _.recentsongs.push({
            //     desc : songpath.substr(filepath.length + 1, songpath.length - filepath.length - 6),
            //     filepath : songpath
            // });
            StateContainer.addsong(songpath, songpath.substr(filepath.length + 1, songpath.length - filepath.length - 6));
            _.recentsongs = StateContainer.getrecentsongs();
        }
    };

    _.editsong = function (path) {
        _.visibilityobj.songpath = path;
        _.visibilityobj.editsong = true;
        _.display.lowertab = "editsong";
        PrimaryServices.getsonginfo(path).then(function (data) {
            // console.log(data); 
            soloslide = "";
            _.songtitle = data.properties.titles[0];
            _.keywords = data.properties.keywords[0];
            _.GUID = data.properties.GUID;
            for (i = 0; i < data.lyrics.verse.length; i++) {
                for (j = 0; j < data.lyrics.verse[i].lines.length; j++) {
                    soloslide = soloslide + data.lyrics.verse[i].lines[j] + '\n';
                }
                soloslide = soloslide.slice(0, -1);
                locatorText = "v" + i;
                document.getElementById(locatorText).value = soloslide;
                soloslide = "";
            }
        });
    };

    _.showLines = function (str) {
        return $sce.trustAsHtml(str);
    };

    _.setLines = function (id) {
        _.songdisplay.layout = id;
        if (id > 2) {
            _.songdisplay.orientation = 3;
        }
        _.selectionsong(_.selectedPath, id);
        _.visibilityobj.songslideclicked = -1;
    };

    _.setDisplay = function (id) {
        _.songdisplay.orientation = id;
    };

    _.revert = function () {
        _.display.lowertab = "results";
    };

    _.add = function () {
        if (_.addlang != "none") {
            var metadata = document.querySelectorAll("input");
            var content = document.querySelectorAll("textarea");
            // console.log(metadata,content);
            var i = 0, j, lines, title, line;
            var obj = {
                properties: {
                    titles: [],
                    keywords: [],
                    GUID: "ABCEDF"
                },
                lyrics: {
                    verse: []
                }
            };

            obj.properties.GUID = createGuid();
            for (i = 0; i < metadata.length; i++) {
                switch (metadata[i].id) {
                    case 'songtitle':
                        obj.properties.titles.push(metadata[i].value);
                        title = metadata[i].value + '.json';
                        break;
                    case 'keywords':
                        obj.properties.keywords.push(metadata[i].value);
                        break;
                    default:
                        break;
                }
            };
            for (i = 0; i < content.length; i++) {
                j = i + 1;
                if (content[i].value.length > 0) {
                    // console.log("Lines : ", content[i].value);
                    lines = content[i].value.replace(/\n*$/, "");  
                    //console.log("Lines : ", lines);
                    lines = lines.replace(/\n+/g, '\n');
                    line = lines.split("\n");
                    // console.log("Lines :", line);
                    var newlinearr =[];
                    for (var k=0; k< line.length; k++) {
                        if (line[k].length >0 ) {
                            newlinearr.push(line[k]);
                        }
                    }
                    obj.lyrics.verse.push({
                        name: 'v' + j,
                        lines: newlinearr
                    })
                }

            };
            PrimaryServices.addnewsong(obj, title, _.srclang).then(function (data) {
                // console.log(data);
                if (data === "Success") {
                    _.clearAllTextboxes();
                    _.snackbarview("Song created successfully!");
                    _.songtitle="";
                    _.keywords = "";
                    _.v0="";
                    _.v1="";
                    _.v2="";
                    _.v3="";
                    _.v4="";
                    _.v5="";
                    _.v6="";
                    _.v7="";
                    _.display.lowertab = "none";
                }
                else _.snackbarview(data);
            });
        }
        else {
            _.snackbarview("Choose a language and then click Create Song!");
        }

    };

    _.clearAllTextboxes = function () {
        var i = 0;
        var metadata = document.querySelectorAll("input");
        var content = document.querySelectorAll("textarea");
        _.songtitle = "";
        _.keywords = "";
        _.songsearchquery = "";
        for (i = 0; i < metadata.length; i++) {
            metadata[i].value = "";
        }

        for (i = 0; i < content.length; i++) {
            content[i].value = "";
        }

        if (_.display.lowertab === 'addsong' || _.display.lowertab === 'editsong') _.revert();
    };

    _.update = function () {
        var metadata = document.querySelectorAll("input");
        var content = document.querySelectorAll("textarea");
        // console.log(metadata,content);
        var i = 0, j, lines, title, line;
        var obj = {
            properties: {
                titles: [],
                keywords: [],
                GUID: "ABCDEF"
            },
            lyrics: {
                verse: []
            }
        };
        obj.properties.GUID = _.GUID;

        for (i = 0; i < metadata.length; i++) {
            switch (metadata[i].id) {
                case 'songtitle':
                    obj.properties.titles.push(metadata[i].value);
                    title = metadata[i].value + '.json';
                    break;
                case 'keywords':
                    obj.properties.keywords.push(metadata[i].value);
                    break;
                default:
                    break;
            }
        };
        for (i = 0; i < content.length; i++) {
            j = i + 1;
            if (content[i].value.length > 0) {
                lines = content[i].value.replace(/\n*$/, ""); 
                lines = lines.replace(/\n+/g, '\n');
                line = lines.split("\n");
                var newlinearr =[];
                for (var k=0; k< line.length; k++) {
                    if (line[k].length >0 ) {
                        newlinearr.push(line[k]);
                    }
                }
                obj.lyrics.verse.push({
                    name: 'v' + j,
                    lines: newlinearr
                })
            }
        };
        PrimaryServices.editsong(obj, _.visibilityobj.songpath).then(function (data) {
            // console.log(data);
            if (data === "Success") {
                _.clearAllTextboxes();
                _.snackbarview("Song updated successfully!");
                _.selectionsong(_.visibilityobj.songpath, _.songdisplay.layout);
            }
            else _.snackbarview(data);
        });
    };

    _.snackbarview = function(message) {
        var x = document.getElementById("snackbar")
        x.innerHTML = message;
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
    };

    _.init();

    _.addtoarrangement = function () {
        var e = document.getElementById('arrangement-id');
        var path = e.options[e.selectedIndex].value;
        // console.log(path);
        if (path) {
          PrimaryServices.addsongtoarrangement(_.selectedPath, path, title, _.GUID).then(function (data) {
            _.snackbarview(data);
          });
        }
        else {
          _.snackbarview('Select an Arrangement First !');
        }
      };

      _.project = function (songslide, index) {
        //console.log(songslide);
        _.visibilityobj.songslideclicked = index;
        switch (_.songdisplay.orientation) {
            case 1:
                PrimaryServices.projectorparser("LOWERTHIRD", songslide, "NA", "NA");
            break;
            case 2:
                PrimaryServices.projectorparser("UPPERTHIRD", songslide, "NA", "NA");
            break;
            default:
                PrimaryServices.projectorparser("FULLSCREEN", songslide, "NA", "NA");
            break;
        };
       
      };

      hotkeys.bindTo($scope)
      .add({
        combo: 'up',
        description: 'Go to previous',
        callback: function() {
            console.log("ctrl+up pressed")
            _.gotsongslide(0);
        }
      })
      .add({
        combo: 'down',
        description: 'Go to next song/scripture',
        callback: function() {
            console.log("ctrl+down pressed");
            _.gotsongslide(1);
        }
      })
      .add({
          combo: '1',
          description: 'Go to slide 1',
          callback: function() {
              if(_.firstslideofverse.length > 0) {
                  indicationslide = _.firstslideofverse[0] + 1;
                  _.openslide(indicationslide);
              }
          } 
      })
      .add({
          combo: '2',
          description: 'Go to slide 2',
          callback: function() {
              if(_.firstslideofverse.length > 1) {
                  indicationslide = _.firstslideofverse[1] + 1;
                  _.openslide(indicationslide);
              }
          } 
      })
      .add({
          combo: '3',
          description: 'Go to slide 3',
          callback: function() {
              if(_.firstslideofverse.length > 2) {
                  indicationslide = _.firstslideofverse[2] + 1;
                  _.openslide(indicationslide);
              }
          } 
      })
      .add({
          combo: '4',
          description: 'Go to slide 4',
          callback: function() {
              if(_.firstslideofverse.length > 3) {
                  indicationslide = _.firstslideofverse[3] + 1;
                  _.openslide(indicationslide);
              }
          } 
      })
      .add({
          combo: '5',
          description: 'Go to slide 5',
          callback: function() {
              if(_.firstslideofverse.length > 4) {
                  indicationslide = _.firstslideofverse[4] + 1;
                  _.openslide(indicationslide);
              }
          } 
      })
      .add({
          combo: '6',
          description: 'Go to slide 6',
          callback: function() {
              if(_.firstslideofverse.length > 5) {
                  indicationslide = _.firstslideofverse[5] + 1;
                  _.openslide(indicationslide);
              }
          } 
      })
      .add({
          combo: '7',
          description: 'Go to slide 7',
          callback: function() {
              if(_.firstslideofverse.length > 6) {
                  indicationslide = _.firstslideofverse[6] + 1;
                  _.openslide(indicationslide);
              }
          } 
      })
      .add({
          combo: '8',
          description: 'Go to slide 8',
          callback: function() {
              if(_.firstslideofverse.length > 7) {
                  indicationslide = _.firstslideofverse[7] + 1;
                  _.openslide(indicationslide);
              }
          } 
      });

      _.openslide = function(id) {
        if (id <= _.songslides.length) {
            var index = id-1;
            $location.hash('songslide-number-'+ index);
            $anchorScroll();
            _.project(_.songslides[id-1].slide, id-1);
            console.log('songslide-number-'+ index);
            //_.visibilityobj.songslideclicked
        }
    };

    _.gotsongslide = function(id) {
        var next, maxLength;
        console.log("Inside song", id)
        switch (id) {
            case 1:
                next = _.visibilityobj.songslideclicked + 1;
                if (next < _.songslides.length) {    
                    _.project(_.songslides[next].slide, next);
                }
                // else {
                //     _.project(_.songslides[0].slide, 0);
                //     _.visibilityobj.songslideclicked = 0;
                // }
            break;
                
            case 0:
                next = _.visibilityobj.songslideclicked - 1;
                if (next >= 0 ) {
                    _.project(_.songslides[next].slide, next);
                }
                // else {
                //     maxLength = _.songslides.length;
                //     _.project(_.songslides[maxLength-1].slide, maxLength-1);
                //     _.visibilityobj.songslideclicked = maxLength - 1;
                // }
            break;
        }
    };

    _.editslide = function() {
        console.log("Edit song=",_.selectedPath);
        _.iseditmode = true;
        _.visibilityobj.iseditmode = true;
        var verse="", locatorText;
        PrimaryServices.getsonginfo(_.selectedPath).then(function(data) {
            console.log(data);
            tempProps = data.properties;
            for (var i=0; i < data.lyrics.verse.length; i++) {
                for (var j = 0; j < data.lyrics.verse[i].lines.length; j++) {
                    verse = verse + data.lyrics.verse[i].lines[j] + '\n';
                }
                verse = verse.slice(0, -1);
                locatorText = "edit-v" + i;
                document.getElementById(locatorText).value = verse;
                verse = "";
            }
        });
    };

    _.updatesong = function(id) {
        console.log(id);
        switch (id) {
            case 1:
            var verse="", locatorText, lines, line, obj = {
                properties: {
                    titles: [],
                    keywords: [],
                    GUID: "ABCEDF"
                },
                lyrics: {
                    verse: []
                }
            };
    
            obj.properties.titles = tempProps.titles;
            obj.properties.keywords = tempProps.keywords;
            obj.properties.GUID = tempProps.GUID;
    
            for (var i=0; i<7;i++) {
                locatorText = "edit-v" + i;
                verse = document.getElementById(locatorText).value;
                if (verse.length > 0) {
                    lines = verse.replace(/\n+/g, '\n');
                    line = lines.split("\n");
                    obj.lyrics.verse.push({
                        name: 'v' + j,
                        lines: line
                    })
                }
            };
            PrimaryServices.editsong(obj, _.selectedPath).then(function (data) {
                if (data === "Success") {
                    _.snackbarview("Song updated successfully!");
                    _.iseditmode = false;
                    //_.loadsong(_.selectedPath,_.songdisplay.layout);
                    _.selectionsong(_.selectedPath,_.songdisplay.layout,1);
                }
                else _.snackbarview(data);
            });
            case 0:
            _.clearalltextboxes();
            
            break;
        }
    };

    _.clearalltextboxes = function() {
        var content = document.querySelectorAll("textarea");

        for (var i = 0; i < content.length; i++) {
            content[i].value = "";
        }
        _.iseditmode = false;
    };
      function createGuid()
      {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
              return v.toString(16);
          });
      };
    
};
