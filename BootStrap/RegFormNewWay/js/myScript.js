document.addEventListener('DOMContentLoaded', function () {

    $('[name="btn_main"]').on('click', function() {
        $('#myModal').modal('show');
    });

   // $('[name="form_Main"]').validator();
    /*
    $('[name="form_Main"]').validator({
        rules: {
            name: {
                required: true
            }
        },
        highlight: function (element) {
            $(element).closest('.control-group').removeClass('success').addClass('error');
        },
        success: function (element) {
            element.text('OK!').addClass('valid')
                .closest('.control-group').removeClass('error').addClass('success');
        }
    });*/

});