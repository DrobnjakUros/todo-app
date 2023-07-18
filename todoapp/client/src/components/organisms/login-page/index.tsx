import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";

import { Container, TextField, Button, Grid, Typography } from "@mui/material";

import { useLoginUserMutation } from "../../../store/todoSlice";

const CustomContainer = styled(Container)(() => ({
  padding: "32px 16px !important",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
  minWidth: "400px",
}));

interface LoginPageProps {
  setToken: (token: string) => void;
}

export const LoginPage: FC<LoginPageProps> = ({ setToken }) => {
  const [error, setError] = useState<string>("");
  const { register, handleSubmit } = useForm<User>();

  const [handleLoginUser] = useLoginUserMutation();

  const onSubmit: SubmitHandler<User> = (data: User) => {
    handleLoginUser(data)
      .unwrap()
      .then((res) => {
        localStorage.setItem("token", res.token);
        setToken(res.token);
        setError("");
      })
      .catch((error) => {
        console.log(error);
        setError(error.data.message);
      });
  };

  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "50%",
        margin: "auto",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomContainer>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            fullWidth
            required
            {...register("user", { required: true })}
          />
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            fullWidth
            required
            {...register("password", { required: true })}
          />

          <Container sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="medium"
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </Container>
          {error !== "" && <Typography color="error">{error}</Typography>}
        </CustomContainer>
      </form>
    </Grid>
  );
};
