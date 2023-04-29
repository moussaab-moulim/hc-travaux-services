import React, { Fragment, useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {
  IoListOutline,
  IoMailOutline,
  IoScaleOutline,
  IoClose,
} from 'react-icons/io5';
import * as yup from 'yup';

import { LinesBackground } from '@components/atoms/Background';
import { NormalButton } from '@components/atoms/CustomButtons';
import { FieldContainer } from '@components/atoms/FieldContainer';
import { Heading } from '@components/atoms/Heading';
import { TextField } from '@components/atoms/TextField';
import { SectionInnerContainer } from '@components/molecules/Containers';
import { StepperComponent } from '@components/molecules/StepperComponent';
import { clsx } from '@utils/common';
import { getRequiredEnvVariable } from '@utils/constants';
const schema = yup.object({
  age: yup.string().nullable(false).required('Veuillez remplir ce champ'),
  height: yup.string().nullable(false).required('Veuillez remplir ce champ'),
  weight: yup.string().nullable(false).required('Veuillez remplir ce champ'),
  wantedWeight: yup
    .string()
    .nullable(false)
    .required('Veuillez remplir ce champ'),
  objectives: yup.object(),
  name: yup.string().required('Veuillez remplir ce champ'),
  mail: yup
    .string()
    .nullable(false)
    .email('Format invalide')
    .required('Veuillez remplir ce champ'),
  phone: yup.string().nullable(false).required('Veuillez remplir ce champ'),
  message: yup.string().nullable(true),
});

interface IContact {
  open: boolean;
  onClose: () => void;
  age?: string;
  height?: string;
  weight?: string;
}
interface IContactInputs {
  age: string;
  height: string;
  weight: string;
  wantedWeight: string;
  objectives: Record<string, boolean>;
  name: string;
  mail: string;
  phone: string;
  message: string;
}
const steps = [
  { icon: <IoScaleOutline className="w-full h-full" />, name: 'mesures' },
  { icon: <IoListOutline className="w-full h-full" />, name: 'Objectifs' },
  { icon: <IoMailOutline className="w-full h-full" />, name: 'Coordonnées' },
];
function ContactPopup({ open, onClose, age, height, weight }: IContact) {
  const [animate, setAnimate] = useState(null);
  const initialValue = {
    age: age ?? '',
    height: height ?? '',
    weight: weight ?? '',
    wantedWeight: '',
    objectives: {
      'Perte de poids': false,
      'Remise en forme': false,
      'Bien-être (cardio et renforcement)': false,
      'Raison médicale': false,
      'Tonification et renforcement musculaire': false,
      'Préparation physique et performances': false,
      'Prise de masse': false,
      Autre: false,
    },
    name: '',
    mail: '',
    phone: '',
    message: '',
  };
  const { handleSubmit, control, formState, reset } = useForm<IContactInputs>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: initialValue,
  });
  const [step, setStep] = useState(1);
  useEffect(() => {
    if (open) setAnimate(true);
    reset(initialValue);
    setStep(1);
  }, [open]);

  const onSubmit = async (data: IContactInputs) => {
    const emailServerUsername = getRequiredEnvVariable(
      process.env.NEXT_PUBLIC_EMAIL_USER,
      'NEXT_PUBLIC_EMAIL_USER'
    );

    const emailServerReciever = getRequiredEnvVariable(
      process.env.NEXT_PUBLIC_EMAIL_RECIEVER,
      'NEXT_PUBLIC_EMAIL_RECIEVER'
    );

    const siteName = getRequiredEnvVariable(
      process.env.NEXT_PUBLIC_SITE_NAME,
      'NEXT_PUBLIC_SITE_NAME'
    );

    const mailData = {
      from: `${siteName} <${emailServerUsername}>`,
      to: emailServerReciever,
      subject: `${siteName} - Demande de contact`,
      replyTo: data.mail,
      text: data.message,
      html: `
        <div>
          <p>nom: ${data.name}</p>
          <p>email: ${data.mail}</p>
          <p>téléphone: ${data.mail}</p>
          <p>message: ${data.message}</p>
          <p>age: ${data.age}</p>
          <p>taille: ${data.height}</p>
          <p>poids: ${data.weight}</p>
          <p>poids souhaité: ${data.wantedWeight}</p>
          <p>objectives: </p>
          <ul>
          ${Object.entries(data.objectives)
            .filter((_ob) => _ob[1] === true)
            .map((val) => `<li>${val[0]}</li>`)
            .reduce((prev, next) => prev + next)}
            </ul>
        </div>`,
    };
    const contactResposne = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mailData),
    });

    if (contactResposne.status === 200) {
      toast.success('Fomulaire envoyé avec success.\n');
      reset();
      handleClose();
    } else {
      toast.error("Echec d'envoi.");
    }
  };

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => {
      onClose();
    }, 700);
  };

  return (
    open && (
      <div
        id="purchase-popup"
        className={clsx(
          'top-0 fixed left-0  w-full h-full z-[99999] overflow-auto bg-white transition-all duration-700 ease-ease',
          animate === true ? ' translate-x-0' : 'translate-x-full'
        )}
      >
        <LinesBackground />
        <div
          className={clsx(
            'close-search theme-btn top-3 sm:top-14 right-3 lg:right-11 absolute text-base text-white z-[5] font-semibold',
            'cursor-pointer uppercase font-raleway transition-all duration-700 ease-ease hover:opacity-70'
          )}
          onClick={handleClose}
        >
          <span
            className={clsx(
              'cursor-pointer inline-block relative font-raleway text-sm px-2 py-2 font-medium uppercase text-primary bg-white border border-solid border-primary rounded-full hover:bg-primary hover:text-white',
              'transition-all ease-ease duration-500',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            <IoClose size={24} />
          </span>
        </div>
        <div className="popup-inner">
          <SectionInnerContainer className="purchase-form my-24 sm:my-40 ">
            <div className="sec-title text-center mb-6 sm:mb-10 lg:mb-20">
              <Heading
                as="h2"
                className={clsx(
                  'relative font-extrabold text-base md:text-2xl lg:text-3xl flex flex-col',
                  '[&_em]:text-4xl [&_em]:md:text-5xl [&_em]:lg:text-6xl [&_em]:text-text [&_em]:not-italic [&_em]:font-light',
                  //underline
                  '[&_*:not(em)]:after:block [&_*:not(em)]:after:w-28 [&_*:not(em)]:after:h-px [&_*:not(em)]:after:absolute',
                  ' [&_*:not(em)]:mb-10 [&_*:not(em)]:after:left-1/2  [&_*:not(em)]:after:-translate-x-1/2',
                  ' [&_*:not(em)]:after:bg-primary [&_*:not(em)]:after:mt-4 [&_*:not(em)]:after:mb-6',
                  'lg:[&_*:not(em)]:after:w-40 lg:[&_*:not(em)]:after:mt-5'
                )}
              >
                <span>Bilan</span> <em>Personnalisé</em>
              </Heading>
              <p
                className={clsx(
                  'text-sm font-raleway text-text opacity-50 font-medium'
                )}
              >
                Ton rendez-vous est offert et sans engagement
              </p>
            </div>

            <form className="default-form">
              <StepperComponent steps={steps} activeStep={step} />
              {formState.isSubmitting ? (
                <PopupFormLoading />
              ) : (
                <div className="flex flex-col flex-nowrap items-center">
                  <div
                    className={clsx(
                      step === 1 ? 'flex' : 'hidden',
                      'flex-wrap',
                      'w-full'
                    )}
                  >
                    <FieldContainer className=" basis-full md:basis-1/2">
                      <Controller
                        name="age"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Fragment>
                            <TextField
                              field={field}
                              className={
                                fieldState.error &&
                                'border-red-600 appearance-none'
                              }
                              type="number"
                              placeholder="ÂGE :"
                            />
                            {fieldState.error && (
                              <span className="font-raleway text-red-600">
                                {fieldState.error.message}
                              </span>
                            )}
                          </Fragment>
                        )}
                      />
                    </FieldContainer>
                    <FieldContainer className=" basis-full md:basis-1/2">
                      <Controller
                        name="height"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Fragment>
                            <TextField
                              field={field}
                              className={fieldState.error && 'border-red-600'}
                              type="number"
                              placeholder="TAILLE (CM) :"
                            />
                            {fieldState.error && (
                              <span className="font-raleway text-red-600">
                                {fieldState.error.message}
                              </span>
                            )}
                          </Fragment>
                        )}
                      />
                    </FieldContainer>
                    <FieldContainer>
                      <Controller
                        name="weight"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Fragment>
                            <TextField
                              field={field}
                              className={fieldState.error && 'border-red-600'}
                              type="number"
                              placeholder="POIDS ACTUEL (KG) :"
                            />
                            {fieldState.error && (
                              <span className="font-raleway text-red-600">
                                {fieldState.error.message}
                              </span>
                            )}
                          </Fragment>
                        )}
                      />
                    </FieldContainer>

                    <FieldContainer>
                      <Controller
                        name="wantedWeight"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Fragment>
                            <TextField
                              field={field}
                              className={fieldState.error && 'border-red-600'}
                              type="number"
                              placeholder="POIDS SOUHAITÉ (KG) :"
                            />
                            {fieldState.error && (
                              <span className="font-raleway text-red-600">
                                {fieldState.error.message}
                              </span>
                            )}
                          </Fragment>
                        )}
                      />
                    </FieldContainer>
                  </div>

                  <div
                    className={clsx(
                      step === 2 ? 'flex' : 'hidden',
                      ' flex-col flex-nowrap',
                      'w-full'
                    )}
                  >
                    {Object.entries(formState.defaultValues.objectives).map(
                      ([name, checked], index) => (
                        <FieldContainer
                          key={index}
                          className=" text-text text-left"
                        >
                          <Controller
                            name={`objectives.${name}`}
                            defaultValue={checked}
                            control={control}
                            render={({ field: { value, ...other } }) => (
                              <Fragment>
                                <label>
                                  <input
                                    type="checkbox"
                                    checked={value}
                                    {...other}
                                  />{' '}
                                  <span>{name}</span>
                                </label>
                              </Fragment>
                            )}
                          />
                        </FieldContainer>
                      )
                    )}
                  </div>

                  <div
                    className={clsx(
                      step === 3 ? 'flex' : 'hidden',
                      ' flex-col flex-nowrap',
                      'w-full'
                    )}
                  >
                    <FieldContainer>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Fragment>
                            <TextField
                              field={field}
                              className={fieldState.error && 'border-red-600'}
                              type="text"
                              placeholder="NOM :"
                            />
                            {fieldState.error && (
                              <span className="font-raleway text-red-600">
                                {fieldState.error.message}
                              </span>
                            )}
                          </Fragment>
                        )}
                      />
                    </FieldContainer>
                    <FieldContainer>
                      <Controller
                        name="mail"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Fragment>
                            <TextField
                              field={field}
                              className={fieldState.error && 'border-red-600'}
                              type="email"
                              placeholder="ADRESSE MAIL :"
                            />
                            {fieldState.error && (
                              <span className="font-raleway text-red-600">
                                {fieldState.error.message}
                              </span>
                            )}
                          </Fragment>
                        )}
                      />
                    </FieldContainer>
                    <FieldContainer>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Fragment>
                            <TextField
                              field={field}
                              className={fieldState.error && 'border-red-600'}
                              type="tel"
                              placeholder="TÉLÉPHONE :"
                            />
                            {fieldState.error && (
                              <span className="font-raleway text-red-600">
                                {fieldState.error.message}
                              </span>
                            )}
                          </Fragment>
                        )}
                      />
                    </FieldContainer>

                    <FieldContainer>
                      <Controller
                        name="message"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            field={field}
                            className={fieldState.error && 'border-red-600'}
                            placeholder="MESSAGE (Optionel):"
                            multiline
                          />
                        )}
                      />
                    </FieldContainer>
                  </div>

                  <FieldContainer>
                    {step > 1 && (
                      <NormalButton
                        disabled={formState.isSubmitting}
                        className={clsx('mb-3 w-full')}
                        onClick={(e) => {
                          e.preventDefault();
                          setStep(step - 1);
                        }}
                      >
                        Précédent
                      </NormalButton>
                    )}
                    {step < 3 && (
                      <NormalButton
                        className={clsx('mb-3 w-full')}
                        disabled={
                          step === 1 &&
                          (!!formState.errors.age ||
                            !!formState.errors.height ||
                            !!formState.errors.weight ||
                            !!formState.errors.wantedWeight ||
                            !formState.isDirty)
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setStep(step + 1);
                        }}
                      >
                        Suivant
                      </NormalButton>
                    )}
                    {step === 3 && (
                      <NormalButton
                        disabled={!formState.isValid || formState.isSubmitting}
                        name="submit-free-consultation-form"
                        className={clsx('mb-3 w-full')}
                        onClick={handleSubmit(onSubmit)}
                      >
                        ENVOYER
                      </NormalButton>
                    )}
                  </FieldContainer>
                </div>
              )}
            </form>
          </SectionInnerContainer>
        </div>
      </div>
    )
  );
}

export default ContactPopup;

export const PopupFormLoading = () => (
  <div className="w-full border-2 rounded-md mx-auto">
    <div className="flex animate-pulse flex-col items-center h-full justify-center space-y-5">
      <div className="w-full bg-gray-300/40 h-16 rounded-none "></div>
      <div className="w-full bg-gray-300/40 h-16 rounded-none "></div>
      <div className="w-full bg-gray-300/40 h-48 rounded-none "></div>
    </div>
  </div>
);
