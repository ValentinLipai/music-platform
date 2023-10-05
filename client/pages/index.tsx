import { Button } from '@mui/material';
import MainLayout from '@/layouts/MainLayout';

const Index = () => {
    return (
        <MainLayout>
            <div className="center">
                <h1>Welcome</h1>
                <h3>Here you can find the best tracks!</h3>
                <Button>Button</Button>
            </div>

            <style jsx>
                {`
                    .center {
                        margin-top: 150px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                    }
                `}
            </style>
        </MainLayout>
    );
};

export default Index;
