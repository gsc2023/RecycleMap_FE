import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ServiceForm from '../components/user/ServiceForm';
import UserForm from '../components/user/UserForm';
import EmailAuthForm from '../components/user/EmailAuthForm';

const steps = ['약관 동의', '정보 입력', '이메일 인증']

export type UserList = {
  email: String,
  password: String,
  nickname: String
}

const SignUp: React.FC = () => {

  // const navigate = useNavigate();

  // const [currentStep, setCurrentStep] = React.useState<number>(0);
  // const [auth, setAuth] = React.useState<string>("");
  // const [userList, setUserList] = React.useState<UserList[]>([]);

  // const stepComponent = (step: number) => {
  //   switch (step) {
  //     case 0:
  //       return <ServiceForm />;
  //     case 1:
  //       return <UserForm userList={setUserList} />;
  //     case 2:
  //       return <EmailAuthForm />;
  //     default:
  //       throw new Error("Unknown Steps");
  //   }
  // }

  // const handleNextStep = () => {
  //   setCurrentStep(currentStep + 1);
  // }

  // const handleBackStep = () => {
  //   setCurrentStep(currentStep - 1);
  // }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      {/* <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }}}>
        <Typography variant="h6" align="center">회원가입</Typography>
        <Stepper activeStep={currentStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {currentStep === steps.length ? (
          <React.Fragment>
            <Box display="flex" justifyContent="center">회원가입이 정상적으로 완료되었습니다.</Box>
            <Box display="flex" justifyContent="flex-end">
              <Button color="primary" variant="outlined" onClick={() => navigate("/map")} sx={{ mt: 3, ml: 1 }}>
                완료
              </Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {stepComponent(currentStep)}
            <Box display="flex" justifyContent="flex-end">
              {currentStep !== 0 && (
                <Button color="primary" variant="outlined" onClick={handleBackStep} sx={{ mt: 3, ml: 1 }}>
                  이전
                </Button>
              )}
              <Button color="primary" variant="outlined" onClick={handleNextStep} sx={{ mt: 3, ml: 1 }}>
                이후
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper> */}
    </Container>
  );
};

export default SignUp;