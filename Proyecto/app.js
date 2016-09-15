var proyecto = angular.module('proyecto',['ui.router']);

proyecto.config(function ($stateProvider, $urlRouterProvider){

  $stateProvider

  	// pagina principal
      .state('inicio', {
                url : '/inicio',
                templateUrl : 'vistas/main.html',

            })

    // navbar fija de ABM
      .state('abm', {
                url : '/abm',
                abstract:true,
                templateUrl : 'vistas/abmAbstract.html',
            })

 	// pagina de alta	 
      .state('abm.alta', {
                url: '/alta',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/abmAlta.html',
                        controller: 'abmAltaCtrl'
                    }
                }
            })

    // pagina de grilla  
      .state('abm.grilla', {
                url: '/grilla',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/abmGrilla.html',
                    }
                }
            })

    // navbar fija de Juego
      .state('juego', {
                url : '/juego',
                abstract:true,
                templateUrl : 'vistas/juegoAbstract.html',
            })

    // pagina de juego1
      .state('juego.juego1', {
                url: '/juego1',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/juegoJuego1.html',
                    }
                }
            })      		

      .state('juego.juego2', {
                url: '/juego2',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/juegoJuego2.html',
                    }
                }
            })


   
   $urlRouterProvider.otherwise('/inicio');
})

.controller('abmAltaCtrl',function($scope,$http){

});


