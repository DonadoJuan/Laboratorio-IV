var proyecto = angular.module('proyecto',['ui.router','satellizer','angularFileUpload']);

proyecto.config(function ($stateProvider, $urlRouterProvider,$authProvider){

 /*
$authProvider.loginUrl = 'Proyecto/servidor/php/auth.php'
$authProvider.tokenName = "miToken"
$authProvider.tokenPrefix = "proyecto"
$authProvider.authHeader = "data"
*/

  $stateProvider

      .state('inicio', {
                url : '/inicio',
                templateUrl : 'vistas/main.html',
                controller: 'loginCtrl'

            })

      .state('locales', {
                url : '/locales',
                templateUrl : 'vistas/locales.html',
                controller: 'localesCtrl'
            })

      .state('navbar', {
                url : '/navbar/:id',
                abtract: true, 
                templateUrl : 'vistas/navbarLocal.html'
            })
  
      .state('navbar.operaciones', {
                url: '/operaciones/',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/operaciones.html',
                        controller: 'operacionesCtrl'
                    }
                }
            })  
      .state('navbar.ofertas', {
                url: '/ofertas',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/ofertas.html',
                        controller: 'ofertasCtrl'
                    }
                }
            })

      .state('navbar.productos', {
                url: '/productos',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/productos.html',
                        controller: 'productosCtrl'
                    }
                }
            })

      .state('navbar.usuarios', {
                url: '/usuarios',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/usuarios.html',
                        controller: 'usuariosCtrl'
                    }
                }
            })

      .state('navbar.infoLocal', {
                url: '/infoLocal',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/infoLocal.html',
                        controller: 'infoLocalCtrl'
                    }
                }
            })
   
   $urlRouterProvider.otherwise('/inicio');
})

.controller('localesCtrl',function($scope){

$scope.locales = [{id: 1,nombre: 'la nueva',años: 29},{id:2,nombre: 'kosovo',años: 42}];

})

.controller('productosCtrl',function($scope,$stateParams){

    console.info("En vista productos: ",$stateParams.id);

})

.controller('operacionesCtrl',function($scope,$stateParams){

    console.info("En vista operaciones: ",$stateParams.id);

})

/*
.controller('abmAltaCtrl',function($scope,$http,FileUploader){

    $scope.uploader = new FileUploader({url: 'upload.php'});

    $scope.alta = {};


   // $scope.uploader.onWhenAddingFileFailed = function(item {File|FileLikeObject}, filter, options) {
       console.info('onWhenAddingFileFailed', item, filter, options);
    };
    $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
             console.info('onErrorItem', fileItem, response, status, headers);
    };
    $scope.uploader.onCompleteAll = function() {
             console.info('Se cargo con exito');
    };

    $scope.guardar = function(){

        $scope.uploader.uploadAll();

        var objetoVoto = JSON.stringify($scope.alta);

        $http.post("http://localhost/proyecto/ws1/usuario/" + objetoVoto)
            .then(function (respuesta){

            console.info("Exito", respuesta);


        },function(error){

            console.info("Error: ", error);

        });


    }

})

.controller('abmGrillaCtrl',function($scope,$http){

    $scope.listado = {};
    $scope.modificar = {};
    $scope.modo = false;

    $http.get("http://localhost/proyecto/ws1/votos")
    .then(function (respuesta){

        $scope.listado = respuesta.data;
        console.info("Listado: ", $scope.listado);


    },function(error){

        console.info("Error: ", error);

    });

    $scope.borrar = function(dni){

        $http.delete("http://localhost/proyecto/ws1/persona/"+ dni)
            .then(function (respuesta){

                console.info("Filas restantes: ", respuesta.data);


            },function(error){

                console.info("Error: ", error);

        });
    }

    $scope.desplegarMod = function (voto){

        $scope.modificar = voto;
        $scope.modo = true;
        $scope.modificar.fechanac = new Date(voto.fechanac);
        $scope.modificar.dni = parseInt(voto.dni);
    }

    $scope.actualizar = function(){

        $objetoVoto = JSON.stringify($scope.modificar);

        $http.put("http://localhost/proyecto/ws1/votos/" + $objetoVoto)
            .then(function (respuesta){

                console.info("Modificado: ", respuesta.data);
                $scope.modo = false;


            },function(error){

                console.info("Error: ", error);

        });

    }            

})
*/
.controller('loginCtrl',function($scope,$http,$auth,$state){

    $scope.datos = {};

    $scope.login = function (){

        $state.go('locales');
        /*
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
                $state.go('locales');
            }
            else{
                console.info("Info isAuthenticated: ", $auth.isAuthenticated());
                console.info("info no-login: ", $auth.getPayload());
            }
        },
        function(err){
            console.log("Error de conexión", err);
        });
        */
    }

})

