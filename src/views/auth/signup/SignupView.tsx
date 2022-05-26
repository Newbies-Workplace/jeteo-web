import React from 'react';
import AuthHeadline from "../../../components/containers/AuthHeadline/AuthHeadline";
import AuthInputForm from "../../../components/containers/AuthInputForm/AuthInputForm";
import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

export const SignupView: React.FC = () => {

    return (
        <>
            <AuthHeadline>
                Jak się nazywasz? 🤔
            </AuthHeadline>
            <AuthInputForm />
            <PrimaryButton onClick={() => null}>
                Gotowe
            </PrimaryButton>
        </>
    )
};
