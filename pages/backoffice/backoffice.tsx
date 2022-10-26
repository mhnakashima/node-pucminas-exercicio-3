import React from 'react';
import { Backoffice } from '../../components/backoffice/Backoffice';

const BackofficePage = (props: any) => {
    return <Backoffice {...props} />;
};

export const getServerSideProps = async context => {
    return { props: {} };
};

export default BackofficePage;
