import React, { FC, useState } from "react";
import styled from "styled-components";
import { Button } from "../_components/Button";
import { InputText } from "../_components/Inputs";
import { useAuth } from "../../context/AuthContext";
import { PublicLayout } from "./Layout";

export const SignUp: FC<{}> = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    password2: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    let key = e.currentTarget.name;
    let value = e.currentTarget.value;
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      return setMessage("Passwords do not match");
    }
    try {
      setMessage("");
      setLoading(true);
      await signup(form.email, form.password);
    } catch {
      setMessage("Failed to create account");
    }
    setLoading(false);
  };

  return (
    <PublicLayout>
      <Main>
        <h1>Sing Up</h1>

        <Form onSubmit={(e) => handleSubmit(e)}>
          <InputText name="name" label="Name" onChange={handleChange} />
          <InputText
            type="email"
            name="email"
            label="Email*"
            required
            onChange={handleChange}
          />
          <InputText
            name="company"
            label="Company"
            required
            onChange={handleChange}
          />
          <InputText
            type="password"
            name="password"
            label="Password*"
            onChange={handleChange}
          />
          <InputText
            type="password"
            name="password2"
            label="Repeat Password*"
            onChange={handleChange}
          />
          <Button type="submit">{loading ? "Loading..." : "Sign up"}</Button>
          {message && <p>{message}</p>}
        </Form>
      </Main>
    </PublicLayout>
  );
};

const Form = styled.form`
  margin-top: 40px;
  > div {
    padding-bottom: 0;
  }
  button {
    margin-top: 20px;
    width: 100%;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  h1 {
  }
  p {
    margin: 10px 0;
    text-align: center;
    a {
      padding-left: 6px;
      text-decoration: underline;
    }
  }
`;
