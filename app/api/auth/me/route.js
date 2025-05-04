import mongoose from "mongoose";
import userModel from "@/models/users/user";
import { NextResponse as res } from "next/server";
import connectDB from "@/lib/db";
import { getLoggedInUser } from "@/lib/getLoggedInUser";
import cloudinary from "@/lib/cloudinary";

export async function GET(req)
{
    try
    {
        await connectDB();
        const user = await getLoggedInUser();
        if(!user)
        {
            return res.json({
                success : false,
                message: "User not found"
            }, { status: 404 });
        }
        const loggedInUser = await userModel.findById(user.userId);
        

        return res.json({
            success : true,
            user : loggedInUser
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


export async function POST(req)
{
    try
    {
        await connectDB();
        const user = await getLoggedInUser();
        const userProfile = await req.formData();

        if(!user)
        {
            return res.json({
                success : false,
                message: "User not found"
            }, { status: 404 });
        }

        const fullName = userProfile?.get('fullName');
        const userId = userProfile?.get('userId');
        const image = userProfile?.get('image');

        if(userId.toString() !== user.userId.toString())
        {
            return res.json({
                success : false,
                message: "User not found"
            }, { status: 404 });
        }

        const loggedInUser = await userModel.findById(user.userId);

        if(loggedInUser.fullName !== fullName)
        {
            loggedInUser.fullName = fullName;
        }

        if(image && image?.type?.startsWith('image/'))
        {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const base64 = buffer.toString('base64');
            const dataURI = `data:${image.type};base64,${base64}`;

            const cloudinaryRes = await cloudinary.uploader.upload(dataURI, {
                folder : 'next_todo/users',
                allowed_formats : ['jpg', 'jpeg', 'png'],
                public_id : `${image.name}-${Date.now()}-${Math.random().toFixed(5)}`
            });

            const imgPath = cloudinaryRes?.secure_url;
            const imgPubId = cloudinaryRes?.public_id;

            if(imgPath && imgPath !== loggedInUser.img_path)
            {
                loggedInUser.img_path = imgPath;
            }

            // delete old image
            if(loggedInUser.img_pub_id && loggedInUser.img_pub_id !== imgPubId)
            {
                await cloudinary.uploader.destroy(loggedInUser.img_pub_id);
            }
            loggedInUser.img_pub_id = imgPubId;

        }


        await loggedInUser.save();
        
        return res.json({
            success : true,
            message : "Profile updated successfully",
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