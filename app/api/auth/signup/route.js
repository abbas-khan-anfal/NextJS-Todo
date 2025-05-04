import mongoose from "mongoose";
import userModel from "@/models/users/user";
import { NextResponse as res } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/lib/db";

export async function POST(req)
{
    try
    {
        await connectDB();
        const body = await req.json();
        const { fullName, email, password } = body;

        if(fullName.trim() === "" || email.trim() === "" || password.trim() === "")
        {
            return res.json({
                success : false,
                message: "Please fill all the fields"
            }, { status: 400 });
        }

        if(password.length < 8)
        {
            return res.json({
                success : false,
                message: "Password must be at least 8 characters long"
            }, { status: 400 });
        }

        const user = await userModel.findOne({ email });

        if(user)
        {
            return res.json({
                success : false,
                message: "Email already exist"
            }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            fullName,
            email,
            password: hashedPassword
        });

        console.log("singup successfull");
        return res.json({
            success : true,
            message: "Signup successfull"
        }, { status: 200 });

    }
    catch(error)
    {
        console.log(error);
        return res.json({
            success : false,
            message: error.message
        }, { status: 500 });
    }
}