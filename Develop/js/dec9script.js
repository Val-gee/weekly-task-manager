var category = 'inspirational'

$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/quotes?category=' + category ,
    headers: { 'X-Api-Key': 'qqoTUSZvUbFCBjayEmFVIg==V6OGJcGtLVFiV2ym'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});