document.addEventListener('DOMContentLoaded', function () {

    $('[name="form_Main"]').on('change', function(){
        var selected = $(this).find("option:selected").val();
        $('[name="background"]').removeAttr("disabled");
        $('[name="background"]').children().first().text("Select Background")
       //alert( $('[name="background"]:first-child'));
    });



});