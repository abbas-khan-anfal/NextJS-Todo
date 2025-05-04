import connectDB from "@/lib/db";
import { getLoggedInUser } from "@/lib/getLoggedInUser";
import taskModel from "@/models/tasks/task";
import mongoose from "mongoose";
import { NextResponse as res } from "next/server";

export async function POST(req)
{
    try
    {
        await connectDB();
        const body = await req.json();
        const { taskName, task  } = body;

        if(taskName.trim() === "" || task.trim() === "")
        {
            return res.json({
                success : false,
                message: "Please fill all the fields"
            }, { status: 400 });
        }

        const user = await getLoggedInUser();

        if(!user)
        {
            return res.json({
                success : false,
                message: "User does not found"
            }, { status: 404 });
        }
        const currentUserId = user.userId;

        if(!mongoose.isValidObjectId(currentUserId))
        {
            return res.json({
                success : false,
                message: "User does not found"
            }, { status: 404 });
        }

        await taskModel.create({
            taskName,
            task,
            author: currentUserId
        });

        return res.json({
            success : true,
            message: "Task saved successfully"
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

export async function PUT(req)
{
    try
    {
        await connectDB();
        const body = await req.json();
        const { taskId  } = body;
        const user = await getLoggedInUser();

        if(!user)
        {
            return res.json({
                success : false,
                message: "User does not found"
            }, { status: 404 });
        }

        if(!mongoose.isValidObjectId(taskId))
        {
            return res.json({
                success : false,
                message: "Task does not found"
            }, { status: 404 });
        }

        const task = await taskModel.findOne({_id : taskId, author : user.userId});

        if(!task)
        {
            return res.json({
                success : false,
                message: "Task does not found"
            }, { status: 404 });
        }

        const isToggleTask = task.isCompleted ? false : true;
        task.isCompleted = isToggleTask;
        await task.save();

        return res.json({
            success : true,
            message: "Task updated successfully"
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
                message: "User does not found"
            }, { status: 404 });
        }

        const tasks = await taskModel.find({author : user.userId});

        if(!tasks)
        {
            return res.json({
                success : false,
                message: "No task found"
            }, { status: 404 });
        }

        return res.json({
            success : true,
            tasks,
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