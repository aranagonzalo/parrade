"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

const Form = () => {
    const [formInput, setFormInput] = useState({
        amount: "",
        category: "",
        date: new Date(),
        description: "",
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Here you can send the formInput object to the server
        const existingFormData =
            JSON.parse(localStorage.getItem("formData")) || [];

        existingFormData.push(formInput);
        localStorage.setItem("formData", JSON.stringify(existingFormData));
        // Reset form after submission (optional)
        setFormInput({
            amount: "",
            category: "",
            date: new Date(),
            description: "",
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormInput({
            ...formInput,
            [name]: value,
        });
    };

    return (
        <div>
            <form
                onSubmit={handleFormSubmit}
                className="rounded bg-slate-100 py-4 px-8 shadow gap-3 flex flex-col"
            >
                <h1 className="font-semibold text-2xl pb-4">Add new Expense</h1>
                <label htmlFor="amount">Amount :</label>

                <Input
                    type="number"
                    name="amount"
                    placeholder="Enter amount"
                    value={formInput.amount}
                    onChange={handleInputChange}
                />

                <label htmlFor="category">Category :</label>
                <Input
                    name="category"
                    placeholder="Enter Category"
                    value={formInput.category}
                    onChange={handleInputChange}
                />

                <label htmlFor="date">Date :</label>
                <Calendar
                    mode="single"
                    selected={formInput.date}
                    onSelect={(date) => setFormInput({ ...formInput, date })}
                    className="rounded-md border"
                />

                <label htmlFor="description">Description :</label>
                <Input
                    name="description"
                    placeholder="Enter Description"
                    value={formInput.description}
                    onChange={handleInputChange}
                />

                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default Form;
