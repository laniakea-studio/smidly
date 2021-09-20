import React, { FC, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { InputText } from "../_components/Inputs";
import { Button } from "../_components/Button";
import { useAuth } from "../../context/AuthContext";
import { PublicLayout } from "./Layout";
import { useHistory } from "react-router-dom";

export const Login: FC<{}> = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    password2: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const history = useHistory();

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
      await login(form.email, form.password);
      history.push("/account/projects");
    } catch {
      setMessage("Failed to login");
    }
    setLoading(false);
  };

  return (
    <PublicLayout>
      <Main>
        <h1>Login</h1>

        <Form onSubmit={(e) => handleSubmit(e)}>
          <InputText
            type="email"
            name="email"
            label="Email*"
            required
            onChange={handleChange}
          />
          <InputText
            type="password"
            name="password"
            label="Password*"
            onChange={handleChange}
          />
          <Button type="submit">
            {loading ? <div className="spinner" /> : "Login"}
          </Button>
        </Form>
        <p>
          Need an account?<Link to="/signup">Sign up</Link> <br />
          Forgot your password? <Link to="/forgot-my-password">Get a new</Link>
        </p>
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
  .spinner {
    border-radius: 50%;
    width: 24px;
    height: 24px;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-left-color: #fff;
    border-top-color: #fff;
    animation: spin 0.6s infinite linear;
  }
  @keyframes spin {
    to {
      transform: rotate(359deg);
    }
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
    margin: 20px 0;
    text-align: center;
    a {
      padding-left: 6px;
      text-decoration: underline;
    }
  }
`;
