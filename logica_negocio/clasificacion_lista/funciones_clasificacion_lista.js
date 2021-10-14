$(function (){

    cargar_datos();

    $(".select2").select2();
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
