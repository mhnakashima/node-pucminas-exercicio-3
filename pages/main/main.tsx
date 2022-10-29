import { Main } from '../../components/Main/Main';

const MainPage = (props: any) => {
    return <Main {...props} />;
};

export const getServerSideProps = async context => {
    return { props: {} };
};

export default MainPage;
