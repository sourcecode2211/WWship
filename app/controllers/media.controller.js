'use strict';

angular.module('myApp.media', [])

    .controller('imageCtrl')
    .controller('videoCtrl')
    .controller('slideCtrl')
    .controller('browserCtrl');

imageCtrl.$inject = ['$scope', '$http', 'PrimaryServices','StateContainer'];
videoCtrl.$inject = ['$scope', '$http', 'PrimaryServices','StateContainer'];
slideCtrl.$inject = ['$scope', '$http', 'PrimaryServices'];
browserCtrl.$inject = ['$scope', '$http', 'PrimaryServices','$sce'];


function browserCtrl($scope, $http, PrimaryServices,$sce) { 
    var _=this;
    _.url = "";
    _.clicked = false;

    _.viewpage = function() {
        console.log(_.url);
        _.clicked = true;
        _.detailFrame =$sce.trustAsResourceUrl( _.url);
    }
};


function imageCtrl($scope, $http, PrimaryServices, StateContainer) {
    var _ = this;
    
    _.selectedimage="";
    _.isEnabled = false;
    _.images=[];
    var arr = [];
    _.select = function () {
        PrimaryServices.openDialogWindow('open-images-folder', true);
    }

    $scope.$on('Image-Folder-Selected', function (event, arg) {
        arr = [];
        //console.log(arg.dirpath);
        _.isEnabled = false;
        StateContainer.setimagepath(arg.dirpath);
        _.dirPathImage = arg.dirpath;
        _.fromDir(arg.dirpath);
    });

    _.fromDir = function (startPath) {

        PrimaryServices.getimagesfrompath(startPath).then(function (data) {
            // console.log(data);
            _.images = data;
        });
    };

    _.selected = function (filepath) {
        //console.log(filepath);
        _.isEnabled = true;
        _.selectedimage = filepath;

        PrimaryServices.projectorparser("DISPLAYIMAGE", "NA", filepath, "NA");
    };

    _.init = function() {

        _.dirPathImage =StateContainer.getimagepath();
        PrimaryServices.getimagesfrompath( _.dirPathImage).then(function (data) {
            _.images = data;
        });

        PrimaryServices.getarrangements(1).then(function (data) {
            _.arrangements = data;
            // console.log(data);
        });
    };

    _.addtoarrangement = function () {
        var e = document.getElementById('arrangement-id');
        var path = e.options[e.selectedIndex].value;
        //console.log(path);
        if (path) {
            PrimaryServices.addmediatoarrangement(_.selectedimage, path, "images").then(function (data) {
            _.snackbarview(data);
          });
        }
        else {
          _.snackbarview('Select an Arrangement First !');
        }
      };

      _.snackbarview = function(message) {
        var x = document.getElementById("snackbar")
        x.innerHTML = message;
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
    };
    _.init();
};


function videoCtrl($scope, $http, PrimaryServices, StateContainer) {
    
    var arr = [], _=this;
    _.videos;
    _.paused = true;
    _.isEnabled = false;
    _.select = function () {
        PrimaryServices.openDialogWindow('open-video-folder', true);
    };

    _.selectedVideo = function (i) {
        _.videoplay = _.videos[i].file;
        _.vidtitle = _.videos[i].description;
        _.isEnabled = true;
        _.selectedVideoTrack = i;
        //console.log('path',_.videos[i].file)
        PrimaryServices.projectorparser("PLAYVIDEO", "NA",_.videos[i].file , "NA");
    };

    // var vid = document.getElementById("preview");
    // vid.onloadeddata = function() {
    //     //alert(vid.duration);
    // };

    // vid.onplay = function() {
    //     //alert("The video has started to play");
    // };

    // vid.onseeked = function() {
    //     alert("Seek operation completed!");
    // };

    _.progress = function(time) {
        //console.log(time);
        if (time >0)
            PrimaryServices.sendToProjector('move-track-forward', {time: time});
            else
            PrimaryServices.sendToProjector('move-track-backward', {time: time});
    }

    $scope.$on('Video-Folder', function (event, arg) {
        arr = [];
        _.selectedVideoTrack = -1;
        _.dirPathVideo = arg.dirpath;
        // console.log($scope.dirPathVideo);
        StateContainer.setvideopath(_.dirPathVideo);
        PrimaryServices.getvideosfrompath(_.dirPathVideo).then(function (data) {
            //console.log(data);
            _.videos = data;
        });
    });

    $scope.$on('video-has-stopped', function (event, arg) {
        _.paused = true;
    });

    _.init = function() {
        _.dirPathVideo = StateContainer.getvideopath();
        PrimaryServices.getvideosfrompath(_.dirPathVideo).then(function (data) {
            //console.log(data);
            _.videos = data;
        });
            
        PrimaryServices.getarrangements(1).then(function (data) {
            _.arrangements = data;
            //console.log(data);
        });
    }

    _.init();
}

function slideCtrl($scope, $http, PrimaryServices) {
    var _ = this;
    var  lines, line, empty=[],i,j , addtitle, addbullets, addimageurl;
    _.title=" ", _.bullets=" ",_.imageurl=" ",
    _.selectedpath="NA";
    _.slidelayout = 0;
    _.visibilityobj = {
        isArrangementSelected: false,
        selected: "none",
        tabSelected : 0,
        mode:-1,
        GUID: "ABCDEF"
    };
    var slideobj = {
        title: "",
        bullets: [],
        imageurl: "C:\Jeffrey\WW\WW-APP\app\assets\slide-templates\black.png",
        bgcolor : "#000",
        fontcolor : "#FFF"
    };

    _.selectedslide = function(i) {
        _.visibilityobj.mode = 0;
        _.slidelayout = i;
        _.visibilityobj.GUID = "ABCDEF";
    }

    _.init = function() {
        PrimaryServices.getarrangements(0).then(function(data) {
            _.arrangements = data;
        });
    };

    // _.preview = function() {
    //     _.snackbarview("PREVIEW!");
    // };

    _.resetdata = function(id) {
        document.getElementById("title").value = "";
        switch (id) {
            case 0:
                document.getElementById("bullets").value = "";
            break;
            case 1:
                document.getElementById("image").value = "";
            break;
            default:
            break;
        }
        _.slidelayout = 0;
        _.visibilityobj.tabSelected = 2;
    }

    _.addtoarrangement = function(id) {
        switch(id) {
            case 1: 
            case 2:
                addtitle = document.getElementById("title").value;
                addbullets = document.getElementById("bullets").value;
                lines =addbullets.replace(/\n+/g, '\n');
                line = lines.split("\n");
                console.log(addtitle,addbullets);
                PrimaryServices.addslidetoarrangement(id, addtitle, line, "", _.selectedpath, createGuid()).then(function(data) {
                    _.snackbarview(data);
                    _.viewarrangement(_.selectedpath,"CALL FROM ADD");
                    _.resetdata(0);
                });
            break;
            case 3:
                addtitle = document.getElementById("title").value;
                addimageurl = document.getElementById("image").value;
                //console.log(title,imageurl);
                PrimaryServices.addslidetoarrangement(id, addtitle, empty, addimageurl, _.selectedpath, createGuid()).then(function(data) {
                    _.snackbarview(data);
                    _.viewarrangement(_.selectedpath,"CALL FROM ADD");
                    _.resetdata(1);
                });
            break;
            case 4:
            case 5:
                addtitle = document.getElementById("title").value;
                //console.log(addtitle,document.getElementById("title").value);
                PrimaryServices.addslidetoarrangement(id, addtitle, empty, "", _.selectedpath, createGuid()).then(function(data) {
                    _.snackbarview(data);
                    _.viewarrangement(_.selectedpath,"CALL FROM ADD");
                    _.resetdata(2);
                });
            break;
            default:
            break;
        }
        
        //
    };

    _.snackbarview = function(message) {
        var x = document.getElementById("snackbar")
        x.innerHTML = message;
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
    };
    _.init();

    _.viewarrangement = function(path, desc) {
        // console.log(desc);
        _.selecteditem = -1;
        _.visibilityobj.isArrangementSelected = true;
        _.visibilityobj.tabSelected = _.visibilityobj.tabSelected == 0 ? 1 : _.visibilityobj.tabSelected;
        if (_.selectedpath != path || desc ==='CALL FROM ADD') {
            PrimaryServices.viewarrangement(path).then(function(data) {
                //  console.log(data);
                _.visibilityobj.selected = "none";
                if (data.slides.length > 0) {_.slides = data.slides;} else {_.slides = [];}
                _.selectedpath = path;
            });
        }
    };

    _.setTab = function(id) {
        _.visibilityobj.tabSelected = id;
        _.visibilityobj.mode = -1;
        _.title = "";
        _.bullets = "";
        _.imageurl = "";
    };

    _.openSlide = function(id) {
        //console.log(_.slides[id]);
        _.visibilityobj.mode = 1;
        _.slidelayout = _.slides[id].slidetype;
        _.GUID = _.slides[id].uuid;
        _.visibilityobj.GUID =  _.slides[id].uuid;
        switch(_.slidelayout) {
            case 1:
            case 2:
                _.bullets = "";
                _.title = _.slides[id].slidetitle;
                for (j = 0; j < _.slides[id].slidebullets.length; j++) {
                    _.bullets = _.bullets + _.slides[id].slidebullets[j] + '\n';
                }
                _.bullets = _.bullets.slice(0, -1);
            break;
            case 3:

            break;
            case 4:
            case 5:
                _.bullets = "";
                _.title = _.slides[id].slidetitle;
                _.imageurl = "";
            break;
        }
    };

    function createGuid()
    {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    _.updatearrangement = function(id) {
        // console.log("You modified slide type",id);
        switch (id) {
            case 1:
            case 2:
                PrimaryServices.updateslideinarrangement( id,_.selectedpath, _.GUID, _.title, _.bullets, "").then(function(data) {
                    _.snackbarview(data);
                    _.viewarrangement(_.selectedpath,"CALL FROM ADD");
                });
            break;
            case 3:
            break;
            case 4:
            case 5:
                PrimaryServices.updateslideinarrangement( id,_.selectedpath, _.GUID, _.title, empty, "").then(function(data) {
                    _.snackbarview(data);
                    _.viewarrangement(_.selectedpath,"CALL FROM ADD");
                });
            break;
        };
    };

    _.deleteslide = function() {
        var r = confirm("Are you sure you want to delete this slide ?");
        if (r == true) {
            PrimaryServices.deleteslideinarrangement(_.selectedpath, _.GUID).then(function(data) {
                _.snackbarview(data);
                _.viewarrangement(_.selectedpath,"CALL FROM ADD");
                _.visibilityobj.mode = -1;
            });
        } else {
            console.log("You pressed Cancel!");
        }
    };

    _.preview = function(id) {
        switch(id) {
            case 1:
            PrimaryServices.projectorparser
            ("SLIDES-1", document.getElementById("title").value, "NA", document.getElementById("bullets").value);
            break;
            case 2:
            PrimaryServices.projectorparser
            ("SLIDES-2", document.getElementById("title").value, "NA", document.getElementById("bullets").value);
            break;
            case 3:
            
            break;
            case 4:
            PrimaryServices.projectorparser
            ("SLIDES-4", document.getElementById("title").value, "NA", "NA");
            break;
            case 5:
            PrimaryServices.projectorparser
            ("SLIDES-5", document.getElementById("title").value, "NA", "NA");
            break;
        }   
    }

    _.deleteslide = function() {
        _.snackbarview("Feature is disabled for now!");
    }
}