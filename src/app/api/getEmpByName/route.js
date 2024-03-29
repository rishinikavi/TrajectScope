import connectToDB from "@/database";
import employees from "@/models/employee";

import { NextResponse } from "next/server";


export async function POST(req) {
    await connectToDB();
    const extractData = await req.json();
    console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~ POST ~ extractData:", extractData)

    try {
        let allempdata = [];

        const empdata = await employees.find({ "name": {$regex: extractData.empName}},{name:1}).limit(5); 
        
        console.log("🚀 ~ POST ~ empdata:", empdata)
        
        return NextResponse.json({
            success: true,
            message: "successful!",
            empdata : empdata,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Faild!",
        });
    }
}