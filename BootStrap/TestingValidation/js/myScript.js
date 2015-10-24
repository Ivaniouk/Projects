document.addEventListener('DOMContentLoaded', function () {
/*
    $('[name="btn_main"]').on('click', function() {
        $('#myModal').modal('show');
    });
*/
   //$('[name="form_Main"]').validator();

    $('[name="form_Main"]').on("submit",submitForm);

    function submitForm(e){
        e.preventDefault();
        alert(1);
    }

});