import React from "react";
import styled from "styled-components";

// Definir las props que va a recibir el componente Texto
interface InputProps {
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; // El placeholder es opcional
}

const Texto: React.FC<InputProps> = ({ type, id, value, onChange, placeholder }) => {
  return (
    <StyledWrapper>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input"
        name="text"
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input {
    margin: 10px;
    background: none;
    border: none;
    outline: none;
    max-width: 190px;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 9999px;
    box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
    color: #000;
  }
`;

export default Texto;
