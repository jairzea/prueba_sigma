import "./resources/css/styles.scss";

import $ from 'jquery';

import swal from 'sweetalert2';

// Llenamos el select de los departamentos
$(document).ready(function(){

    var select = $("#sel_departamento");

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json"; 
    const arrayDatos = fetch(proxyurl + url).then(response => response.text())
    arrayDatos.then((contents) => {
        
        let objeto = JSON.parse(contents)
        let departamentos = Object.keys(objeto)

        for (let i = 0; i < departamentos.length; i++) {
            
            select.append('<option value=' + `'${departamentos[i]}'` + '>' +departamentos[i] + '</option>');
        }
        
    })
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
})

// Llenamos el select de las ciudades dependiendo el departamento escogido
$('#sel_departamento').on('change', function(){

    $('#sel_ciudad').empty();

    var departamento = $('#sel_departamento').val();

    var select = $("#sel_ciudad");

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json"; 
    const arrayDatos = fetch(proxyurl + url).then(response => response.text())
    arrayDatos.then((contents) => {
        let objeto = JSON.parse(contents)

        for (let i = 0; i < objeto[departamento].length; i++) {
            
            select.append('<option value=' + `'${objeto[departamento][i]}'` + '>' +objeto[departamento][i] + '</option>');
        }
        
    })
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

   
})

// Envio de datos al backend para registro en base de datos
$(document).on('click', '.btn-enviar', function(){


    // var urlencoded = new URLSearchParams();
    // urlencoded.append("name", $("#txt_nombre").val());
    // urlencoded.append("email", $("#txt_correo").val());
    // urlencoded.append("state", $("#sel_departamento").val());
    // urlencoded.append("city", $("#sel_ciudad").val());

    // var requestOptions = {
    // method: 'POST',
    // body: urlencoded,
    // redirect: 'follow'
    // };

    // const url = "http://localhost/rest_prueba/post.php";
    // fetch(url, requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));

    if ($("#sel_departamento").val() == '' || $("#sel_ciudad").val() == '' || $("#txt_nombre").val() == '' || $("#txt_correo").val() == '') {
        
        swal.fire({
            icon: 'warning',
            title: 'Campos vacios',
            text: 'Lo sentimos, por favor diligencie todos los campos!',
        })

        return;
    }

    $.ajax({
        url: 'http://localhost/rest_prueba/post.php',
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
        data:{
            'state': $("#sel_departamento").val(),
            'city': $("#sel_ciudad").val(),
            'name': $("#txt_nombre").val(),
            'email': $("#txt_correo").val()
        },
        dataType: 'json',
        beforeSend: function(){
            $("#formRegistro")[0].reset()
            swal.fire({
                icon: 'success',
                title: 'Exito',
                text: 'Tu información ha sido recibida satisfactoriamente!',
              })
        },
        success:function(respuesta){

        }

    })
})