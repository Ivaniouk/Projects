document.addEventListener('DOMContentLoaded', function () {

    $('[name="btn_main"]').on('click', function() {
        $('#myModal').modal('show');
		return false;
    });

    $('[name="datetimepicker"]').datetimepicker({
        format: 'l'
    });
    /*
    $(function() {
        // Test if this is a mobile device
        if (typeof $.browser == 'undefined') {
            $.browser = {};
        }
        $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
        if ($.browser.device) {
            $('#arriving').attr('type', 'date');
        } else {
            // Datepicker for arrival date on filters
            var dp = $('.datepicker').datepicker()
            dp.on('changeDate', function(e) {
                dp.datepicker('hide');
            });
        }
    });*/

});