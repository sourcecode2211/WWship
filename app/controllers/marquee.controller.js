'use strict';

angular.module('myApp.home', [])
    .controller('marqueeCtrl')

marqueeCtrl.$inject = ['$scope','PrimaryServices']
function marqueeCtrl($scope, PrimaryServices) {

    var _ = this;
    _.isLayout = 1;
    _.scrolltext = '';

    _.layout = function (id) {
        _.isLayout = id;
    }

    _.displayMarquee = function () {
        if (_.scrolltext.length > 0) {
            if ( _.isLayout === 1) {
                PrimaryServices.projectorparser("LOWERMARQUEE", _.scrolltext, "NA", "NA");
            }
            else {
                PrimaryServices.projectorparser("UPPERMARQUEE",  _.scrolltext, "NA", "NA");
            }
        }
    }
};