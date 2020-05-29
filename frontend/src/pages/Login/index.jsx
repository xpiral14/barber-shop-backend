import React from "react";
import { Container } from "./style";
import Input from "../../components/Input";
import { Form } from "@unform/web";
import { useRef } from "react";
import * as Yup from "yup";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { fetchUserToken } from "../../store/modules/auth/actions";
export default function Login() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  async function handleSubmit(data) {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(3).required(),
      });
      let validatedData = await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(fetchUserToken(validatedData));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input name="email" type="email" placeholder="Digite seu email" />
        <Input name="password" type="password" placeholder="Digite sua senha" />
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}
