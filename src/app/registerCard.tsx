"use client"; 
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import styled from "styled-components";
import Texto from "./inputBonito";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home({ onButtonClick }) {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("alumno");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 

  const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setSuccessMessage(""); 
  };

  const isFormValid = () => {
    if (isLogin) {
      return username && password;
    } else {
      return (
        username &&
        password &&
        confirmPassword &&
        email &&
        password === confirmPassword &&
        emailRegex.test(email)
      );
    }
  };

  const handleRegister = () => {
    setSuccessMessage("Usuario registrado correctamente.");
    setTimeout(() => {
      handleToggleForm();
      setIsLogin(true); 
    }, 2000);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-white pt-5">
        Bienvenido a DecadencyChat
      </h1>
      
      <div className="flex justify-center">
        <StyledCard className="w-[350px] mt-6">
          <CardHeader>
            <CardTitle>{isLogin ? "Inicio de sesión" : "Crear cuenta"}</CardTitle>
            <CardDescription>
              {isLogin
                ? "Ingresa los datos para iniciar sesión"
                : "Ingresa los datos para crear una cuenta"}
            </CardDescription>
            <CardDescription>
              <span
                className="text-blue-500 cursor-pointer"
                onClick={handleToggleForm}
              >
                {isLogin ? "o crea una cuenta" : "o ya tienes una cuenta"}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {successMessage && (
              <div className="bg-green-200 text-green-800 p-2 rounded mb-4 text-center">
                {successMessage}
              </div>
            )}
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Nombre</Label>
                  <Texto 
                    type="text" 
                    id="name" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Nombre de usuario"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="pass">Contraseña</Label>
                  <div className="relative">
                    <Texto 
                      type={showPassword ? "text" : "password"} 
                      id="pass" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder={isLogin ? "Contraseña" : "Crea una contraseña"}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)} 
                      className="toggle-password"
                    >
                      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size="lg" />
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="confirmPass">Confirmar Contraseña</Label>
                      <div className="relative">
                        <Texto 
                          type={showPassword ? "text" : "password"} 
                          id="confirmPass" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)} 
                          placeholder="Confirma tu contraseña"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="Email">Ingresa tu email</Label>
                      <Texto 
                        type="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Ingresa tu email"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label>Tipo de usuario</Label>
                      <div className="flex items-center space-x-4">
                        <div>
                          <input
                            type="radio"
                            id="alumno"
                            name="userType"
                            value="alumno"
                            checked={userType === "alumno"}
                            onChange={() => setUserType("alumno")}
                          />
                          <Label htmlFor="alumno" className="ml-2">Alumno</Label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="maestro"
                            name="userType"
                            value="maestro"
                            checked={userType === "maestro"}
                            onChange={() => setUserType("maestro")}
                          />
                          <Label htmlFor="maestro" className="ml-2">Maestro</Label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            {isLogin ? (
              <Button 
                disabled={!username || !password} 
                onClick={onButtonClick}
              >
                Iniciar sesión
              </Button>
            ) : (
              <Button 
                disabled={!isFormValid()} 
                onClick={handleRegister} 
              >
                Crear cuenta
              </Button>
            )}
          </CardFooter>
        </StyledCard>
      </div>
    </div>
  );
}

const StyledCard = styled.div`
  position: relative;
  max-width: 110%; 
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 12px;
  gap: 12px;
  border-radius: 8px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.8); 

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    left: -5px;
    margin: auto;
    width: calc(100% + 10px); 
    height: calc(100% + 10px); 
    border-radius: 10px;
    background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100%);
    z-index: -10;
    pointer-events: none;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &::after {
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
    background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100%);
    transform: translate3d(0, 0, 0) scale(0.95);
    filter: blur(20px);
  }

  &:hover::after {
    filter: blur(30px);
  }

  &:hover::before {
    transform: rotate(-180deg) scaleX(1.0) scaleY(1.0);
  }
      

  .toggle-password {
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #000;
    cursor: pointer;
    font-size: 18px;
  }
`;
