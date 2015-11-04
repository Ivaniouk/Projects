$( document ).ready(function() {
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

    function check(){
        //var isMobile = false;
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
           // isMobile = true;
            alert("Mobile");
            /*
             var dp = $('[name="datetimepicker"]');
             dp.on('changeDate', function(e) {
             dp.datepicker('hide');
             });*/
        }
        else{
            alert("PC");
        }
    }
    check();
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
