import { MLink } from '@/components';

const Index = () => {
  return (
    <>
      <div className="center">
        <h1>Welcome</h1>
        <h3>Here you can find the best tracks!</h3>
        <MLink href={'/tracks'}>Explore Tracks</MLink>
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
    </>
  );
};

export default Index;
