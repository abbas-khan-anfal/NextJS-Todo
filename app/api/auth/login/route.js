import mongoose from "mongoose";
import userModel from "@/models/users/user";
import { NextResponse as res } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { generateToken } from "@/lib/token";
import connectDB from "@/lib/db";

export async function POST(req)
{
    try
    {
        await connectDB();
        const body = await req.json();
        const { email, password } = body;

        if(email.trim() === "" || password.trim() === "")
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
                message: "Incorrect password"
            }, { status: 400 });
        }

        const user = await userModel.findOne({ email });

        if(!user)
        {
            return res.json({
                success : false,
                message: "Incorrect email & password"
            }, { status: 404 });
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if(!isMatchPassword)
        {
            return res.json({
                success : false,
                message: "Incorrect email & password"
            }, { status: 400 });
        }

        const token = await generateToken(user._id.toString());

        const userCookie = await cookies();
        userCookie.set("todoToken", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            path: "/", // ✅ ensures cookie is sent on all routes
        });
        

        return res.json({
            success : true,
            message: "Login successfull"
        }, { status: 200 });

    }
    catch(error)
    {
        return res.json({
            success : false,
            message: error.message
        }, { status: 500 });
    }
}