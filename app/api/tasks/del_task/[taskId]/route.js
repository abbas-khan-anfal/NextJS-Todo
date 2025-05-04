import connectDB from "@/lib/db";
import taskModel from "@/models/tasks/task";
import { NextResponse as res } from "next/server";
import mongoose from "mongoose";


export async function DELETE(req, {params})
{
    try
    {
        await connectDB();
        const {taskId} = await params;

        if(!mongoose.isValidObjectId(taskId))
        {
            return res.json({
                success : false,
                error: "Task does not found"
            }, { status: 404 });
        }

        const task = await taskModel.findById(taskId);

        if(!task)
        {
            return res.json({
                success : false,
                error: "Task does not found"
            }, { status: 404 });
        }

        await task.deleteOne();

        return res.json({
            success : true,
            message: "Task deleted successfully"
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