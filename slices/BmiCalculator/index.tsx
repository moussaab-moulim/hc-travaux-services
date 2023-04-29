import React, { useState, Fragment } from 'react';

import { SliceComponentProps } from '@prismicio/react';
import dynamic from 'next/dynamic';
import { useForm, Controller } from 'react-hook-form';

import { BmiCalculatorSlice } from '.slicemachine/prismicio';
import { NormalButton } from '@components/atoms/CustomButtons';
import { FieldContainer } from '@components/atoms/FieldContainer';
import { TextField } from '@components/atoms/TextField';
import { SectionInnerContainer } from '@components/molecules/Containers';
import { SectionTitle } from '@components/molecules/SectionTitle';
//import ContactPopup from '@components/organisms/Contact/ContactPopUp';
import { PopupFormLoading } from '@components/organisms/Contact/ContactPopUp';

const ContactPopup = dynamic(
  () => import('@components/organisms/Contact/ContactPopUp'),
  {
    loading: () => <PopupFormLoading />,
  }
);
interface IBmiForm {
  height: string;
  weight: string;
  age: string;
}
const BmiCalculator = ({ slice }: SliceComponentProps<BmiCalculatorSlice>) => {
  const [contactOpen, setContactOpen] = useState(false);
  const handlePopupClose = () => {
    setContactOpen(false);
  };
  const { handleSubmit, control, watch } = useForm<IBmiForm>({
    defaultValues: {
      height: '',
      weight: '',
      age: '',
    },
  });

  const formData = watch();

  const [bmi, setBmi] = useState(null);
  const onSubmit = () => {
    setContactOpen(true);
    /*    setBmi(
      (
        (Number(data.weight) / Number(data.height) / Number(data.height)) *
        10000
      ).toFixed(2)
    ); */
  };

  const getScoreStatus = (currentScore: number) => {
    if (currentScore <= 18.5) {
      return 'Maigreur';
    } else if (currentScore <= 24.9) {
      return 'Normal';
    } else if (currentScore <= 29.9) {
      return 'Surpoids';
    } else {
      return 'obèse';
    }
  };

  const handleContactPopup = () => {
    console.log('open popup');
  };

  return (
    <section
      className={`calculator-section bg-[${
        slice.primary.background_color ?? '#FFFFFF'
      }] pt-20 pb-12 relative lg:pt-40 lg:pb-36`}
      id={slice.primary.slice_id ?? undefined}
    >
      <SectionInnerContainer>
        <SectionTitle
          heading={slice.primary.title}
          text={slice.primary.description}
        />

        <div className="inner-container relative max-w-4xl my-0 mx-auto">
          {/* Default Form */}
          <div className="default-form relative max-w-5xl my-0 mx-auto">
            {/* Default Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-row flex-wrap">
                <FieldContainer className="form-group basis-full md:basis-1/2 ">
                  <Controller
                    name="height"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Fragment>
                        <TextField
                          type="text"
                          placeholder="Taille / Cm"
                          field={field}
                          className={fieldState.error && 'border-red-600'}
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

                <FieldContainer className="form-group basis-full md:basis-1/2 ">
                  <Controller
                    name="weight"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Fragment>
                        <TextField
                          type="text"
                          placeholder="Poids / kg"
                          field={field}
                          className={fieldState.error && 'border-red-600'}
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

                <FieldContainer className="form-group basis-full md:basis-1/2 ">
                  <Controller
                    name="age"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <Fragment>
                        <TextField
                          type="text"
                          placeholder="Age"
                          field={field}
                          className={fieldState.error && 'border-red-600'}
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

                <FieldContainer className="form-group basis-full md:basis-1/2 ">
                  <NormalButton
                    className={'w-full bg-transparent'}
                    type="submit"
                    name="submit-bmi-form"
                  >
                    Consultation gratuite
                  </NormalButton>
                </FieldContainer>
              </div>
            </form>
            {
              <ContactPopup
                open={contactOpen}
                onClose={handlePopupClose}
                age={formData.age}
                weight={formData.weight}
                height={formData.height}
              />
            }

            {bmi && (
              <Fragment>
                <div className="relative my-5 text-center">
                  Ton score est :<br />
                  <strong>{bmi}</strong>
                </div>
                <div className={`mx-4 text-center text-base mb-5`}>
                  Vous êtes :<br />
                  <strong>{getScoreStatus(bmi)}</strong>
                </div>
                <div className="flex flex-row flex-wrap justify-center">
                  <FieldContainer className="form-group basis-full md:basis-1/2 ">
                    <NormalButton
                      className={`w-full`}
                      onClick={() => {
                        setBmi(null);
                      }}
                    >
                      Fermer
                    </NormalButton>
                  </FieldContainer>
                  <FieldContainer className="form-group basis-full md:basis-1/2 ">
                    <NormalButton
                      className={`w-full`}
                      onClick={handleContactPopup}
                    >
                      Consultation gratuite
                    </NormalButton>
                  </FieldContainer>
                </div>
              </Fragment>
            )}

            {/*End Default Form */}
          </div>
        </div>
      </SectionInnerContainer>
    </section>
  );
};

export default BmiCalculator;
