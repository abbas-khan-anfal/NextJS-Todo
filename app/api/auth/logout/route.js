import { NextResponse as res } from "next/server";
import { cookies } from "next/headers";

export async function GET(req)
{
    try
    {
        const userCookies = await cookies();
        userCookies.delete("todoToken");


        return res.json({
            success : true,
            message: "Logout successfull"
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