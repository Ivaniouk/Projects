document.addEventListener('DOMContentLoaded', function () {
    /*
    $('[name="btn_main"]').on('click', function() {
        $('#myModal').modal('show');
		return false;
    })*/

    $('[name="form_Main"]').validator().on('submit', function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
        } else {
            $('#myModal').modal('show');
            return false;
        }
    });

    $('[name="datetimepicker"]').datetimepicker({
        format: 'l'
    });
});