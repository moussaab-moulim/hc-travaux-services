import React, { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { LinesBackground } from '@components/atoms/Background';
import { NormalButton } from '@components/atoms/CustomButtons';
import { FieldContainer } from '@components/atoms/FieldContainer';
import { Heading } from '@components/atoms/Heading';
import { TextField } from '@components/atoms/TextField';
import { SectionInnerContainer } from '@components/molecules/Containers';
import { clsx } from '@utils/common';
import { getRequiredEnvVariable } from '@utils/constants';

interface IContactFormHook {
  name: string;
  mail: string;
  message: string;
}
function ContactForm() {
  const [formPending, setFormPending] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IContactFormHook>({
    defaultValues: {
      name: '',
      mail: '',
      message: '',
    },
  });
  const onSubmit = async (data: IContactFormHook) => {
    setFormPending(true);
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
          <p>name: ${data.name}</p>
          <p>email: ${data.mail}</p>
          <p>message: ${data.message}</p>
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
    setFormPending(false);
    if (contactResposne.status === 200) {
      toast.success('Fomulaire envoyé avec success.\n');
      reset();
    } else {
      toast.error("Echec d'envoi.");
    }
  };

  return (
    <section
      id="contact"
      className={clsx('comment-form relative pt-20 pb-12 lg:pb-36')}
    >
      <LinesBackground />
      <SectionInnerContainer className="flex flex-wrap flex-row">
        <div className="group-title self-center basis-full md:basis-1/2 text-center md:text-left md:pl-10 md:pr-5 mb-12">
          <Heading
            as="h2"
            className={clsx(
              'relative font-extrabold text-base md:text-2xl lg:text-3xl flex flex-col',
              '[&_em]:text-4xl [&_em]:md:text-5xl [&_em]:text-text [&_em]:not-italic [&_em]:font-light',
              //underline
              '[&_*:not(em)]:after:block [&_*:not(em)]:after:w-28 [&_*:not(em)]:after:h-px [&_*:not(em)]:after:absolute',
              ' [&_*:not(em)]:mb-10 [&_*:not(em)]:after:left-1/2  [&_*:not(em)]:after:-translate-x-1/2',
              'md:[&_*:not(em)]:after:!left-0 md:[&_*:not(em)]:after:!translate-x-0',
              ' [&_*:not(em)]:after:bg-primary [&_*:not(em)]:after:mt-4 [&_*:not(em)]:after:mb-6',

              'lg:[&_*:not(em)]:after:w-40 lg:[&_*:not(em)]:after:mt-5'
            )}
          >
            <span>Tu as encore des questions?</span>
            <em>CONTACTE-MOI</em>
          </Heading>
          <div className="form-text relative text-text text-base font-normal mt-5 font-raleway text-center md:text-left">
            {
              " Tu as des questions sur les programmes ou tu veux avoir plus de détails, n'hésite pas à m'écrire."
            }
            <br />
            {"La première séance d'évaluation est offerte."}
          </div>
        </div>

        {formPending ? (
          <FormLoading />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={clsx(
              'basis-full  md:basis-1/2 ',
              'max-w-[550px] mx-auto'
            )}
          >
            <div
              className={clsx(
                'clearfix flex flex-row flex-wrap',
                'py-[70px] px-[40px] shadow-allAround'
              )}
            >
              <FieldContainer>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Veuillez remplir le champ :Nom',
                    },
                  }}
                  render={({ field }) => (
                    <TextField type="text" placeholder="NOM" field={field} />
                  )}
                />
              </FieldContainer>

              <FieldContainer>
                <Controller
                  name="mail"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Veuillez remplir le champ :Adresse mail',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      type="text"
                      placeholder="ADRESSE MAIL"
                      field={field}
                    />
                  )}
                />
              </FieldContainer>

              <FieldContainer>
                <Controller
                  name="message"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Veuillez remplir le champ :Message',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      className="darma"
                      placeholder="MESSAGE"
                      field={field}
                      multiline
                    />
                  )}
                />
              </FieldContainer>

              <div className="clearfix form-group basis-full text-center md:px-2">
                {Object.values(errors).map((_error, ind) => (
                  <span key={ind} className="font-raleway text-red-600">
                    {_error.message} <br />
                  </span>
                ))}
              </div>
              <div className="clearfix form-group basis-full text-right md:px-2 flex justify-around md:justify-end">
                <NormalButton type="submit" name="submit-contact-form">
                  ENVOYER
                </NormalButton>
              </div>
            </div>
          </form>
        )}
      </SectionInnerContainer>
    </section>
  );
}

export default ContactForm;

export const FormLoading = () => (
  <div className="w-full border-2 rounded-md mx-auto">
    <div className="flex animate-pulse flex-col items-center h-full justify-center space-y-5">
      <div className="w-full bg-gray-300/40 h-16 rounded-none "></div>
      <div className="w-full bg-gray-300/40 h-16 rounded-none "></div>
      <div className="w-full bg-gray-300/40 h-48 rounded-none "></div>
    </div>
  </div>
);
