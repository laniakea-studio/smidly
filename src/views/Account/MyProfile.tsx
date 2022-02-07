import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { InputText } from "../_components/Inputs";
import { Button } from "../_components/Button";
import { AccountLayout } from "./Layout";
import { ProfilePicture } from "./_components/ProfilePicture";

export const MyProfile: FC<{}> = () => {
  const { currentUser, updateProfileEmail, updateProfilePassword, getUser } =
    useAuth();

  const [form, setForm] = useState({
    name: "",
    email: currentUser.email,
    company: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    const data = await getUser(currentUser.uid);
    console.log(data);
    setForm({ ...form, name: data?.name, company: data?.company });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    let key = e.currentTarget.name;
    let value = e.currentTarget.value;
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const promises = [];

    setLoading(true);
    setMessage("");
    if (currentUser.email !== form.email) {
      promises.push(updateProfileEmail(form.email));
    }
    if (form.password) {
      promises.push(updateProfilePassword(form.password));
    }

    Promise.all(promises)
      .then(() => {
        setMessage("Profile Updated!");
      })
      .catch(() => {
        setMessage("Failed to update profile");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AccountLayout>
      <Main>
        <h1>Update Profile</h1>
        <ProfilePicture />
        <Form onSubmit={(e) => handleSubmit(e)}>
          <InputText
            name="name"
            label="Name"
            onChange={handleChange}
            value={form.name}
          />
          <InputText
            type="email"
            name="email"
            label="Email*"
            required
            onChange={handleChange}
            value={form.email}
          />
          <InputText
            name="company"
            label="Company"
            onChange={handleChange}
            value={form.company}
          />
          <InputText
            type="password"
            name="password"
            label="Password*"
            placeholder="Leave blank to keep the same"
            onChange={handleChange}
          />
          <InputText
            type="password"
            name="password2"
            label="Password*"
            placeholder="Leave blank to keep the same"
            onChange={handleChange}
          />
          <Button type="submit">{loading ? "Loading..." : "Update"}</Button>
          {message && <p>{message}</p>}
        </Form>
      </Main>
    </AccountLayout>
  );
};

const Form = styled.form`
  margin-top: 40px;
  max-width: 400px;
  width: 100%;
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
`;
