<?php

/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
require 'vendor/autoload.php';
require 'AccesoDatos.php';

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
/**
* GET: Para consultar y leer recursos
* POST: Para crear recursos
* PUT: Para editar recursos
* DELETE: Para eliminar recursos
*
*  GET: Para consultar y leer recursos */

$app->post('/usuario/foto', function ($request, $response, $args) {

    if ( !empty( $_FILES ) ) {
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    // Setear el path a la carpeta donde se cargaran los archivos
    $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    move_uploaded_file( $tempPath, $uploadPath );
    $answer = array( 'answer' => 'Archivo Cargado!' );
    $json = json_encode( $answer );
    return $json;
    } else {

    return 'No se cargo el archivo';
    }   
    
    
    
});

$app->get('/usuarios[/]', function ($request, $response, $args) {
    $response->write("Lista de usuarios");
    
    return $response;
});

$app->get('/usuario[/{id}[/{name}]]', function ($request, $response, $args) {
    $response->write("Datos usuario ");
    var_dump($args);
    return $response;
});
/* POST: Para crear recursos */
$app->post('/usuario/{voto}', function ($request, $response, $args) {

    $voto = json_decode($args["voto"]);

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into votos (dni,sexo,fechanac,partido) values(:dni,:sexo,:fechanac,:partido)");
    $consulta->bindValue(':dni',$voto->dni, PDO::PARAM_STR);
    $consulta->bindValue(':sexo', $voto->sexo, PDO::PARAM_STR);
    $consulta->bindValue(':fechanac', $voto->fechanac, PDO::PARAM_STR);
    $consulta->bindValue(':partido', $voto->partido, PDO::PARAM_STR);
    $consulta->execute();

    return $objetoAccesoDato->RetornarUltimoIdInsertado();

});

// /* PUT: Para editar recursos */
$app->put('/votos/{objeto}', function ($request, $response, $args) {
    
    $voto = json_decode($args["objeto"]);

            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
            $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE votos SET sexo = :sexo,
                partido = :partido, fechanac = :fechanac WHERE dni = :dni");
            $consulta->bindValue(':dni',$voto->dni, PDO::PARAM_STR);
            $consulta->bindValue(':sexo',$voto->sexo, PDO::PARAM_STR);
            $consulta->bindValue(':partido', $voto->partido, PDO::PARAM_STR);
            $consulta->bindValue(':fechanac', $voto->fechanac, PDO::PARAM_STR);
            return $consulta->execute();
});

// /* DELETE: Para eliminar recursos */
$app->delete('/persona/{dni}', function ($request, $response, $args) {

    $dni = $args["dni"];
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta =$objetoAccesoDato->RetornarConsulta("DELETE  FROM votos WHERE dni = :dni ");
    $consulta->bindValue(':dni',$dni, PDO::PARAM_STR);
    $consulta->execute();

    return $consulta->rowCount();
    
});

$app->get('/votos', function ($request, $response, $args) {

    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM votos ");
    $consulta->execute();
    $arrVotos = json_encode($consulta->fetchAll());
    return $arrVotos; 

    
});
/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
