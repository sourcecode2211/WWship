'use strict';

angular.module('myApp.home', [])

  .controller('homeCtrl')
  .controller('lyricsCtrl')

homeCtrl.$inject = ['$scope', '$location', 'PrimaryServices']
function homeCtrl($scope, $location, PrimaryServices) {

};

lyricsCtrl.$inject = ['$scope', '$location']
function lyricsCtrl($scope, $location) {
};