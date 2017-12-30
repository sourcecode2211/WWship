'use strict';
const path = require('path');
const ipcRenderer = require('electron').ipcRenderer;
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'myApp.home',
  'myApp.bible',
  'myApp.media',
  'myApp.arrangement',
  'ui.router',
  'myApp.services',
  'ngSanitize',
  'myApp.ipcservices',
  'myApp.stateservices',
  //'myApp.settings',
  'myApp.textUtils',
  'angular-virtual-keyboard',
  'myApp.directives',
  'cfp.hotkeys'
])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $stateProvider
      .state({
        name: 'arrangement',
        url: '/arrangement',
        templateUrl: path.join(__dirname, '/views/arrangement.html'),
        controller: newArrangementCtrl,
        controllerAs: 'navm'
      })

      .state({
        name: 'bible',
        url: '/bible',
        templateUrl: path.join(__dirname, '/views/bible.html'),
        controller: bibleCtrl,
        controllerAs: 'bvm'
      })
      .state({
        name: 'images',
        url: '/images',
        templateUrl: path.join(__dirname, '/views/images.html'),
        controller: imageCtrl,
        controllerAs: 'ivm'
      })
      .state({
        name: 'lyrics',
        url: '/lyrics',
        templateUrl: path.join(__dirname, '/views/lyrics.html'),
        controller: lyricsCtrl,
        controllerAs: 'lvm'
      })
      .state({
        name: 'video',
        url: '/video',
        templateUrl: path.join(__dirname, '/views/video.html'),
        controller: videoCtrl,
        controllerAs: 'vvm'
      })
      .state({
        name: 'slide',
        url: '/slide',
        templateUrl: path.join(__dirname, '/views/slide.html'),
        controller: slideCtrl,
        controllerAs: 'svm'
      })
      .state({
        name: 'home',
        url: '/home',
        templateUrl: path.join(__dirname, '/views/home.html'),
        controller: homeCtrl,
        controllerAs: 'vm'
      })
      .state({
        name: 'marquee',
        url: '/marquee',
        templateUrl: path.join(__dirname, '/views/marquee.html'),
        controller: marqueeCtrl,
        controllerAs: 'mvm'
      })
      .state({
        name: 'utils',
        url: '/utils',
        templateUrl: path.join(__dirname, '/views/textutils.html'),
        controller: textUtilsCtrl,
        controllerAs: 'tvm'
      })
      // .state({
      //   name: 'settings',
      //   url: '/settings',
      //   templateUrl: path.join(__dirname, '/views/settings.html'),
      //   controller: settingsCtrl,
      //   controllerAs: 'svm'
      // })
      .state({
        name: 'browser',
        url: '/browser',
        templateUrl: path.join(__dirname, '/views/browser.html'),
        controller: browserCtrl,
        controllerAs: 'brvm'
      });

    // By default
    $urlRouterProvider.otherwise('/home');
  })
  .config(function($sceProvider) {
    $sceProvider.enabled(false);
  })
  .config(['VKI_CONFIG', function(VKI_CONFIG) {

    VKI_CONFIG.layout['TAMIL - \u0ba4\u0bae\u0bbf\u0bb4\u0bcd'] = {
      'name': "Tamil", 'keys': [
        [["\u0BCA", "\u0B92"], ["1", "", "\u0BE7"], ["2", "", "\u0BE8"], ["3", "", "\u0BE9"], ["4", "", "\u0BEA"], ["5", "", "\u0BEB"], ["6", "\u0BA4\u0BCD\u0BB0", "\u0BEC"], ["7", "\u0B95\u0BCD\u0BB7", "\u0BED"], ["8", "\u0BB7\u0BCD\u0BB0", "\u0BEE"], ["9", "", "\u0BEF"], ["0", "", "\u0BF0"], ["-", "\u0B83", "\u0BF1"], ["", "", "\u0BF2"], ["Bksp", "Bksp"]],
        [["Tab", "Tab"], ["\u0BCC", "\u0B94"], ["\u0BC8", "\u0B90"], ["\u0BBE", "\u0B86"], ["\u0BC0", "\u0B88"], ["\u0BC2", "\u0B8A"], ["\u0BAA", "\u0BAA"], ["\u0BB9", "\u0B99"], ["\u0B95", "\u0B95"], ["\u0BA4", "\u0BA4"], ["\u0B9C", "\u0B9A"], ["\u0B9F", "\u0B9F"], ["\u0B9E"]],
        [["Caps", "Caps"], ["\u0BCB", "\u0B93"], ["\u0BC7", "\u0B8F"], ["\u0BCD", "\u0B85"], ["\u0BBF", "\u0B87"], ["\u0BC1", "\u0B89"], ["\u0BAA", "\u0BAA"], ["\u0BB0", "\u0BB1"], ["\u0B95", "\u0B95"], ["\u0BA4", "\u0BA4"], ["\u0B9A", "\u0B9A"], ["\u0B9F", "\u0B9F"], ["Enter", "Enter"]],
        [["Shift", "Shift"], ["\u0BC6", "\u0B8E"], [""], ["\u0BAE", "\u0BA3"], ["\u0BA8", "\u0BA9"], ["\u0BB5", "\u0BB4"], ["\u0BB2", "\u0BB3"], ["\u0BB8", "\u0BB7"], [",", "\u0BB7"], [".", "\u0BB8\u0BCD\u0BB0\u0BC0"], ["\u0BAF", "\u0BAF"], ["Shift", "Shift"]],
        [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
      ], 'lang': ["ta"] };
    
  VKI_CONFIG.layout['TELUGU - \u0c24\u0c46\u0c32\u0c41\u0c17\u0c41'] = {
  'name': "Telugu", 'keys': [
    [["\u0C4A", "\u0C12"], ["1", "", "\u0C67"], ["2", "", "\u0C68"], ["3", "\u0C4D\u0C30", "\u0C69"], ["4", "", "\u0C6A"], ["5", "\u0C1C\u0C4D\u0C1E", "\u0C6B"], ["6", "\u0C24\u0C4D\u0C30", "\u0C6C"], ["7", "\u0C15\u0C4D\u0C37", "\u0C6D"], ["8", "\u0C36\u0C4D\u0C30", "\u0C6E"], ["9", "(", "\u0C6F"], ["0", ")", "\u0C66"], ["-", "\u0C03"], ["\u0C43", "\u0C0B", "\u0C44"], ["Bksp", "Bksp"]],
    [["Tab", "Tab"], ["\u0C4C", "\u0C14"], ["\u0C48", "\u0C10", "\u0C56"], ["\u0C3E", "\u0C06"], ["\u0C40", "\u0C08", "", "\u0C61"], ["\u0C42", "\u0C0A"], ["\u0C2C"], ["\u0C39", "\u0C19"], ["\u0C17", "\u0C18"], ["\u0C26", "\u0C27"], ["\u0C1C", "\u0C1D"], ["\u0C21", "\u0C22"], ["", "\u0C1E"]],
    [["Caps", "Caps"], ["\u0C4B", "\u0C13"], ["\u0C47", "\u0C0F", "\u0C55"], ["\u0C4D", "\u0C05"], ["\u0C3F", "\u0C07", "", "\u0C0C"], ["\u0C41", "\u0C09"], ["\u0C2A", "\u0C2B"], ["\u0C30", "\u0C31"], ["\u0C15", "\u0C16"], ["\u0C24", "\u0C25"], ["\u0C1A", "\u0C1B"], ["\u0C1F", "\u0C25"], ["Enter", "Enter"]],
    [["Shift", "Shift"], ["\u0C46", "\u0C0E"], ["\u0C02", "\u0C01"], ["\u0C2E", "\u0C23"], ["\u0C28", "\u0C28"], ["\u0C35"], ["\u0C32", "\u0C33"], ["\u0C38", "\u0C36"], [",", "\u0C37"], ["."], ["\u0C2F"], ["Shift", "Shift"]],
    [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
  ], 'lang': ["te"] };
  
  VKI_CONFIG.layout['HINDI - \u0939\u093f\u0902\u0926\u0940'] = {
      'name': "Hindi", 'keys': [
        [["\u200d", "\u200c", "`", "~"], ["1", "\u090D", "\u0967", "!"], ["2", "\u0945", "\u0968", "@"], ["3", "\u094D\u0930", "\u0969", "#"], ["4", "\u0930\u094D", "\u096A", "$"], ["5", "\u091C\u094D\u091E", "\u096B", "%"], ["6", "\u0924\u094D\u0930", "\u096C", "^"], ["7", "\u0915\u094D\u0937", "\u096D", "&"], ["8", "\u0936\u094D\u0930", "\u096E", "*"], ["9", "(", "\u096F", "("], ["0", ")", "\u0966", ")"], ["-", "\u0903", "-", "_"], ["\u0943", "\u090B", "=", "+"], ["Bksp", "Bksp"]],
        [["Tab", "Tab"], ["\u094C", "\u0914"], ["\u0948", "\u0910"], ["\u093E", "\u0906"], ["\u0940", "\u0908"], ["\u0942", "\u090A"], ["\u092C", "\u092D"], ["\u0939", "\u0919"], ["\u0917", "\u0918"], ["\u0926", "\u0927"], ["\u091C", "\u091D"], ["\u0921", "\u0922", "[", "{"], ["\u093C", "\u091E", "]", "}"], ["\u0949", "\u0911", "\\", "|"]],
        [["Caps", "Caps"], ["\u094B", "\u0913"], ["\u0947", "\u090F"], ["\u094D", "\u0905"], ["\u093F", "\u0907"], ["\u0941", "\u0909"], ["\u092A", "\u092B"], ["\u0930", "\u0931"], ["\u0915", "\u0916"], ["\u0924", "\u0925"], ["\u091A", "\u091B", ";", ":"], ["\u091F", "\u0920", "'", '"'], ["Enter", "Enter"]],
        [["Shift", "Shift"], [""], ["\u0902", "\u0901", "", "\u0950"], ["\u092E", "\u0923"], ["\u0928"], ["\u0935"], ["\u0932", "\u0933"], ["\u0938", "\u0936"], [",", "\u0937", ",", "<"], [".", "\u0964", ".", ">"], ["\u092F", "\u095F", "/", "?"], ["Shift", "Shift"]],
        [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
      ], 'lang': ["hi"] };

      VKI_CONFIG.layout['KANNADA - \u0c95\u0ca8\u0ccd\u0ca8\u0ca1'] = {
        'name': "Kannada", 'keys': [
          [["\u0CCA", "\u0C92"], ["1", "", "\u0CE7"], ["2", "", "\u0CE8"], ["3", "\u0CCD\u0CB0", "\u0CE9"], ["4", "\u0CB0\u0CCD", "\u0CEA"], ["5", "\u0C9C\u0CCD\u0C9E", "\u0CEB"], ["6", "\u0CA4\u0CCD\u0CB0", "\u0CEC"], ["7", "\u0C95\u0CCD\u0CB7", "\u0CED"], ["8", "\u0CB6\u0CCD\u0CB0", "\u0CEE"], ["9", "(", "\u0CEF"], ["0", ")", "\u0CE6"], ["-", "\u0C83"], ["\u0CC3", "\u0C8B", "\u0CC4", "\u0CE0"], ["Bksp", "Bksp"]],
          [["Tab", "Tab"], ["\u0CCC", "\u0C94"], ["\u0CC8", "\u0C90", "\u0CD6"], ["\u0CBE", "\u0C86"], ["\u0CC0", "\u0C88", "", "\u0CE1"], ["\u0CC2", "\u0C8A"], ["\u0CAC", "\u0CAD"], ["\u0CB9", "\u0C99"], ["\u0C97", "\u0C98"], ["\u0CA6", "\u0CA7"], ["\u0C9C", "\u0C9D"], ["\u0CA1", "\u0CA2"], ["Enter", "Enter"]],
          [["Caps", "Caps"], ["\u0CCB", "\u0C93"], ["\u0CC7", "\u0C8F", "\u0CD5"], ["\u0CCD", "\u0C85"], ["\u0CBF", "\u0C87", "", "\u0C8C"], ["\u0CC1", "\u0C89"], ["\u0CAA", "\u0CAB", "", "\u0CDE"], ["\u0CB0", "\u0CB1"], ["\u0C95", "\u0C96"], ["\u0CA4", "\u0CA5"], ["\u0C9A", "\u0C9B"], ["\u0C9F", "\u0CA0"], ["", "\u0C9E"]],
          [["Shift", "Shift"], ["\u0CC6", "\u0C8F"], ["\u0C82"], ["\u0CAE", "\u0CA3"], ["\u0CA8"], ["\u0CB5"], ["\u0CB2", "\u0CB3"], ["\u0CB8", "\u0CB6"], [",", "\u0CB7"], [".", "|"], ["\u0CAF"], ["Shift", "Shift"]],
          [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
        ], 'lang': ["kn"] };

        VKI_CONFIG.kt = 'TAMIL - \u0ba4\u0bae\u0bbf\u0bb4\u0bcd';

  }])
  .run(function ($rootScope) {
    ipcRenderer.on('images-folder-selected', function(event, arg) {
      $rootScope.$broadcast('Image-Folder-Selected', { "dirpath": arg });
    });

    ipcRenderer.on('video-folder-selected', function(event, arg) {
      $rootScope.$broadcast('Video-Folder', { "dirpath": arg });
    });
  })
  .controller('bodyController', ['$scope', '$location', 'PrimaryServices', function ($scope, $location, PrimaryServices ) {
    var scriptureBgcolor,scriptureFontcolor,scriptureFontsizeVerse,scriptureFontsizeReference,scriptureRadio,GUID;
    $scope.selection = 0;
    $scope.settingsdata={};

    $scope.view = function(id) {
      console.log("Inside View",id);
      $scope.selection = id;
    }

    $scope.init=function() {
        PrimaryServices.getVideoInformation().then(function(data) {
            //console.log(data);
            $scope.settingsdata = data;
        });
    };

    $scope.init();

    $scope.savegeneral = function() {
        var e = document.getElementById('language');
        scriptureBgcolor = e.options[e.selectedIndex].value;

        e = document.getElementById('translation');
        scriptureFontcolor = e.options[e.selectedIndex].value;

        GUID = createGuid();
        $scope.settingsdata.general.GUID = GUID;
        $scope.settingsdata.general.language = scriptureBgcolor;
        $scope.settingsdata.general.bibleversion = scriptureFontcolor;

        PrimaryServices.setVideoInformation($scope.settingsdata).then(function(data) {
            console.log(data);
        });
    };


    $scope.savescripture = function() {
        scriptureBgcolor = document.getElementById('scripture-bgcolor').value;
        scriptureBgcolor = /^#[0-9a-f]{3,6}$/i.test(scriptureBgcolor) ? scriptureBgcolor : "#000000";
        scriptureFontcolor = document.getElementById('scripture-fontcolor').value;
        scriptureFontcolor = /^#[0-9a-f]{3,6}$/i.test(scriptureFontcolor) ? scriptureFontcolor : "#FFFFFF";
        scriptureFontsizeVerse = document.getElementById('scripture-fontsize-verse').value + "px";
        scriptureFontsizeReference = document.getElementById('scripture-fontsize-reference').value + "px";
        console.log(document.getElementById("result").value);
        GUID = createGuid();
        $scope.settingsdata.scripture.GUID = GUID;
        $scope.settingsdata.scripture.bgcolor = scriptureBgcolor;
        $scope.settingsdata.scripture.fontReference = scriptureFontsizeReference;
        $scope.settingsdata.scripture.fontcolor = scriptureFontcolor;
        $scope.settingsdata.scripture.fontsize = scriptureFontsizeVerse;
        $scope.settingsdata.scripture.textTransform = document.getElementById("result").value;
        PrimaryServices.setVideoInformation($scope.settingsdata).then(function(data) {
            console.log(data);
        });
    };

    $scope.savelyrics = function() {
        scriptureBgcolor = document.getElementById('lyrics-bgcolor').value;
        scriptureBgcolor = /^#[0-9a-f]{3,6}$/i.test(scriptureBgcolor) ? scriptureBgcolor : "#000000";
        scriptureFontcolor = document.getElementById('lyrics-fontcolor').value;
        scriptureFontcolor = /^#[0-9a-f]{3,6}$/i.test(scriptureFontcolor) ? scriptureFontcolor : "#FFFFFF";
        scriptureFontsizeVerse = document.getElementById('lyrics-fontsize-verse').value + "px";
        console.log(document.getElementById("result").value);
        GUID = createGuid();
        $scope.settingsdata.lyrics.GUID = GUID;
        $scope.settingsdata.lyrics.bgcolor = scriptureBgcolor;
        $scope.settingsdata.lyrics.fontcolor = scriptureFontcolor;
        $scope.settingsdata.lyrics.fontsize = scriptureFontsizeVerse;
        $scope.settingsdata.lyrics.textTransform = document.getElementById("result").value;
        PrimaryServices.setVideoInformation($scope.settingsdata).then(function(data) {
            console.log(data);
        });
    };

    $scope.savemarquee = function() {
        scriptureBgcolor = document.getElementById('marquee-bgcolor').value;
        scriptureBgcolor = /^#[0-9a-f]{3,6}$/i.test(scriptureBgcolor) ? scriptureBgcolor : "#000000";
        scriptureFontcolor = document.getElementById('marquee-fontcolor').value;
        scriptureFontcolor = /^#[0-9a-f]{3,6}$/i.test(scriptureFontcolor) ? scriptureFontcolor : "#FFFFFF";
        scriptureFontsizeVerse = document.getElementById('marquee-fontsize').value + "px";
        console.log(document.getElementById("result").value);
        GUID = createGuid();
        $scope.settingsdata.marquee.GUID = GUID;
        $scope.settingsdata.marquee.bgcolor = scriptureBgcolor;
        $scope.settingsdata.marquee.fontcolor = scriptureFontcolor;
        $scope.settingsdata.marquee.fontsize = scriptureFontsizeVerse;
        $scope.settingsdata.marquee.textTransform = document.getElementById("result").value;
        PrimaryServices.setVideoInformation($scope.settingsdata).then(function(data) {
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

    $scope.isSettingsClicked = false;
    $scope.menu = 0;
    $scope.go = function (p) {
      $scope.menu = p;
      switch(p) {
        case 1: 
        $location.path('/arrangement');
        break;
        case 2: 
        $location.path('/lyrics');
        break;
        case 3: 
        $location.path('/bible');
        break;
        case 4: 
        $location.path('/video');
        break;
        case 5: 
        $location.path('/images');
        break;
        case 6: 
        $location.path('/slide');
        break;
        case 7: 
        $location.path('/marquee');
        break;
        case 8: 
        $location.path('/utils');
        break;
        case 9: 
        //$location.path('/settings');
        $scope.settings();
        break;
        case 10:
        $scope.quitApp();
        break;
        case 11: 
        $location.path('/browser');
        break;
      };
    };

    $scope.quitApp = function() {
      ipcRenderer.send('quit-application', true);
    }

    $scope.stop_projection = function() {
      //console.log("CLICKED")
      PrimaryServices.stopprojection();
    };

    $scope.settings = function() {
      $scope.isSettingsClicked = true;
    };

    $scope.closemodal = function() {
      $scope.isSettingsClicked = false;
      console.log($scope.menu);
    }
  }]);