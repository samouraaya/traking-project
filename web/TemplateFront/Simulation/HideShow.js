function Chercher() {



    if (document.getElementById('rim').value == ''){

    }else{
        document.getElementById('extractbudnel_formulaire_rim_no').value = document.getElementById('rim').value;


    }

    if (document.getElementById('li').value == ''){

    }else{
        document.getElementById('extractbudnel_formulaire_acct_no').value = document.getElementById('li').value;

    }

    if (document.getElementById('calculateur').value == ''){

    }else{
        document.getElementById('extractbudnel_formulaire_calcultype').value = document.getElementById('calculateur').value;

    }

    console.log(document.getElementById('extractbudnel_formulaire_rim_no').value);
    console.log(document.getElementById('extractbudnel_formulaire_acct_no').value);
    console.log(document.getElementById('extractbudnel_formulaire_calcultype').value);



}

function Rediriger() {

    document.location.href="http://10.80.1.51/ORA/web/";

    console.log('ici');

}