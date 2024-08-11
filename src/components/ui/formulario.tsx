"use client";
import React, { ChangeEvent, FormEvent } from 'react';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";

export default function Formulario() {
  interface Task {
    name: string;
    date: string;
    materia: string;
    estado: boolean;
  }

  const [formData, setFormData] = useState<{
    name: string;
    date: string; // Cambiado de `null` a `string`
    materia: string;
    estado: boolean;
  }>({
    name: '',
    date: '', // Cambiado de `null` a `''`
    materia: '',
    estado: false,
  });

  const [tasks, setTasks] = useState<Task[]>([]); // Define el estado con el tipo Task[]

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleDateChange: (date: Date | null) => void = (date) => {
    const formattedDate = date ? date.toLocaleDateString() : '';
    setFormData((prevData) => ({
      ...prevData,
      date: formattedDate,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.date || !formData.materia) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const newTasks = [...tasks, formData];
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));

    // Reset form data after submission
    setFormData({
      name: '',
      date: '', // Cambiado de `null` a `''`
      materia: '',
      estado: false,
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Crea una tarea</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                placeholder="Nombre de la tarea"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="materia">Materia</Label>
              <Input
                id="materia"
                placeholder="Materia"
                value={formData.materia}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="dueDate">Fecha de entrega</Label>
              <Calendar
                mode="single"
                selected={formData.date ? new Date(formData.date) : undefined} // Cambiado a `undefined`
                onDayClick={handleDateChange}
                className="rounded-md border"
              />
            </div>
          </div>
          <br />
          <CardFooter className="flex justify-center">
            <Button type="submit">Crear</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
