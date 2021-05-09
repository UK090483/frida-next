import React, { useEffect, useContext } from "react"
import { useFormik } from "formik"
import styled from "styled-components"
import UiContext from "~context/UiContext"
const Form = ({ isFormValid, setIsFormValid }) => {
  const { userData, setUserData, setUserDataValid } = useContext(UiContext)

  const inital = userData
    ? userData
    : {
        email: "",
        name: "",
        street: "",
        houseNumber: "",
      }

  const formik = useFormik({
    initialValues: {
      ...inital,
    },

    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  const { isValid, values, validateForm } = formik

  useEffect(() => {
    validateForm()
    setUserDataValid(isValid)
    setUserData(values)
  }, [
    isFormValid,
    isValid,
    setIsFormValid,
    setUserData,
    setUserDataValid,
    validateForm,
    values,
  ])

  return (
    <FormWrap onSubmit={formik.handleSubmit}>
      <Input
        formik={formik}
        label={"Firts Name"}
        name={"fname"}
        type={"text"}
        size={"s"}
      />
      <Input
        formik={formik}
        label={"Last Name"}
        name={"lname"}
        type={"text"}
        size={"s"}
      />
      <Input formik={formik} label={"Email"} name={"email"} type={"email"} />
      <Input formik={formik} label={"Strasse"} name={"street"} type={"text"} />
      <Input
        formik={formik}
        label={"Hausnummer"}
        name={"houseNumber"}
        type={"text"}
      />
      <Input
        formik={formik}
        label={"Postleitzahl"}
        name={"postcode"}
        type={"text"}
      />

      {/* <button type="submit">Submit</button> */}
    </FormWrap>
  )
}

export default Form

const Collumn = styled.div`
  display: flex;
  width: 100%;
`
const FormWrap = styled.form`
  width: 100%;
  /* max-width: 600px; */
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: space-between;
  /* flex-direction: column; */
  padding-bottom: 100px;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.3rem;
  }
`

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = "Required"
  }

  if (!values.email) {
    errors.email = "Required"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address"
  }

  if (!values.street) {
    errors.street = "Required"
  }
  return errors
}

const Input = ({ formik, label, name, type, size }) => {
  const { touched } = formik.getFieldMeta(name)

  const error =
    touched && formik.errors[name] ? <Error>{formik.errors[name]}</Error> : ""

  return (
    <StyledInput size={size}>
      <input
        placeholder={label}
        id={name}
        type={type}
        {...formik.getFieldProps(name)}
      />
      <label htmlFor={name}>
        {label}
        {error}
      </label>
    </StyledInput>
  )
}

const Error = styled.span`
  font-weight: 200;
  color: red;
  padding-left: 10px;
  font-size: 15px;
`

const StyledInput = styled.div`
  width: ${({ size }) => (size == "s" ? "calc(50% - 10px)" : "100%")};
  position: relative;
  padding: 15px 0 0;
  margin-top: 15px;
  margin-bottom: 5px;
  background-color: ${({ theme }) => theme.colors.green};

  label {
    position: absolute;
    top: 0;
    left: 20px;
    display: block;
    transition: 0.2s;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.black};
    @media ${({ theme }) => theme.device.tablet} {
      font-size: 1rem;
    }
  }

  input {
    font-family: inherit;
    width: 100%;
    border: 0;
    /* border-bottom: 3px solid ${({ theme }) => theme.colors.black}; */
    
    outline: 0;
    font-size: 0.8rem;
    color: blue;
    padding: 7px 0;
    padding-left:20px;
    background: transparent;
    transition: border-color 0.2s;
    background-color: ${({ theme }) => theme.colors.green};
    @media ${({ theme }) => theme.device.tablet} {
      font-size: 1.3rem;
    }
    &::placeholder {
      color: transparent;
    }

    &:placeholder-shown ~ label {
      font-size: 1.3rem;
      cursor: text;
      top: 20px;
    }

    &:focus {
      ~ label {
        position: absolute;
        top: 0;
        left:10px;
        display: block;
        transition: 0.2s;
        font-size: 1rem;
        font-weight: 700;
      }
    }
  }
`
