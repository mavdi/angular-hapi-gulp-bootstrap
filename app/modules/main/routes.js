"use strict";

angular.module('app.routes', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
  console.log('hola');
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('main', {
    url: '',
    abstract: true,
    templateUrl: 'common/views/container.html',
  })
  .state('main.home', {
    url: '/',
    templateUrl: 'modules/main/index.html',
    controller: 'MainCtrl'
  });
});