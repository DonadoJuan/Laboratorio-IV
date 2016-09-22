var proyecto = angular.module('proyecto',['ui.router','satellizer']);

proyecto.config(function ($stateProvider, $urlRouterProvider,$authProvider){

 
$authProvider.loginUrl = 'Proyecto/servidor/php/auth.php'
$authProvider.tokenName = "mitoken"
$authProvider.tokenPrefix = "proyecto"
$authProvider.authHeader = "data"

  $stateProvider

  	// pagina principal
      .state('inicio', {
                url : '/inicio',
                templateUrl : 'vistas/main.html',
                controller: 'loginCtrl'

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

})

.controller('loginCtrl',function($scope,$http,$auth){

    $scope.dato = {};

    $scope.login = function (){

        $auth.login(

            { usuario: $scope.dato.usuario,
              clave: $scope.dato.clave}
        )

        .then(
            function(rta){
                console.log("RTA", rta);
            if( $auth.isAuthenticated() )
                console.info("info login:",$auth.getPayload());
            },
            function(error){
                console.log("ERROR",error);
            }
        )

    }

})

