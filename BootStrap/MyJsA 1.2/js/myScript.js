document.addEventListener("DOMContentLoaded", function () {
    $('.dropdown').on('show.bs.dropdown', function(){
        alert('The dropdown is about to be shown.');
    });
    $('.dropdown').on('shown.bs.dropdown', function(){
        alert('The dropdown is now fully shown.');
    });
    $('.dropdown').on('hide.bs.dropdown', function(e){
        alert('The dropdown is about to be hidden.');
    });
    $('.dropdown').on('hidden.bs.dropdown', function(){
        alert('The dropdown is now fully hidden.');
    });
});