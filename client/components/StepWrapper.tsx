import { Card, Container, Grid, Step, StepLabel, Stepper } from '@mui/material';

interface IStepWrapperProps extends React.PropsWithChildren {
  activeStep: number;
}

const steps = ['Track information', 'Upload track cover', 'Upload track'];

export const StepWrapper: React.FC<IStepWrapperProps> = ({
  activeStep,
  children,
}) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step + index} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container justifyContent="center" sx={{ my: 7, height: 270 }}>
        <Card sx={{ width: 600 }}>{children}</Card>
      </Grid>
    </Container>
  );
};

export default StepWrapper;
