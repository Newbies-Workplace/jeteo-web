import React from 'react';
import AuthHeadline from "../../../components/AuthHeadline/AuthHeadline";
import AuthInputForm from "../../../components/AuthInputForm/AuthInputForm";
import AuthPrimaryButton from "../../../components/AuthPrimaryButton/AuthPrimaryButton";


export const SignupView: React.FC = () => {

    return (
        <>
            <AuthHeadline>
                Jak się nazywasz? 🤔
            </AuthHeadline>
            <AuthInputForm />
            <AuthPrimaryButton margin onClick={() => null}>
                Gotowe
            </AuthPrimaryButton>
        </>
    )
};
