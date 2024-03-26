import connectToDB from "@/database";
import employees from "@/models/employee";

import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDB();
    const extractData = await req.json();
    console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~ POST ~ extractData:", extractData)

    try {
        let appendedEmpData = [];
        let appendedEmpDataAVG = [];
        let appendedEmpDataCost = [];
        let skillList = [];
        let findOnlySkills = [];

        let bemp = [];
        let flattenedResult = [];
        if (extractData.selectedEmp) {
            console.log("🚀🚀 ~ POST ~ extractData:", extractData.selectedEmp.length)
            console.log("🚀🚀 ~ POST ~ extractData:", extractData.selectedEmp)

            for (let index = 0; index < extractData.skills.length; index++) {
                const element = (extractData.skills[index].percentage / 100) * extractData.manHr;

                for (let indexj = 1; indexj < extractData.selectedEmp.length; indexj++) {
                    if(extractData.skills[index].skill == extractData.selectedEmp[index][1]){
                        const empdata1 = await employees.find({ $and: [{ "skills": extractData.selectedEmp[index][1] }, { "name": extractData.selectedEmp[index][0] }] });
                        console.log("🚀 🚀  ~ POST ~ empdata1: 🚀 🚀 ", empdata1)
                        
                        const empdata = await employees.find({ $and: [{ "skills": extractData.skills[index].skill }, { "Availability": { $gte: element / 2 } }, { "designation": {$nin : ["Intern", "Associate"]} } , {"name" : { $ne: extractData.selectedEmp[index][0] }}] }).limit(2);
                        let finalArray = Array.from(new Set([...empdata1.flat(), ...empdata]));
                        appendedEmpData.push(finalArray);
                        const empAvg = await employees.find({ $and: [{ "skills": extractData.skills[index].skill }, { "Availability": { $gte: element } }, { "designation": {$nin : ["Lead", "Technical Lead", "Assistant Manager", "Assistant Technical Lead"]} }, {"name" : { $ne: extractData.selectedEmp[index][0] }}] }).limit(2);
                        let finalArrayAvg = Array.from(new Set([...empdata1.flat(), ...empAvg]));
                        appendedEmpDataAVG.push(finalArrayAvg);
                        const empCost = await employees.find({ $and: [{ "skills": extractData.skills[index].skill }, { "Availability": { $gte: element } }, {"name" : { $ne: extractData.selectedEmp[index][0] }}] }).sort({ 'hourRate': 1 }).limit(2);
                        let finalArrayCost = Array.from(new Set([...empdata1.flat(), ...empCost]))
                        appendedEmpDataCost.push(finalArrayCost);
                    }else{
                        const empdata = await employees.find({ $and: [{ "skills": extractData.skills[index].skill }, { "Availability": { $gte: element / 2 } }, { "designation": {$nin : ["Intern", "Associate"]} }] }).limit(2);
                        const empAvg = await employees.find({ $and: [{ "skills": extractData.skills[index].skill }, { "Availability": { $gte: element } }, { "designation": {$nin : ["Lead", "Technical Lead", "Assistant Manager", "Assistant Technical Lead"]} }] }).limit(2);
                        const empCost = await employees.find({ $and: [{ "skills": extractData.skills[index].skill }, { "Availability": { $gte: element } }] }).sort({ 'hourRate': 1 }).limit(2);
                        
                        appendedEmpData.push(empdata);
                        appendedEmpDataAVG.push(empAvg);
                        appendedEmpDataCost.push(empCost);
                    }
                }
            }

        } else {
            console.log("🚀🚀🚀 ~ POST ~ extractData:", "no selectedEmp")
            // for best 
            for (let index = 0; index < extractData.skills.length; index++) {
                const element = (extractData.skills[index].percentage / 100) * extractData.manHr;

                const empdata = await employees.find({ $and: [{ "skills": extractData.skills[index].skill }, { "Availability": { $gte: element / 2 } }, { "designation": {$nin : ["Intern", "Associate"]} }] }).limit(2);
                console.log("🚀🚀 ~ POST ~ best empdata:", empdata)
                appendedEmpData.push(empdata);

            
            }

            // for AVG 
            for (let index = 0; index < extractData.skills.length; index++) {
                const element = (extractData.skills[index].percentage / 100) * extractData.manHr;
                if (appendedEmpDataAVG == "") {
                    const empdata = await employees.find({ $and: [{ "skills": extractData.skills[index].skill }, { "Availability": { $gte: element } }, { "designation": {$nin : ["Lead", "Technical Lead", "Assistant Manager", "Assistant Technical Lead"]} }] }).limit(2);
                    appendedEmpDataAVG.push(empdata);
                } else {
                    console.log("🚀 ~ POST ~ appendedEmpDataAVG:", appendedEmpDataAVG)
                    const empdata = await employees.find({ $and: [{ "skills": extractData.skills[index].skill }, { "Availability": { $gte: element } }, { "designation": {$nin : ["Lead", "Technical Lead", "Assistant Manager", "Assistant Technical Lead"]} }, { "name": { $ne: appendedEmpDataAVG[0].name } }] }).limit(2);
                    appendedEmpDataAVG.push(empdata);
                }
            }

            // for Cost 
            for (let index = 0; index < extractData.skills.length; index++) {
                const element = (extractData.skills[index].percentage / 100) * extractData.manHr;
                if (appendedEmpDataCost == "") {
                    const empdata = await employees.find({ $and: [{ "skills": extractData.skills[index].skill }, { "Availability": { $gte: element } }] }).sort({ 'hourRate': 1 }).limit(2);
                    appendedEmpDataCost.push(empdata);
                } else {
                    console.log("🚀 ~ POST ~ appendedEmpDataCost:", appendedEmpDataCost)
                    const empdata = await employees.find({ $and: [{ "skills": extractData.skills[index].skill }, { "Availability": { $gte: element } }, { "name": { $ne: appendedEmpDataCost[0][0].name } }] }).sort({ 'hourRate': 1 }).limit(2);
                    appendedEmpDataCost.push(empdata);
                }
            }
        }

        console.log("🚀🚀 ~ POST ~ appendedEmpData:", appendedEmpData)
        console.log("🚀🚀 ~ POST ~ appendedEmpDataAVG:", appendedEmpDataAVG)
        console.log("🚀🚀 ~ POST ~ appendedEmpDataCost:", appendedEmpDataCost)
        
        return NextResponse.json({
            success: true,
            message: "Created successful!",
            best:appendedEmpData,
            avg:appendedEmpDataAVG,
            cost:appendedEmpDataCost
        });
    } catch (error) {
        console.log("🚀 ~ POST ~ error:", error);
        return NextResponse.json({
            success: false,
            message: "Faild!",
        });
    }


}