$(function (){
    $('#formulario_registro').parsley();
    cargar_datos();

    $(document).on("click",".btn_eliminar",function(e){
        e.preventDefault();
        var id = $(this).attr("data-id");
        var datos = {"eliminar_clasificacion_lista":"si_eliminala","id":id}
        $.ajax({
            dataType: "json",
            method: "POST",
            url:'json_clasificacion_lista.php',
            data : datos,
        }).done(function(json) {
            cargar_datos();

        });
    });
    $(document).on("click",".btn_editar",function(e){

        e.preventDefault();
        var id = $(this).attr("data-id");
        console.log("El id es: ",id);
        var datos = {"consultar_info":"si_consultala","id":id}
        $.ajax({
            dataType: "json",
            method: "POST",
            url:'json_clasificacion_lista.php',
            data : datos,
        }).done(function(json) {
            console.log("EL consultar especifico",json);
            if (json[0]=="Exito") {

                $('#llave_clasificacion_lista').val(id);
                $('#ingreso_datos').val("si_actualizalo");
                $('#nombre').val(json[2]['nombre']);
                $('#md_registrar_clasificacion_lista').modal('show');
            }

        }).fail(function(){

        }).always(function(){

        });


    });

    $(document).on("click","#registrar_clasificacion_lista",function(e){
        e.preventDefault();
        //console.log("Capturando evento");
        //$('#myModal').modal('show'); para abrir modal
        //$('#myModal').modal('hide'); para cerrar modal
        $('#md_registrar_clasificacion_lista').modal('show');
    });

    $(document).on("submit","#formulario_registro",function(e){
        e.preventDefault();

        var datos =$("#formulario_registro").serialize();
        console.log("formulario: ",datos)

        $.ajax({
            dataType: "json",
            method: "POST",
            url:'json_clasificacion_lista.php',
            data : datos,
        }).done(function(json) {
            console.log("datos consultado: ",json);
            if(json[0]=="Exito"){
                cargar_datos();
                $('#md_registrar_clasificacion_lista').modal('hide');
            }
        }).fail(function(){

        }).always(function(){

        });
    });
})

function cargar_datos(){
    var datos = {"consultar_datos":"si_consultalos"}
    $.ajax({
        dataType: "json",
        method: "POST",
        url:'json_clasificacion_lista.php',
        data : datos,
    }).done(function(json) {
        console.log("datos consultado: ",json);
        if(json[0]=="Exito"){
            $("#aqui_tabla").empty().html(json[1]);
            $('#tabla_clasificacion_lista').DataTable();
            $("#cantidad_clasificacion_lista").empty().html(json[2]);
        }
    }).fail(function(){

    }).always(function(){

    });
}
