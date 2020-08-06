<?php

class ControladorRegistros{

    static public function ctrRegistrar($datos){

        echo json_encode($datos);

    }
}

if (isset($_POST['departamento'])) {

    $datos = array('departamento' => $_POST['departamento'],
                   'ciudad' => $_POST['ciudad'],
                   'nombre' => $_POST['nombre'],
                   'correo' => $_POST['correo'], );
    
    $registro = new ControladorRegistros();
    $registro = ctrRegistrar($datos);
}