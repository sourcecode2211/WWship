'use strict';

angular.module('myApp.arrangement', [])

    .controller('newArrangementCtrl')

newArrangementCtrl.$inject = ['$scope', 'PrimaryServices', '$state','$location','$sce','$anchorScroll','hotkeys', '$timeout'];

function newArrangementCtrl($scope, PrimaryServices, $state,$location,$sce, $anchorScroll,hotkeys,$timeout) {
    var arr = [],empty=[], lastinserted = false, slidedetail = [], str, maxLength = 200, trimmedString, _=this, indicationslide, 
    verselength = 0, numwords = 0, lyrics, i=0,j=0,pendingpush=0, soloslide="";
    _.inProjectionMode = false, _.projectionType="songs";
    _.regex = "^[A-Z0-9a-z-:_]+$";
    _.selecteditem = "NONE";
    _.visibilityobj = {
        isArrangementSelected: false,
        selected: "none",
        songpath : "",
        tabSelected : 0,
        verseclicked: -1,
        slideclicked: -1,
        songslideclicked: -1,
        iseditmode: false
    };
    _.songdisplay = {
        layout : 2,
        orientation: 1
    };
    _.songs, _.scriptures, _.images, _.slides, _.videos ,_.firstslideofverse = [];
    var tempProps={};
    _.init = function() {
        PrimaryServices.getarrangements(0).then(function(data) {
            // console.log(data);
            _.arrangements = data;
            _.model = '';
        });
    };

    _.createArrangement = function() {
        console.log("Inside create", _.model);
        PrimaryServices.createarrangement(_.model).then(function(data) {
            if (data === "Success! Arrangement Created Successfully") {
                _.snackbarview(data);
                _.init();
                
            }
        }, function(error) {
            _.snackbarview(error);
        });
    }

    _.init();

    _.viewarrangement = function(path, desc) {
        _.visibilityobj.tabSelected = 1;
        _.selecteditem = -1;
        _.visibilityobj.isArrangementSelected = true;
        _.visibilityobj.tabSelected = _.visibilityobj.tabSelected == 0 ? 1: _.visibilityobj.tabSelected;
        //if (_.selectedpath != path) {
        PrimaryServices.viewarrangement(path).then(function(data) {
            _.visibilityobj.selected = "none";
            if (data.songs.length > 0) {_.songs = data.songs;} else {_.songs = [];}
            if (data.scripture.length > 0) {_.scriptures = data.scripture;} else {_.scriptures = [];}
            if (data.images.length > 0) {_.images = data.images;} else {_.images = [];}
            if (data.slides.length > 0) {_.slides = data.slides;} else {_.slides = [];}
            if (data.video.length > 0) {_.videos = data.video;} else {_.videos = [];}
            _.selectedpath = path;
            });
       // }
    };

    _.setTab = function(i) {
        _.visibilityobj.tabSelected = i;
    };

    _.openSong = function(title,path, index) {
        _.selecteditem = index;
        _.resetIndicators();
        _.visibilityobj.selected = "song";
        _.visibilityobj.songpath = path;
        _.loadsong(path, _.songdisplay.layout);
    };

    _.openScripture = function(filepath,verse,reference, index) {
        _.selecteditem = index + 10000;
        _.resetIndicators();
        //console.log(filepath,verse,reference);
        _.visibilityobj.selected = "scripture";
        _.loadverse(filepath, reference, verse);
        _.resetIndicators();
    };

    _.resetIndicators = function() {
        _.songdisplay.layout = 2;
        _.songdisplay.orientation = 1;
        _.visibilityobj.slideclicked = -1;
        _.visibilityobj.songslideclicked = -1;
    };

    _.loadsong = function(filepath, linecount) {
        _.firstslideofverse=[];
        _.firstslideofverse.push(0);
        var counter=0, indicator=true;
        PrimaryServices.getsonginfo(filepath).then(function(data) {
            // console.log(data);
            lyrics = data.lyrics.verse;
            _.display = 1;
            arr = [];
            for (i=0; i < lyrics.length; i++) {
                for (j=0; j < lyrics[i].lines.length; j++ ) {
                    soloslide = soloslide + "<br/>" +lyrics[i].lines[j];
                    pendingpush=1;
                    if ((j+1) % linecount ==0) 
                    {
                        arr.push({
                        slide: soloslide.slice(5),
                        stanza: i+1,
                        indicator: indicator});
                        soloslide = "";
                        pendingpush=0;
                        indicator = false;
                    }
                }
                if (pendingpush == 1) {
                    arr.push({
                    slide: soloslide.slice(5),
                    stanza: i+1,
                    indicator: indicator});
                    soloslide = "";
                    pendingpush=0;
                    indicator = false;
                }
                indicator=true;
                _.firstslideofverse.push(arr.length);
            }
            _.firstslideofverse.splice(-1);
            _.songslides = arr;
            console.log(_.firstslideofverse);
        });
    };

    _.showLines = function(str) {
        return $sce.trustAsHtml(str);
    };

    _.loadverse = function(filepath, reference, verse) {
        _.display = 2;
        PrimaryServices.getscripture(filepath).then(function(response) {
            var data = response.data;
            _.verses = [];
            var wordsperpage = (filepath.indexOf("newtamil") != -1 || 
            filepath.indexOf("kannada") != -1 || 
            filepath.indexOf("hindi") != -1 ||
            filepath.indexOf("telugu") != -1)  ? 12 : 22;
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

            $location.hash('verse-'+verse);
            $anchorScroll();
        });
    };

    _.getPosition = function(string, subString, index) {
        return string.split(subString, index).join(subString).length;
    };

    _.setLines = function(id) {
        _.songdisplay.layout = id;
        _.visibilityobj.linecount = id;
        if (id>2) {
            _.songdisplay.orientation = 3;  
        }
        _.loadsong(_.visibilityobj.songpath, id);
        _.visibilityobj.songslideclicked = -1;
    };

    _.setDisplay = function(id) {
        _.songdisplay.orientation = id;
    };

    _.slideselected = function(verse, reference, parent, index) {
        //  console.log( parent, index);
        _.visibilityobj.verseclicked = parent
        _.visibilityobj.slideclicked = index;
        PrimaryServices.projectorparser("SCRIPTURE", verse, "NA", reference);
    };

    _.project = function(songslide, slideno) {
        _.visibilityobj.songslideclicked = slideno;
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

    _.postimage = function(filepath, index) {
        _.selecteditem = index + 20000;
        PrimaryServices.projectorparser("DISPLAYIMAGE", "NA", filepath, "NA");
    };

    _.snackbarview = function (message) {
        var x = document.getElementById("snackbar")
        x.innerHTML = message;
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
      };

    _.openSlide = function(id) {
        // console.log(_.slides[id]);
        _.visibilityobj.GUID = _.slides[id].uuid;
        _.visibilityobj.selected = "slides";
        _.visibilityobj.mode =0;
        _.slidelayout = _.slides[id].slidetype;
        switch (_.slidelayout) {
            case 1:
                _.bullets = "";
                for (var j = 0; j < _.slides[id].slidebullets.length; j++) {
                    _.bullets = _.bullets + _.slides[id].slidebullets[j] + '\n';
                }
                _.bullets = _.bullets.slice(0, -1);
                $timeout(function() {
                    document.getElementById('slide1-bullets').value = _.bullets;
                    document.getElementById('slide1-title').value = _.slides[id].slidetitle;
                }, 50);
                
            case 2:
                _.bullets = "";
                for (var j = 0; j < _.slides[id].slidebullets.length; j++) {
                    _.bullets = _.bullets + _.slides[id].slidebullets[j] + '\n';
                }
                _.bullets = _.bullets.slice(0, -1);
                $timeout(function() {
                    document.getElementById('slide2-bullets').value = _.bullets;
                    document.getElementById('slide2-title').value = _.slides[id].slidetitle;
                }, 50);
            
            break;
            case 4:
            $timeout(function() {
                document.getElementById('slide4-title').value = _.slides[id].slidetitle;
            }, 50);
                
            break;
            case 5:
            $timeout(function() {
                document.getElementById('slide5-title').value = _.slides[id].slidetitle;
            }, 50);
            
            break;
        }
    }

    _.editslide = function() {
        console.log("Edit song=",_.visibilityobj.songpath);
        _.visibilityobj.iseditmode = true;
        var verse="", locatorText;
        PrimaryServices.getsonginfo(_.visibilityobj.songpath).then(function(data) {
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
            PrimaryServices.editsong(obj, _.visibilityobj.songpath).then(function (data) {
                if (data === "Success") {
                    _.snackbarview("Song updated successfully!");
                    _.visibilityobj.iseditmode = false;
                    _.loadsong(_.visibilityobj.songpath,_.songdisplay.layout);
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
        _.visibilityobj.iseditmode = false;
    };

    hotkeys.bindTo($scope)
    .add({
      combo: 'up',
      description: 'Go to previous',
      callback: function() {
          console.log("ctrl+up pressed")
          if(_.visibilityobj.selected ==="song") {
               _.gotsongslide(0);
            }
            if (_.visibilityobj.selected ==="scripture") {
            _.gotverseslide(0);
            }       
      }
    })
    .add({
      combo: 'down',
      description: 'Go to next song/scripture',
      callback: function() {
          console.log("ctrl+down pressed");
          if(_.visibilityobj.selected ==="song") {
              _.gotsongslide(1);
          }
          if (_.visibilityobj.selected ==="scripture") {
            _.gotverseslide(1);
          }
      }
    })
    .add({
        combo: '1',
        description: 'Go to slide 1',
        callback: function() {
            if(_.visibilityobj.selected ==="song" && _.firstslideofverse.length > 0) {
                indicationslide = _.firstslideofverse[0] + 1;
                _.openslide(indicationslide);
            }
        } 
    })
    .add({
        combo: '2',
        description: 'Go to slide 2',
        callback: function() {
            if(_.visibilityobj.selected ==="song" && _.firstslideofverse.length > 1) {
                indicationslide = _.firstslideofverse[1] + 1;
                _.openslide(indicationslide);
            }
        } 
    })
    .add({
        combo: '3',
        description: 'Go to slide 3',
        callback: function() {
            if(_.visibilityobj.selected ==="song" && _.firstslideofverse.length > 2) {
                indicationslide = _.firstslideofverse[2] + 1;
                _.openslide(indicationslide);
            }
        } 
    })
    .add({
        combo: '4',
        description: 'Go to slide 4',
        callback: function() {
            if(_.visibilityobj.selected ==="song" && _.firstslideofverse.length > 3) {
                indicationslide = _.firstslideofverse[3] + 1;
                _.openslide(indicationslide);
            }
        } 
    })
    .add({
        combo: '5',
        description: 'Go to slide 5',
        callback: function() {
            if(_.visibilityobj.selected ==="song" && _.firstslideofverse.length > 4) {
                indicationslide = _.firstslideofverse[4] + 1;
                _.openslide(indicationslide);
            }
        } 
    })
    .add({
        combo: '6',
        description: 'Go to slide 6',
        callback: function() {
            if(_.visibilityobj.selected ==="song" && _.firstslideofverse.length > 5) {
                indicationslide = _.firstslideofverse[5] + 1;
                _.openslide(indicationslide);
            }
        } 
    })
    .add({
        combo: '7',
        description: 'Go to slide 7',
        callback: function() {
            if(_.visibilityobj.selected ==="song" && _.firstslideofverse.length > 6) {
                indicationslide = _.firstslideofverse[6] + 1;
                _.openslide(indicationslide);
            }
        } 
    })
    .add({
        combo: '8',
        description: 'Go to slide 8',
        callback: function() {
            if(_.visibilityobj.selected ==="song" && _.firstslideofverse.length > 7) {
                indicationslide = _.firstslideofverse[7] + 1;
                _.openslide(indicationslide);
            }
        } 
    })
    ;

    _.openslide = function(id) {
        if (id <= _.songslides.length) {
            var index = id-1;
            $location.hash('songslide-number-'+ index);
            $anchorScroll();
            _.project(_.songslides[id-1].slide, id-1);
            console.log('songslide-number-'+ index);
            
        }
    }

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

    _.preview = function(id) {
        switch(id) {
            case 1:
            PrimaryServices.projectorparser
            ("SLIDES-1", document.getElementById("slide1-title").value, "NA", document.getElementById("slide1-bullets").value);
            break;
            case 2:
            PrimaryServices.projectorparser
            ("SLIDES-2", document.getElementById("slide2-title").value, "NA", document.getElementById("slide2-bullets").value);
            break;
            case 3:
            break;
            case 4:
            PrimaryServices.projectorparser
            ("SLIDES-4", document.getElementById("slide4-title").value, "NA", "NA");
            break;
            case 5:
            PrimaryServices.projectorparser
            ("SLIDES-5", document.getElementById("slide5-title").value, "NA", "NA");
            break;
        }   
    };

    _.updatearrangement = function(id) {
        // console.log("You modified slide type",id);
        switch (id) {
            case 1:
            PrimaryServices.updateslideinarrangement( id,_.selectedpath, _.visibilityobj.GUID, document.getElementById('slide1-title').value, document.getElementById('slide1-bullets').value, "").then(function(data) {
                _.snackbarview(data);
                _.viewarrangement(_.selectedpath,"CALL FROM UPDATE");
            });
            break;
            case 2:
                PrimaryServices.updateslideinarrangement( id,_.selectedpath, _.visibilityobj.GUID, document.getElementById('slide2-title').value, document.getElementById('slide2-bullets').value, "").then(function(data) {
                    _.snackbarview(data);
                    _.viewarrangement(_.selectedpath,"CALL FROM UPDATE");
                });
            break;
            case 3:
            break;
            case 4:
            PrimaryServices.updateslideinarrangement( id,_.selectedpath, _.visibilityobj.GUID, document.getElementById('slide4-title').value, empty, "").then(function(data) {
                _.snackbarview(data);
                _.viewarrangement(_.selectedpath,"CALL FROM UPDATE");
            });
            break;
            case 5:
                PrimaryServices.updateslideinarrangement( id,_.selectedpath, _.visibilityobj.GUID, document.getElementById('slide5-title').value, empty, "").then(function(data) {
                    _.snackbarview(data);
                    _.viewarrangement(_.selectedpath,"CALL FROM UPDATE");
                });
            break;
        };
    };
};
