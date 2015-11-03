document.addEventListener('DOMContentLoaded', function () {

    $('[name="form_Main"]').on('change', function(){
        var selected = $(this).find("option:selected").val();
       //alert(WorldArr[selected]);
    });



});