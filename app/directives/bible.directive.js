'use strict';

angular.module('myApp.directives', [])
// 40, 38 13 (down, up, enter)
  .directive('bibletypeaheadbook', function($timeout) {
    return {
        restrict: 'AEC',
        scope: {
            items: '=',
            prompt:'@',
            title: '@',
            subtitle:'@',
            model: '=',
            selectedobj: '=',
            onSelect:'&',
            identifier: '='
        },
        link:function(scope,elem,attrs){
           scope.handleSelection=function(selectedItem, item){
             scope.model=selectedItem;
             scope.selectedobj = item;
             scope.current=0;
             scope.selected=true;        
             $timeout(function(){
                 scope.onSelect();
              },200);
          };
          scope.current=0;
          scope.selected=true;
          scope.scrollindex = 1;
          scope.isCurrent=function(index){
             return scope.current===index;
          };
          scope.setCurrent=function(index){
             scope.current=index;
          };

          scope.key = function($event) {
            console.log($event.keyCode);
            if ($event.keyCode != 9)  scope.selected=false ;
            if ($event.keyCode === 27)  scope.selected=false ;
            //console.log(scope.filteredBooks.length);
            if ($event.keyCode === 40) {
                scope.scrollindex = scope.scrollindex +1;
                if (scope.scrollindex > scope.filteredBooks.length) {
                    scope.scrollindex = 1;
                } 
            }
            if ($event.keyCode ===38) {
                scope.scrollindex = scope.scrollindex -1;
                if (scope.scrollindex < 1) {
                    scope.scrollindex = scope.filteredBooks.length;
                } 
            }
            if ($event.keyCode ===13 && scope.model.length != 0) {
                scope.selected = true;
                scope.model=scope.filteredBooks[scope.scrollindex -1].book;
                scope.selectedobj = scope.filteredBooks[scope.scrollindex -1];
                scope.current=0;
                scope.selected=true;        
                $timeout(function(){
                    scope.onSelect();
                 },200);
            }
            if (scope.model && scope.model.length ===0) {
                scope.scrollindex = 1;
            }
            if ($event.keyCode ===9 && scope.model.length!=0 && scope.filteredBooks.length > 0) {
                scope.selected = true;
                scope.model=scope.filteredBooks[scope.scrollindex -1].book;
                scope.selectedobj = scope.filteredBooks[scope.scrollindex -1];
                scope.current=0;
                scope.selected=true;        
                $timeout(function(){
                    scope.onSelect();
                 },200);
            }
          };
        },
        templateUrl: 'directives/templateurl.html'
      }
  })
  .directive('bibletypeaheadchapter', function($timeout) {
    return {
        restrict: 'AEC',
        scope: {
            items: '=',
            prompt:'@',
            title: '@',
            subtitle:'@',
            model: '=',
            selectedobj: '=',
            onSelect:'&',
            identifier: '='
        },
        link:function(scope,elem,attrs){
           scope.handleSelection=function(selectedItem, item){
             scope.model=selectedItem;
             scope.selectedobj = item;
             scope.current=0;
             scope.selected=true;        
             $timeout(function(){
                 scope.onSelect();
              },200);
          };
          scope.current=0;
          scope.selected=true;
          scope.scrollindex = 1;
          scope.isCurrent=function(index){
             return scope.current===index;
          };
          scope.setCurrent=function(index){
             scope.current=index;
          };

          scope.key = function($event) {
            console.log($event.keyCode);
            if ($event.keyCode != 9)  scope.selected=false ;
            if ($event.keyCode === 27)  scope.selected=false ;
            //console.log(scope.filteredBooks.length);
            if ($event.keyCode === 40) {
                scope.scrollindex = scope.scrollindex +1;
                if (scope.scrollindex > scope.filteredBooks.length) {
                    scope.scrollindex = 1;
                } 
            }
            if ($event.keyCode ===38) {
                scope.scrollindex = scope.scrollindex -1;
                if (scope.scrollindex < 1) {
                    scope.scrollindex = scope.filteredBooks.length;
                } 
            }
            if ($event.keyCode ===13 && scope.model.length != 0) {
                scope.selected = true;
                scope.model=scope.filteredBooks[scope.scrollindex -1].chapter;
                scope.selectedobj = scope.filteredBooks[scope.scrollindex -1];
                scope.current=0;
                scope.selected=true;        
                $timeout(function(){
                    scope.onSelect();
                 },200);
            }
            if (scope.model && scope.model.length ===0) {
                scope.scrollindex = 1;
            }
            if ($event.keyCode ===9 && scope.model.length!=0 && scope.filteredBooks.length > 0) {
                scope.selected = true;
                scope.model=scope.filteredBooks[scope.scrollindex -1].chapter;
                scope.selectedobj = scope.filteredBooks[scope.scrollindex -1];
                scope.current=0;
                scope.selected=true;        
                $timeout(function(){
                    scope.onSelect();
                 },200);
            }
          };
        },
        templateUrl: 'directives/templateurl.html'
      }
  })
  .directive('bibletypeaheadverse', function($timeout) {
    return {
        restrict: 'AEC',
        scope: {
            items: '=',
            prompt:'@',
            title: '@',
            subtitle:'@',
            model: '=',
            selectedobj: '=',
            onSelect:'&',
            identifier: '='
        },
        link:function(scope,elem,attrs){
           scope.handleSelection=function(selectedItem, item){
             scope.model=selectedItem;
             scope.selectedobj = item;
             scope.current=0;
             scope.selected=true;        
             $timeout(function(){
                 scope.onSelect();
              },200);
          };
          scope.current=0;
          scope.selected=true;
          scope.scrollindex = 1;
          scope.isCurrent=function(index){
             return scope.current===index;
          };
          scope.setCurrent=function(index){
             scope.current=index;
          };

          scope.key = function($event) {
            console.log($event.keyCode);
            if ($event.keyCode != 9)  scope.selected=false ;
            if ($event.keyCode === 27)  scope.selected=false ;
            //console.log(scope.filteredBooks.length);
            if ($event.keyCode === 40) {
                scope.scrollindex = scope.scrollindex +1;
                if (scope.scrollindex > scope.filteredBooks.length) {
                    scope.scrollindex = 1;
                } 
            }
            if ($event.keyCode ===38) {
                scope.scrollindex = scope.scrollindex -1;
                if (scope.scrollindex < 1) {
                    scope.scrollindex = scope.filteredBooks.length;
                } 
            }
            if ($event.keyCode ===13 && scope.model.length != 0) {
                scope.selected = true;
                scope.model=scope.filteredBooks[scope.scrollindex -1].verse;
                scope.selectedobj = scope.filteredBooks[scope.scrollindex -1];
                scope.current=0;
                scope.selected=true;        
                $timeout(function(){
                    scope.onSelect();
                 },200);
            }
            if (scope.model && scope.model.length ===0) {
                scope.scrollindex = 1;
            }
            
            if ($event.keyCode ===9 && scope.model.length!=0 && scope.filteredBooks.length > 0) {
                scope.selected = true;
                scope.model=scope.filteredBooks[scope.scrollindex -1].verse;
                scope.selectedobj = scope.filteredBooks[scope.scrollindex -1];
                scope.current=0;
                scope.selected=true;        
                $timeout(function(){
                    scope.onSelect();
                 },200);
            }
          };
        },
        templateUrl: 'directives/templateurl.html'
      }
  })
  .directive('focus', function($timeout, $parse) {
    return {
      link: function(scope, element, attrs) {
        var model = $parse(attrs.focus);
        scope.$watch(model, function(value) {
          if(value === true) { 
            $timeout(function() {
              element[0].focus(); 
            });
          }
        });
      }
    };
  });