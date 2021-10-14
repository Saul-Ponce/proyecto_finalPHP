<?php

require_once("../../Conexion/Modelo.php");
$modelo = new Modelo();

if (isset($_POST['eliminar_clasificacion_lista']) && $_POST['eliminar_clasificacion_lista']=="si_eliminala") {
    $array_eliminar = array(
        "table"=>"tb_clasificacion_lista",
        "id"=>$_POST['id']

    );
    $resultado = $modelo->eliminar_generica($array_eliminar);
    if($resultado[0]=='1' && $resultado[4]>0){
        print json_encode(array("Exito",$_POST,$resultado));
        exit();

    }else {
        print json_encode(array("Error",$_POST,$resultado));
        exit();
    }



}else if (isset($_POST['ingreso_datos']) && $_POST['ingreso_datos']=="si_actualizalo") {
    $_POST['direccion'] = "Sin direccion";
    $array_update = array(
        "table" => "tb_clasificacion_lista",
        "id" => $_POST['llave_clasificacion_lista'],
        "nombre" => $_POST['nombre'],
    );
    $resultado = $modelo->actualizar_generica($array_update);

    if($resultado[0]=='1' && $resultado[4]>0){
        print json_encode(array("Exito",$_POST,$resultado));
        exit();

    }else {
        print json_encode(array("Error",$_POST,$resultado));
        exit();
    }


}else if (isset($_POST['consultar_info']) && $_POST['consultar_info']=="si_consultala") {

    $resultado = $modelo->get_todos("tb_clasificacion_lista","WHERE id = '".$_POST['id']."'");
    if($resultado[0]=='1'){
        print json_encode(array("Exito",$_POST,$resultado[2][0]));
        exit();

    }else {
        print json_encode(array("Error",$_POST,$resultado));
        exit();
    }



}else if(isset($_POST['ingreso_datos']) && $_POST['ingreso_datos']=="si_registro"){
    $array_insertar = array(
        "table" => "tb_clasificacion_lista",
        "nombre" => $_POST['nombre'],
    );
    $result = $modelo->insertar_generica($array_insertar);
    if($result[0]=='1'){
        print json_encode(array("Exito",$_POST,$result));
        exit();

    }else {
        print json_encode(array("Error",$_POST,$result));
        exit();
    }
}
else if (isset($_POST['consultar_datos']) && $_POST['consultar_datos']=="si_consultalos") {
    $sql = "SELECT *FROM tb_clasificacion_lista";
    $resultado = $modelo->get_query($sql);

    $html=$html_tr="";
    if ($resultado[0]=="1"){
        foreach ($resultado[2] as $row){
            $html_tr.='<tr>
	                            <td>'.$row['nombre'].'</td>
	                            <td class="d-flex justify-content-center">
	                            <div class="dropdown m-b-10">
                                        <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Seleccione
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a data-id="'.$row['id'].'" class="dropdown-item btn_editar" href="javascript:void(0)">Editar</a>
                                            <a data-id="'.$row['id'].'" class="dropdown-item btn_eliminar" href="javascript:void(0)">Eliminar</a>
                                            <a data-id="'.$row['id'].'" class="dropdown-item btn_recuperar_pass" href="javascript:void(0)">Recuperar Contraseña</a>
                                        </div>
                                    </div>
</td>
	                    </tr>';
        }
        $html.='<table id="tabla_clasificacion_lista" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th class="w-75">Nombre</th>
                            <th class="w-auto d-flex justify-content-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>';
        $html.=$html_tr;
        $html.='</tbody>
                    	</table>';


        print json_encode(array("Exito",$html,$resultado[4]));
    }else{
        print json_encode(array("Error",$resultado));
    }
}

?>

