<?php

namespace CoreBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TimeType;
use Symfony\Component\Form\Extension\Core\Type\DateType;

class ProjetType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
         ->add('dateDebut', DateType::class, [
             'widget' => 'single_text',
             'format' => 'yyyy-MM-dd',
         ])

            ->add('heureDebut', TimeType::class, [
                'input'  => 'datetime',
                'widget' => 'choice',
            ])

            ->add('dateFin', DateType::class, [
                'widget' => 'single_text',
                // this is actually the default format for single_text
                'format' => 'yyyy-MM-dd',
            ])
            ->add('heureFin', TimeType::class, [
                'input'  => 'datetime',
                'widget' => 'choice',

            ])

            ->add('type', ChoiceType::class, [
                'choices' => ['Developpement' => 'Developpement', 'Maintenance' => 'Maintenance'
                ],
            ])
            ->add('application', ChoiceType::class, [
                'choices' => ['Web reporting' => 'Web reporting', 'CRM' => 'CRM', 'Outils impayés' => 'Outils impayés',
                    'Geoloc' => 'Geoloc'],
            ])
            ->add('pays', ChoiceType::class, [
                'choices' => ['Tunisie' => 'Tunisie', 'Pakistan' => 'Pakistan', 'Cote d ivoir' => 'Cote d ivoir'
                    , 'Ghana' => 'Ghana', 'Cameroun' => 'Cameroun', 'Congo' => 'Congo'
                    , 'Myammar' => 'Myammar', 'Amret' => 'Amret' , 'Paris' => 'Paris'],
            ])

            ->add('description')
// ...

       ;
    }/**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'CoreBundle\Entity\Projet'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'corebundle_projet';
    }


}
