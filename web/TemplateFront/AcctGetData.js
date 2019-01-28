$("document").ready(function () {
    $("#rim").change(function () {
        $.ajax({
            type: 'get',
            url : '/ORA/ws/api/ora_ws_acct_no?rim_no='+$(this).val(),
            beforeSend: function () {

                document.getElementById('calc_1').style.display = 'none';
                document.getElementById('calc_2').style.display = 'none';
                document.getElementById('calc_3').style.display = 'none';


                $("#li").parent().append('<div class="loading"></div>');
                $("#li option").remove();
                document.getElementById('alert_rim').style.display = 'none';
            },
            success: function (data) {

                $(".loading").remove();
                var leng = data.length;


                if (leng>0){

                    for (i = 0; i<leng; i++){

                            $("#li").append($('<option>',{ value : data[i].acct_no, text : data[i].acct_no } ));

                    }


                }else{
                    document.getElementById('alert_rim').style.display = 'block';
                }


            }


        });
    });

});