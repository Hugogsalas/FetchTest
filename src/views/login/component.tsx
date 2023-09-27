import { Box, TextField, Typography, Button } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { login as loginService } from '../../services';
import { useNavigate } from 'react-router-dom';

export interface LoginForm {
  email: string;
  name: string;
}

const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('The email is required'),
  name: Yup.string().required('The name is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const submit = async (values: LoginForm) => {
    await loginService({
      ...values,
    });

    navigate('/home');
  };

  const formik = useFormik<LoginForm>({
    initialValues: {
      email: '',
      name: '',
    },
    onSubmit: submit,
    validationSchema: loginSchema,
  });

  return (
    <Box width="100%" display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h5">Sign in</Typography>
      <Box
        margin={3}
        padding={5}
        borderColor="white"
        component="form"
        minWidth="200px"
      >
        <Box>
          <TextField
            value={formik.values.name}
            onChange={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
            variant="outlined"
            label="Username"
          />
        </Box>
        <Box mt={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Button fullWidth onClick={() => formik.handleSubmit()}>
          <Typography variant="button">Sign in</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
