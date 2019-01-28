$("document").ready(function () {
    $("#li").mouseup(function () {
        $.ajax({
            type: 'get',
            url : '/ORA/ws/api/ora_ws_type_calc?ln_acct='+$(this).val(),
            beforeSend: function () {

                $("#calculateur").parent().append('<div class="loading"></div>');
                document.getElementById('alert_type').style.display = 'none';
                document.getElementById('calculateur').value = '';

            },
            success: function (data1) {

                $(".loading").remove();
                var unsatisfied = (data1[0].NbTot - data1[0].Satisfied);

                if ((data1[0].NB_jr_retard > 30) && (data1[0].NB_jr_retard < 90) && ((data1[0].Staut != 'Active Charge-Off  ') || (data1[0].Staut != 'NonAccrual         '))){
                    document.getElementById('calculateur').value = 'Crédit Impayés';
                    document.getElementById('type_li').value  = data1[0].Produit;
                }
                else if (data1[0].NB_jr_retard > 89)
                {
                    document.getElementById('alert_type').style.display = 'block';
                }



                else if (data1[0].Prod == 541){
                    if (data1[0].NB_jr_retard > 30)
                    {
                        document.getElementById('calculateur').value = 'Crédit agricole 100%';
                        document.getElementById('type_li').value  = data1[0].Produit;
                    }
                    else if ((unsatisfied <= data1[0].NbTot / 4))
                    {
                        document.getElementById('calculateur').value = 'Crédit agricole 0%';
                        document.getElementById('type_li').value  = data1[0].Produit;
                    }

                    else if ((unsatisfied > data1[0].NbTot / 4) && (unsatisfied < data1[0].NbTot / 2))
                    {
                        document.getElementById('calculateur').value = 'Crédit agricole 50%';
                        document.getElementById('type_li').value  = data1[0].Produit;
                    }

                    else if((data1[0].NbTot / 2) <= unsatisfied)
                    {
                        document.getElementById('calculateur').value = 'Crédit agricole 100%';
                        document.getElementById('type_li').value  = data1[0].Produit;
                    }

                }

                else if ((data1[0].Prod == 531 ) )
                {
                    document.getElementById('calculateur').value = 'Crédit Scolaire';
                    document.getElementById('type_li').value  = data1[0].Produit;
                }

                else if (data1[0].Prod == 551 )
                {
                    document.getElementById('calculateur').value = 'Crédit ACV';
                    document.getElementById('type_li').value  = data1[0].Produit;
                }



                else if (((data1[0].NbTot / 4) >= unsatisfied) && (data1[0].Renouv >0) && ((data1[0].NbTot / 4) < 6)){

                    document.getElementById('calculateur').value = 'Renouvellement sans frais';
                    document.getElementById('type_li').value  = data1[0].Produit;
                }
                else if ((data1[0].Satisfied) < (0.5 * data1[0].NbTot ))
                {
                    document.getElementById('calculateur').value = 'Rembst Ant Début période';
                    document.getElementById('type_li').value  = data1[0].Produit;
                }

                else if ((data1[0].Satisfied) >= (0.5 * data1[0].NbTot ))
                {
                    document.getElementById('calculateur').value = 'Rembst Ant Fin période';
                    document.getElementById('type_li').value  = data1[0].Produit;
                }

                else{
                    document.getElementById('alert_type').style.display = 'block';
                }


                }


        });
    });

});