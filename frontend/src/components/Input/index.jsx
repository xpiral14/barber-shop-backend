import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 0.7rem;
  border-radius: 5px;
  border: 1px solid ${(p) => p.theme.colors.primary};
`;

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = "", registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);
  return (
    <>
      {error && <strong>{error}</strong>}
      <StyledInput ref={inputRef} defaultValue={defaultValue} {...rest} />
    </>
  );
}
