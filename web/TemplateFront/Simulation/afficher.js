$("document").ready(function () {
    $("#chercher_btn").click(function () {

        var agence =  {'Tunis':100,'Zaghouan': 140,'Sousse':210,'Barcelone':120,'Ariana':130,'Hammem Lif':150,'Kairouane': 310,'Beja': 410,'Jendouba': 420, }

        var li = document.getElementById('li').value;
        if (document.getElementById('calculateur').value == 'Renouvellement sans frais' || document.getElementById('calculateur').value == 'Crédit agricole 0%'){
            $.ajax({
                type: 'get',
                url : '/ORA/ws/api/ora_ws_calc1?acct_no='+document.getElementById('li').value,
                beforeSend: function () {

                    $("#calc_1").parent().append('<div class ="bigload"></div>');

                    document.getElementById('exist').style.display = 'none';
                    document.getElementById('calc_1').style.display = 'none';
                    document.getElementById('calc_2').style.display = 'none';
                    document.getElementById('calc_3').style.display = 'none';
                    document.getElementById('calc_4').style.display = 'none';
                    $('#div_info').empty();
                },
                success: function (data) {
                    $(".bigload").remove();

                    var li= document.getElementById('li').value ;


                    var ag =document.getElementById('agence').value;

                    if ((ag == data[0].Agence_Li) || (ag = 100)){
                        var dat = data[0];
                        document.getElementById('calc_1').style.display = 'block';
                        document.getElementById("princip").firstChild.nodeValue=dat['Proncipal'];

                        var principal=parseFloat(dat['Proncipal']);
                        var interet=parseFloat(dat['Interet']);
                        var interet_7=parseFloat(dat['Interet_7']);
                        var solde_CT=parseFloat(dat['Solde_CT']);
                        var frais_Imp=parseFloat(dat['Frais_Imp']);
                        var NB_jr_retard = dat['NB_jr_retard'];
                        var NbTot = dat['NbTot'];
                        var NbRest = dat['NbRest'];
                        NbRest = NbTot - NbRest;
                        var NBEch = NbRest + '/' + NbTot;

                        var tc_345 = principal + interet+ interet_7 - solde_CT + frais_Imp;
                        if (tc_345 < 0)
                            tc_345 = 0;


                        var int_autre =  frais_Imp + interet + interet_7;
                        var total = tc_345;
                        var tc_102 =  dat['TC_102'];
                        var mt_cheque = tc_102 - total;
                        var name = dat['NomPreom'];

                        document.getElementById("princip").firstChild.nodeValue=principal.toFixed(3);
                        document.getElementById("interet").firstChild.nodeValue=interet.toFixed(3);
                        document.getElementById("interet_7").firstChild.nodeValue=interet_7.toFixed(3);
                        document.getElementById("soldct").firstChild.nodeValue=solde_CT.toFixed(3);
                        document.getElementById("NB_jr_retard").firstChild.nodeValue=NB_jr_retard;
                        document.getElementById("frais_imp").firstChild.nodeValue=frais_Imp.toFixed(3);

                        document.getElementById("total").firstChild.nodeValue=total.toFixed(3);
                        document.getElementById("NBEch").firstChild.nodeValue=NBEch;

                        document.getElementById("name").firstChild.nodeValue=name;


                        var message = 'Ce calculateur implique que : ' +
                            '<br>Le Nombre d’échéance unsatisfied lors de la demande est inférieure ou égale au quart (¼) de la durée du prêt, plafonné à 6 mois,'+
                            '<br>Et qu’il y obligatoirement un nouveau crédit approuvé et à décaisser (LI Incomplet du renouvellement) qui permettra de clôturer l’ancien crédit payer par anticipation'+
                            '<br>Ou Si le crédit en question est un crédit Agricole : que Le Nombre d’échéance unsatisfied lors de la demande est inférieure ou égale au quart (¼) de la durée du prêt (sans plafond et non conditionné à un renouvellement).'+
                            '<br>Exple : Crédit de 10 mois : ¼ =2,5  0% des intérêts futurs aux Ech 9 et 10'+
                            '<br>Dans ces cas, le montant à rembourser est égale au :'+
                            '<br>o Capital restant dû'+
                            '<br>o Intérêts échus non payés'+
                            '<br>o Pénalités de retard (moins de 30j) si existantes'+
                            '<br>o Pas de pénalités de remboursement Anticipé';

                        $('#div_info').append($('<div id="calc_info" class="alert alert-info alert-block"><h4 class="alert-heading">Remboursement anticipé sans frais (Intérêts Futurs) : </h4>' +
                            '<div id="calc_info"> <p> '+message+'</p>' +
                            '</div></div>' ));

                    }


                }


            });
        }
        else if (document.getElementById('calculateur').value == 'Rembst Ant Début période' || document.getElementById('calculateur').value == 'Crédit Scolaire'
            || document.getElementById('calculateur').value == 'Crédit ACV' || document.getElementById('calculateur').value == 'Crédit Impayés' || document.getElementById('calculateur').value == 'Crédit agricole 100%' ){
            $.ajax({
                type: 'get',
                url : '/ORA/ws/api/ora_ws_calc2?acct_no='+document.getElementById('li').value,
                beforeSend: function () {
                    $("#calc_2").parent().append('<div class ="bigload"></div>');

                    document.getElementById('exist').style.display = 'none';
                    document.getElementById('calc_1').style.display = 'none';
                    document.getElementById('calc_2').style.display = 'none';
                    document.getElementById('calc_3').style.display = 'none';
                    document.getElementById('calc_4').style.display = 'none';
                    $('#div_info').empty();

                },

                success: function (data) {
                    $(".bigload").remove();
                    var ag = agence[document.getElementById('agence').value];

                    if ((ag == data[0].Agence_Li) || (ag = 100)){

                    }
                    var dat = data[0];
                    document.getElementById('calc_4').style.display = 'block';


                    var principal=parseFloat(dat['Proncipal']);
                    var interet=parseFloat(dat['Interet']);
                    var interet_7=parseFloat(dat['Interet_7']);
                    var tot_npays = parseFloat(dat['Int_Total_Non_Payes']);
                    if (!tot_npays)
                        tot_npays = 0;
                    var int_ech = interet;
                    var Total_int_non_echu = tot_npays - int_ech;
                    var solde_CT=parseFloat(dat['Solde_CT']);
                    var frais_Imp=parseFloat(dat['Frais_Imp']);
                    var tc_345 = parseFloat(principal + tot_npays) - parseFloat(solde_CT) + frais_Imp ;
                    var tc_610 = Total_int_non_echu;
                    var NB_jr_retard = dat['NB_jr_retard'];

                    var int_autre = int_ech + frais_Imp + Total_int_non_echu;
                    var total = tc_345;
                    var tc_102 = dat['TC_102'];
                    var mt_cheque = tc_102 - total;

                    var NbTot = dat['NbTot'];
                    var NbRest = dat['NbRest'];
                    NbRest = NbTot - NbRest;
                    var NBEch = NbRest + '/' + NbTot;

                    if (interet_7 > Total_int_non_echu)
                        interet_7 = Total_int_non_echu;
                    var name = dat['NomPreom'];

                    if (interet_7 > Total_int_non_echu)
                        interet_7 = Total_int_non_echu;

                    document.getElementById("princip4").firstChild.nodeValue=principal.toFixed(3);
                    document.getElementById("interet4").firstChild.nodeValue=interet.toFixed(3);
                    document.getElementById("interet_74").firstChild.nodeValue=interet_7.toFixed(3);
                    document.getElementById("total_interet_imp4").firstChild.nodeValue=tot_npays.toFixed(3);
                    document.getElementById("int_echus4").firstChild.nodeValue=int_ech.toFixed(3);
                    document.getElementById("Total_int_non_echu").firstChild.nodeValue=Total_int_non_echu.toFixed(3);
                    document.getElementById("soldct4").firstChild.nodeValue=solde_CT.toFixed(3);
                    document.getElementById("frais_imp_4").firstChild.nodeValue=frais_Imp.toFixed(3);

                    document.getElementById("tc610_4").firstChild.nodeValue=tc_610.toFixed(3);
                    document.getElementById("total4").firstChild.nodeValue=total.toFixed(3);
                    document.getElementById("name_4").firstChild.nodeValue=name;
                    document.getElementById("NB_jr_retard_4").firstChild.nodeValue=NB_jr_retard;
                    document.getElementById("NBEch4").firstChild.nodeValue=NBEch;


                    var message = 'Ce calculateur implique que :'+
                        '<br>Le Nombre d’échéance satisfied depuis la date du décaissement est inférieure à la moitié de la durée du prêt quelques soit le produit y compris les crédits agricoles'+
                        '<br>Exple : Crédit de 10 mois : ½ = 5  100% des intérêts futurs aux Ech 1, 2, 3 4 et 5'+
                        '<br>Dans ces cas, le montant à rembourser est égale au :'+
                        '<br>o Capital restant dû'+
                        '<br>o Intérêts échus non payés'+
                        '<br>o Pénalités de retard si existantes'+
                        '<br>o Pénalités de remboursement Anticipé = 100% des intérêts Futurs'+
                        '<br>NB : Ce calcul s’applique aussi par défaut pour :'+
                        '<br>•	Les crédits complémentaires à savoir « le crédit scolaire » et « le crédit logement »'+
                        '<br>•	Tous les crédits en impayés de plus de 30j (en PAR30)';

                    $('#div_info').append($('<div id="calc_info" class="alert alert-info alert-block"><h4 class="alert-heading">Remboursement anticipé avec 100% de frais (Intérêts Futurs) : </h4>' +
                        '<div id="calc_info"> <p>'+message+'</p>' +
                        '</div></div>' ));
                }


            });
        }
        else if (document.getElementById('calculateur').value == 'Rembst Ant Fin période' ||document.getElementById('calculateur').value == 'Crédit agricole 50%' ){

            $.ajax({
                type: 'get',
                url : '/ORA/ws/api/ora_ws_calc2?acct_no='+document.getElementById('li').value,
                beforeSend: function () {
                    $("#calc_3").parent().append('<div class ="bigload"></div>');

                    document.getElementById('exist').style.display = 'none';
                    document.getElementById('calc_1').style.display = 'none';
                    document.getElementById('calc_2').style.display = 'none';
                    document.getElementById('calc_3').style.display = 'none';
                    document.getElementById('calc_4').style.display = 'none';
                    $('#div_info').empty();


                },
                success: function (data) {

                    $(".bigload").remove();
                    var ag = agence[document.getElementById('agence').value];
                    if ((ag == data[0].Agence_Li) || (ag = 100)){

                        var dat = data[0];
                        document.getElementById('calc_2').style.display = 'block';


                        var principal=parseFloat(dat['Proncipal']);
                        var interet=parseFloat(dat['Interet']);
                        var interet_7=parseFloat(dat['Interet_7']);
                        var tot_npays = parseFloat(dat['Int_Total_Non_Payes']);
                        if (!tot_npays)
                            tot_npays = 0;
                        var int_ech = interet + interet_7;
                        var half_int_nechu = (tot_npays - int_ech) * 0.5;
                        var solde_CT=parseFloat(dat['Solde_CT']);
                        var frais_Imp=parseFloat(dat['Frais_Imp']);
                        var tc_345 = principal + interet+ interet_7 + half_int_nechu - solde_CT + frais_Imp;
                        var tc_610 = half_int_nechu;
                        var NB_jr_retard = dat['NB_jr_retard'];

                        var int_autre = int_ech + frais_Imp + half_int_nechu;
                        var total = tc_345

                        var name = dat['NomPreom'];

                        var NbTot = dat['NbTot'];
                        var NbRest = dat['NbRest'];
                        NbRest = NbTot - NbRest;
                        var NBEch = NbRest + '/' + NbTot;

                        document.getElementById("princip2").firstChild.nodeValue=principal.toFixed(3);
                        document.getElementById("interet2").firstChild.nodeValue=interet.toFixed(3);
                        document.getElementById("interet_72").firstChild.nodeValue=interet_7.toFixed(3);
                        document.getElementById("total_interet_imp2").firstChild.nodeValue=tot_npays;
                        document.getElementById("int_echus2").firstChild.nodeValue=int_ech.toFixed(3);
                        document.getElementById("50_int_non_echus").firstChild.nodeValue=half_int_nechu.toFixed(3);
                        document.getElementById("soldct2").firstChild.nodeValue=solde_CT.toFixed(3);
                        document.getElementById("frais_imp_2").firstChild.nodeValue=frais_Imp.toFixed(3);
                        document.getElementById("tc610_2").firstChild.nodeValue=tc_610.toFixed(3);
                        document.getElementById("total2").firstChild.nodeValue=total.toFixed(3);
                        document.getElementById("name_2").firstChild.nodeValue=name;
                        document.getElementById("NB_jr_retard_2").firstChild.nodeValue=NB_jr_retard;
                        document.getElementById("NBEch2").firstChild.nodeValue=NBEch;

                        var message = 'Ce calculateur implique que :'+
                            '<br>Le Nombre d’échéance satisfied depuis la date du décaissement est Supérieure ou égale à la moitié de la durée du prêt.'+
                            '<br>Ou Si le crédit en question est un crédit Agricole : Le Nombre d’échéance satisfied depuis la date du décaissement est supérieure à la moitié du nombre d’échéance total et inferieur ou égale au ¾ du nombre d’échéance total ou à son entier supérieur.'+
                            '<br>Exple : Crédit de 10 mois : ½ =5 et ¾ =7,5  50% des intérêts futurs aux Ech 6, 7 et 8'+
                            '<br>Dans ces cas, le montant à rembourser est égale au :'+
                            '<br>o Capital restant dû'+
                            '<br>o Intérêts échus non payés'+
                            '<br>o Pénalités de retard (moins de 30j) si existantes'+
                            '<br>o Pénalités de remboursement Anticipé = 50% des intérêts Futurs';

                        $('#div_info').append($('<div id="calc_info" class="alert alert-info alert-block"><h4 class="alert-heading">Remboursement anticipé avec 50% de frais (Intérêts Futurs): </h4>' +
                            '<div id="calc_info"> <p></p>' +
                            message +
                            '</div></div>' ));
                    }else{
                        document.getElementById('error_num').style.display = 'block';
                    }
                }
            });
        }


    });

});