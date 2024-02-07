"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const Page = () => {
    const [existingFormData, setExistingFormData] = useState([]);
    const [highestCategory, setHighestCategory] = useState("");
    const [highestExpense, setHighestExpense] = useState(0);

    useEffect(() => {
        // Access localStorage only in the browser environment
        if (typeof window !== "undefined") {
            const formDataFromLocalStorage =
                JSON.parse(localStorage.getItem("formData")) || [];

            setExistingFormData(formDataFromLocalStorage);
        }
    }, []);

    const totalExpense = existingFormData.reduce(
        (total, expense) => total + parseFloat(expense.amount),
        0
    );

    useEffect(() => {
        const sortedData = existingFormData.sort((a, b) => b.amount - a.amount);
        if (sortedData.length > 0) {
            setHighestCategory(sortedData[0].category);
            setHighestExpense(sortedData[0].amount);
        }
    }, [existingFormData]);

    return (
        <main className="flex min-h-screen flex-col items-center p-24 gap-4">
            <Link href="/">
                <Button>Go to Form</Button>
            </Link>
            <div className="py-6">
                You paid a lot for the category:{" "}
                <span className="text-3xl font-semibold">
                    {highestCategory}
                </span>
            </div>
            <div className="py-6">
                Your highest expense was of:{" "}
                <span className="text-3xl font-semibold">
                    US$ {highestExpense}
                </span>
            </div>
            <Table>
                <TableCaption>A list of your recent expenses.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {existingFormData.map((expense, index) => (
                        <TableRow key={index}>
                            <TableCell>{expense.category}</TableCell>
                            <TableCell>
                                {format(expense.date, "dd-MM-yyyy")}
                            </TableCell>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell>{expense.amount}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell colSpan={3} className="font-bold">
                            Total Expenses
                        </TableCell>
                        <TableCell className="font-bold">
                            {totalExpense.toFixed(2)}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </main>
    );
};

export default Page;
