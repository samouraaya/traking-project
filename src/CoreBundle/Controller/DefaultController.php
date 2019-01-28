<?php

namespace CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use CoreBundle\Entity\Projet;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{


    public function MenuAction()
    {

        $userConnecte = $this->getUser();
        return $this->render('menu.html.twig',array('user'=>$userConnecte));

    }


}
