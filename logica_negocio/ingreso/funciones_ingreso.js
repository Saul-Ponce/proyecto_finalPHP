$(function (){
    console.log('todo sirve')

    $("#formulario_login").submit(function (event){
        event.preventDefault();
        var datos = $("#formulario_login").serialize();
        console.log("evento submit",datos);
    });
})
