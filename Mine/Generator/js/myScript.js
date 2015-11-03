document.addEventListener('DOMContentLoaded', function () {

    $('[name="form_Main"]').on('change', function(){
        var selected = $(this).find("option:selected").val();
        var backgroundVar =  $('[name="background"]');
        backgroundVar.removeAttr("disabled");
        backgroundVar.children().first().text("Select Background")
    });



});