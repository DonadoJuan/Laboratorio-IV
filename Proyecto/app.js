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
                        controller: 'abmGrillaCtrl'
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
                        controller: 'juegoUnoCtrl'
                    }
                }
            })      		

      .state('juego.juego2', {
                url: '/juego2',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/juegoJuego2.html',
                        controller: 'juegoDosCtrl'
                    }
                }
            })


   
   $urlRouterProvider.otherwise('/inicio');
})

.controller('abmAltaCtrl',function($scope,$http){

})

.controller('abmGrillaCtrl',function($scope,$http){

    $scope.listado = {};

    $http.get("http://localhost:8080/proyecto/ws1/personas")
    .then(function (respuesta){

        $scope.listado = respuesta.data;
        console.info("Listado: ", $scope.listado);


    },function(error){

        console.info("Error: ", error);

    });

    $scope.borrar = function(id){

        $http.delete("http://localhost:8080/proyecto/ws1/persona/"+ id)
            .then(function (respuesta){

                console.info("Filas restantes: ", respuesta.data);


            },function(error){

                console.info("Error: ", error);

        });
    }

    $scope.modificar = function(persona){

        persona.nombre = "MODIFICADO POR PUT";

        $setTimeout(function() {}, );

        $http.put("http://localhost:8080/proyecto/ws1/persona/"+JSON.stringify(persona))
            .then(function (respuesta){

                console.info("Modificado: ", respuesta.data);


            },function(error){

                console.info("Error: ", error);

        });

    }            

})

.controller('juegoUnoCtrl',function($scope,$http,$window){

    $scope.gameover = true;

    $scope.iniciarJuego = function(){

        $scope.gameover = false;
        $scope.intentos = 0;
        $scope.numeroLoco = Math.floor((Math.random()*2)+1);
    }

    $scope.check = function(){

        if($scope.numeroLoco == $scope.numIngresado){
            $scope.intentos++;
            $window.alert("Ganaste maquinola! disfruta tu premio");
            $scope.gameover = true;
        }

        else{

            $scope.intentos++;
            if($scope.intentos > 4){
                $window.alert("Perdiste pequeño rufian, atenete a las consecuencias...");
                $scope.gameover = true;
            }
        }

        $scope.numIngresado = "";
    }

})

.controller('juegoDosCtrl',function($scope,$http,$window){

    $scope.iniciarJuego = function(){

        $scope.gameover = false;
        $scope.ganaste = false;

        $scope.uno = "regalo.png";
        $scope.dos = "regalo.png";
        $scope.tres = "regalo.png";
        $scope.cuatro = "regalo.png";
        $scope.cinco = "regalo.png";
        $scope.seis = "regalo.png";

        $scope.CajaGanadora = Math.floor((Math.random()*6)+1);
    }

    $scope.abrirRegalo = function(numeroRegalo){

        $scope.gameover = true;

        if($scope.CajaGanadora == numeroRegalo){
            $window.alert("Ganaste tigre de los alpes suizos!");
            $scope.ganaste = true;        
        }

        else{
            $window.alert("Perdiste, ahora sos amigo de peluchin :(");
        }

        if(!$scope.ganaste){

            switch(numeroRegalo){
                case '1': $scope.uno = "FLAVIO.jpg";
                break;
                case '2': $scope.dos = "FLAVIO.jpg";
                break;
                case '3': $scope.tres = "FLAVIO.jpg";
                break;
                case '4': $scope.cuatro = "FLAVIO.jpg";
                break;
                case '5': $scope.cinco = "FLAVIO.jpg";
                break;
                case '6': $scope.seis = "FLAVIO.jpg";
            }
        }


    else{

        switch(numeroRegalo){
            case '1': $scope.uno = "ganador.jpg";
            break;
            case '2': $scope.dos = "ganador.jpg";
            break;
            case '3': $scope.tres = "ganador.jpg";
            break;
            case '4': $scope.cuatro = "ganador.jpg";
            break;
            case '5': $scope.cinco = "ganador.jpg";
            break;
            case '6': $scope.seis = "ganador.jpg";
        }
    }



    }

    $scope.iniciarJuego();



})

.controller('loginCtrl',function($scope,$http,$auth){

    $scope.dato = {};

    $scope.login = function (){

        $auth.login({
            usuario: $scope.datos.usuario,
            clave: $scope.datos.clave
        })
        .then(function(response){
            if($auth.isAuthenticated()){
                //Si se logueó correctamente, isAuthenticated vale true. Entonces muestro por consola y redirijo al ABM.
                console.log("Sesión iniciada!");
                console.info("Info isAuthenticated: ", $auth.isAuthenticated());
                console.info("Info getPayload: ", $auth.getPayload());
                console.info("Info response: ", response);
                $state.go('abm.alta');
            }
            else{
                console.info("Info isAuthenticated: ", $auth.isAuthenticated());
                console.info("info no-login: ", $auth.getPayload());
            }
        },
        function(err){
            console.log("Error de conexión", err);
        });

    }

})

