"use client"

import { AddEmployeeData } from "@/services/employee";
import { useState } from "react";
import Navbar from "../components/navBar";

const skillsData = {
    "Programming Languages": ["Python", "JavaScript", "Java", "C#", "Ruby", "Go", "TypeScript", "Kotlin", "Swift"],
    "Development Frameworks and Libraries": ["React", "Angular", "Vue.js", "Node.js", "Express.js", "Django", "Spring Boot", "Flask"],
    "Cloud Platforms and Services": ["AWS", "Azure", "Google Cloud Platform", "Heroku", "DigitalOcean", "Firebase", "IBM Cloud"],
    "Continuous Integration/Continuous Deployment (CI/CD) Tools": ["Jenkins", "Travis CI", "CircleCI", "GitLab CI", "GitHub Actions", "Bamboo", "TeamCity"],
    "Testing Tools": ["Jest", "Mocha", "Selenium", "Cypress", "JUnit", "TestNG", "Pytest", "RSpec"],
    "Security Tools": ["OWASP ZAP", "Nmap", "Wireshark", "Burp Suite", "Metasploit", "Snort", "Acunetix", "Qualys"]
};


export default function AddEmployee() {
    const [formdata, setFormdata] = useState({
        name: "",
        role: "",
        skills: [],
        hourRate: "",
        designation: ""
    });

    const handleSkillChange = (skill) => {
        const updatedSkills = formdata.skills.includes(skill)
            ? formdata.skills.filter(s => s !== skill)
            : [...formdata.skills, skill];

        setFormdata({
            ...formdata,
            skills: updatedSkills
        });
    };

    // const handleSkillChange = (skill) => {
    //     const updatedSkills = formdata.skills.includes(skill)
    //         ? formdata.skills.filter(s => s !== skill)
    //         : [...formdata.skills, skill];

    //     setFormdata({
    //         ...formdata,
    //         skills: updatedSkills
    //     });
    // };

    async function handelEmpAdd() {
        console.log("🚀 ~ AddEmployee ~ formdata:", formdata)
        const res = await AddEmployeeData(formdata)
        setshowDialog(true)
        console.log("🚀 ~ handelEmpAdd ~ res:", res)
    }

    const [showCategories, setShowCategories] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleCategoryToggle = (category) => {
        if (selectedCategory === category) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(category);
        }
    };

    const handleCategorySelect = (category) => {
        setShowCategories(false);
        setSelectedCategory(category);
    };

    const handleSkillSelect = (skill) => {
        handleSkillChange(skill);
        // setShowCategories(false);
    };

    const toggleCategory = (category) => {
        if (expandedCategory === category) {
            setExpandedCategory(null);
        } else {
            setExpandedCategory(category);
        }
    };

    const [showDialog,setshowDialog] = useState(false)

    async function closeMsg(){
        // setshowDialog(false)
        window.location.reload();
    }

    return (
        <main className="bg-b1 ">
            <Navbar />
            <div className="flex min-h-screen flex-col items-center justify-center gap-2 p-24 bg-b1 ">
                <div className="bg-b2 flex flex-col gap-4 p-5 rounded shadow-2xl">
                    <div className="flex flex-row gap-2 p-2">
                        <div className="flex flex-col gap-2 p-2">
                            <span className="text-o1 font-bold">Employee Name</span>
                            <input className="bg-b3 p-2 rounded" onChange={(event) => {
                                setFormdata({
                                    ...formdata,
                                    name: event.target.value,
                                });

                            }} />
                        </div>
                        <div className="flex flex-col gap-2 p-2">
                            <span className="text-o1 font-bold">Employee Designations</span>
                            <select
                                className="bg-b3 p-2 rounded"
                                value={formdata.designation}
                                name="role"
                                onChange={
                                    (event) => {
                                        setFormdata({
                                            ...formdata,
                                            designation: event.target.value,
                                        });
                                    }
                                }
                                required
                            >
                                <option value="">Select Designation</option>
                                {/* Replace this array with your actual list of skills */}
                                {["Intern", "Associate", "Senior", "Lead", "Technical Lead", "Assistant Manager", "Assistant Technical Lead"].map((skillName) => (
                                    <option key={skillName} value={skillName}>
                                        {skillName}
                                    </option>
                                ))}
                            </select>
                            {/* <input className="bg-b3 p-2 rounded" onChange={(event) => {
                                setFormdata({
                                    ...formdata,
                                    role: event.target.value,
                                });

                            }} /> */}
                        </div>

                        <div className="flex flex-col gap-2 p-2">
                            <span className="text-o1 font-bold">Employee Hour Rate (Rs)</span>
                            <input className="bg-b3 p-2 rounded" onChange={(event) => {
                                setFormdata({
                                    ...formdata,
                                    hourRate: event.target.value,
                                });

                            }} />

                        </div>

                    </div>
                    
                    <div className="flex flex-row gap-2 p-2">
                        <div className="flex flex-col gap-2 w-1/3 p-2">
                            <span className="text-o1 font-bold">Select Skills</span>
                            <div className="relative">
                                <button className="bg-b3 p-2 rounded"
                                    onClick={() => setShowCategories(!showCategories)}>

                                    Select skills
                                </button>
                                {/* <input
                                className="bg-b3 p-2 rounded"
                                placeholder="Select skills"
                                onClick={() => setShowCategories(!showCategories)}
                                readOnly
                            /> */}
                                {showCategories && (
                                    <div className=" top-full left-0 bg-b2 rounded shadow-md w-full z-10">
                                        {Object.entries(skillsData).map(([category, skills]) => (
                                            <div key={category} className="border-t border-gray-300">
                                                <div
                                                    className="flex items-center justify-between cursor-pointer px-4 py-2"
                                                    onClick={() => handleCategoryToggle(category)}
                                                >
                                                    <span className="text-o1 font-bold">{category}</span>
                                                    {/* <svg
                                                    className="h-5 w-5 transform transition-transform"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    style={{ transform: selectedCategory === category ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                                > */}
                                                    <svg
                                                        className="h-5 w-5 transform transition-transform"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        style={{ transform: category === selectedCategory ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                                    ></svg>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                    {/* </svg> */}
                                                </div>
                                                {selectedCategory === category && (
                                                    <div className="ml-4">
                                                        {skills.map((skillName) => (
                                                            <label key={skillName} className="flex items-center gap-2">
                                                                <input
                                                                    className="bg-o1 rounded"
                                                                    type="checkbox"
                                                                    value={skillName}
                                                                    checked={formdata.skills.includes(skillName)}
                                                                    onChange={() => handleSkillSelect(skillName)}
                                                                />
                                                                <span>{skillName}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 p-2">
                            <span className="text-o1 font-bold">Employee Role</span>
                            <select
                                className="bg-b3 p-2 rounded"
                                value={formdata.role}
                                name="role"
                                onChange={
                                    (event) => {
                                        setFormdata({
                                            ...formdata,
                                            role: event.target.value,
                                        });
                                    }
                                }
                                required
                            >
                                <option value="">Select Role</option>
                                {/* Replace this array with your actual list of skills */}
                                {["Software Developer",
                                    "Business Analyst",
                                    "UI Designer",
                                    "DevOps Engineer",
                                    "Quality Assurance",
                                    "Software Architect",
                                    "Quality engineer"
                                ].map((skillName) => (
                                    <option key={skillName} value={skillName}>
                                        {skillName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button onClick={handelEmpAdd} className="bg-o1 font-bold text-b1">Add Employee</button>
                </div>
                {
                    showDialog &&
                    <div class="rounded fixed top-0 left-0 flex items-center justify-center w-full h-full z-10"
                        onClick={closeMsg}
                        style={{ backgroundColor: 'rgba(0,0,0,.5)' }}
                        x-show="open">
                        <div class=" h-auto p-4 mx-2 text-left bg-b2 rounded-3xl shadow-xl dark:bg-b2 md:max-w-xl md:p-6 lg:p-8 md:mx-0"
                        >
                            <div class="flex justify-center mb-4">
                                <button
                                    onClick={closeMsg}
                                    class=" dark:text-o1 dark:hover:text-o1 hover:text-o1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 fill-myOrange">
                                        <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                                    </svg>
                                </button>
                            </div>
                            <div class="mb-4 text-center">
                                <h2 class="text-2xl font-bold leading-snug text-o1 dark:text-gray-400">
                                    Employee  was Added
                                </h2>
                            </div>
                        </div>
                    </div >
                }
            </div>
        </main>
    );
}