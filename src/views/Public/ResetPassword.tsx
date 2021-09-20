import React, { FC, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { InputText } from "../_components/Inputs";
import { Button } from "../_components/Button";
import { css } from "styled-components/macro";
import { PublicLayout } from "./Layout";
import { useAuth } from "../../context/AuthContext";

export const ResetPassword: FC<{}> = () => {
  const [form, setForm] = useState({
    email: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    let key = e.currentTarget.name;
    let value = e.currentTarget.value;
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setMessage("");
      setLoading(true);
      await resetPassword(form.email);
      setMessage("Check your email to get a new password");
    } catch {
      setMessage("Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <PublicLayout>
      <Main>
        <h1>Password Reset</h1>

        <Form onSubmit={(e) => handleSubmit(e)}>
          <InputText
            type="email"
            name="email"
            label="Email*"
            required
            onChange={handleChange}
          />
          <Button type="submit">{loading ? "Loading..." : "Reset"}</Button>
          {message && <p>{message}</p>}
        </Form>
        <p>
          Back to login?<Link to="/login">Login</Link>
        </p>
      </Main>
    </PublicLayout>
  );
};

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
