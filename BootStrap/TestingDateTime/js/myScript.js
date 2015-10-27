document.addEventListener('DOMContentLoaded', function () {
    /*
    $('[name="btn_main"]').on('click', function() {
       // $('#myModal').modal('show');
		return false;
    });*/

    $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd hh:ii'});

    $('[name="form_Main"]').validate({
        rules: {
            name: {
                minlength: 3,
                maxlength: 15,
                required: true
            }
        },
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        }
    });

});