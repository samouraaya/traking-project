<?php

namespace CoreBundle\Controller;

use CoreBundle\Entity\Projet;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\DateTime;
use Symfony\Component\HttpFoundation\Response;
/**
 * Projet controller.
 *
 */
class ProjetController extends Controller
{
    /**
     * Lists all projet entities.
     *
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $userConnecte = $this->getUser();

        $projetsManager = $em->getRepository('CoreBundle:Projet')->findAll();
        $projetsCollaborateur = $em->getRepository('CoreBundle:Projet')->getProjetsByUser($userConnecte);
//        dump($projetsUser);die();

        return $this->render('projet/index.html.twig', array(
            'projetsManager' => $projetsManager,
            'projetsCollaborateur'=>$projetsCollaborateur
        ));
    }
  public function exportAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $projetsManager = $em->getRepository('CoreBundle:Projet')->findAll();
        return $this->render('projet/excel.xlsx.twig', [
            'projetsManager' => $projetsManager
        ]);
    }

    /**
     * Creates a new projet entity for Dev
     *
     */
    public function newDevAction(Request $request)
    {
        $projet = new Projet();
        $form = $this->createForm('CoreBundle\Form\ProjetType', $projet);

        $form->handleRequest($request);
        $userConnecte = $this->getUser();



        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $projet->setUser($userConnecte);

            $date = new \DateTime();

            $datestoke= $date->format('Y-m-d');

            $heureDebut=$projet->getHeureDebut();
            $heureFin=$projet->getHeureFin();
            $dateDebut=$projet->getDateDebut();
            $dateFin=$projet->getDateFin();

            if($dateFin<$dateDebut)
            { $erreur='date invalid';

                return $this->redirectToRoute('projet_new_dev',array('erreur' => $erreur));
            }
            elseif ($dateFin==$dateDebut)
            {
                if ($heureFin<$heureDebut)

                { $erreur='heure invalid';
                    return $this->redirectToRoute('projet_new_dev',array('erreur' => $erreur));
                }

            }
            $heureDebutStocke=$heureDebut->format('H:i:s');
            $heureDebutDate = new \DateTime($datestoke.' '.$heureDebutStocke);

            $projet->setHeureDebut($heureDebutDate);


            $heureFinStocke=$heureFin->format('H:i:s');

            $heureFinDate = new \DateTime($datestoke.' '.$heureFinStocke);

            $projet->setHeureFin($heureFinDate);

            $em->persist($projet);
            $em->flush();

            return $this->redirectToRoute('projet_index');
        }
        $erreur='';
        return $this->render('projet/new.html.twig', array(
            'projet' => $projet,
            'form' => $form->createView(),
            'erreur' => $erreur

        ));
    }


    /**
     * Page d'acceuil selon le profil
     *
     */
    public function acceuilAction(Request $request)
    {
        $authorizationChecker = $this->get('security.authorization_checker');

        // check for edit access
        if (TRUE === $authorizationChecker->isGranted('ROLE_INFRA')) {
            return $this->redirect($this->generateUrl('projet_new_infra'));
        }
        elseif (TRUE === $authorizationChecker->isGranted('ROLE_DEV')) {
            return $this->redirect($this->generateUrl('projet_new_dev'));
        }
        elseif (TRUE === $authorizationChecker->isGranted('ROLE_ADMIN')) {
            return $this->redirect($this->generateUrl('projet_index'));
        }
    }



    /**
     * Creates a new projet entity for Infra
     *
     */
    public function newInfraAction(Request $request)
    {
        $projet1 = new Projet();

        $form1 = $this->createForm('CoreBundle\Form\ProjetInfraType', $projet1);

        $form1->handleRequest($request);
        $userConnecte = $this->getUser();



        if ($form1->isSubmitted() && $form1->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $projet1->setUser($userConnecte);

            $date = new \DateTime();

            $datestoke= $date->format('Y-m-d');

            $heureDebut=$projet1->getHeureDebut();
            $dateDebut=$projet1->getDateDebut();
            $dateFin=$projet1->getDateFin();
            $heureFin=$projet1->getHeureFin();

            if($dateFin<$dateDebut)
            { $erreur='date invalid';

                return $this->redirectToRoute('projet_new_infra',array('erreur' => $erreur));
            }
            elseif ($dateFin==$dateDebut)
            {
                if ($heureFin<$heureDebut)

                { $erreur='heure invalid';
                    return $this->redirectToRoute('projet_new_infra',array('erreur' => $erreur));
                }

            }
            $heureDebutStocke=$heureDebut->format('H:i:s');
            $heureDebutDate = new \DateTime($datestoke.' '.$heureDebutStocke);

            $projet1->setHeureDebut($heureDebutDate);


            $heureFinStocke=$heureFin->format('H:i:s');

            $heureFinDate = new \DateTime($datestoke.' '.$heureFinStocke);

            $projet1->setHeureFin($heureFinDate);

            $em->persist($projet1);
            $em->flush();

            return $this->redirectToRoute('projet_index');
        }
        $erreur='';
        return $this->render('projet/new.html.twig', array(
            'projet' => $projet1,
            'form' => $form1->createView(),
            'erreur' => $erreur
        ));
    }


    /**
     * Finds and displays a projet entity.
     *
     */
    public function showAction(Projet $projet)
    {
        $deleteForm = $this->createDeleteForm($projet);

        return $this->render('projet/show.html.twig', array(
            'projet' => $projet,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing projet entity for dev.
     *
     */
    public function editDevAction(Request $request, Projet $projet)
    {
        $deleteForm = $this->createDeleteForm($projet);
        $editForm = $this->createForm('CoreBundle\Form\ProjetType', $projet);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {




            $heureDebut=$projet->getHeureDebut();
            $heureFin=$projet->getHeureFin();
            $dateDebut=$projet->getDateDebut();
            $dateFin=$projet->getDateFin();

            if($dateFin<$dateDebut)
            { $erreur='date invalid';

                return $this->redirectToRoute('projet_edit_dev',array('erreur' => $erreur,'id' => $projet->getId()));
            }
            elseif ($dateFin==$dateDebut)
            {
                if ($heureFin<$heureDebut)

                { $erreur='heure invalid';
                    return $this->redirectToRoute('projet_edit_dev',array('erreur' => $erreur,'id' => $projet->getId()));
                }

            }







            $this->getDoctrine()->getManager()->flush();


            return $this->redirectToRoute('projet_edit_dev', array('id' => $projet->getId()));
        }
        $erreur='';
        return $this->render('projet/edit.html.twig', array(
            'projet' => $projet,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
            'erreur' => $erreur
        ));
    }


    /**
     * Displays a form to edit an existing projet entity for infra.
     *
     */
    public function editInfraAction(Request $request, Projet $projet)
    {
        $deleteForm = $this->createDeleteForm($projet);
        $editForm = $this->createForm('CoreBundle\Form\ProjetInfraType', $projet);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {


            $heureDebut=$projet->getHeureDebut();
            $heureFin=$projet->getHeureFin();
            $dateDebut=$projet->getDateDebut();
            $dateFin=$projet->getDateFin();

            if($dateFin<$dateDebut)
            { $erreur='date invalid';

                return $this->redirectToRoute('projet_edit_infra',array('erreur' => $erreur,'id' => $projet->getId()));
            }
            elseif ($dateFin==$dateDebut)
            {
                if ($heureFin<$heureDebut)

                { $erreur='heure invalid';
                    return $this->redirectToRoute('projet_edit_infra',array('erreur' => $erreur,'id' => $projet->getId()));
                }

            }


           
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('projet_edit_infra', array('id' => $projet->getId()));
        }
        $erreur='';
        return $this->render('projet/edit.html.twig', array(
            'projet' => $projet,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
            'erreur' => $erreur
        ));
    }

    /**
     * Deletes a projet entity.
     *
     */
    public function deleteAction(Request $request, Projet $projet)
    {
        $form = $this->createDeleteForm($projet);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($projet);
            $em->flush();
        }

        return $this->redirectToRoute('projet_index');
    }




    /**
     * Creates a form to delete a projet entity.
     *
     * @param Projet $projet The projet entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Projet $projet)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('projet_delete', array('id' => $projet->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}
