import React from "react";

// TODO: Replace the profile pictures with actual pictures 

// chair profiles
const chair = [
    {
        name: "Bill Neilson",
        role: "Baylor Bridges Chair",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Sher Isada",
        role: "Student Relations Chair",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    // More people...
];

// mentorship profiles
const mentorship = [
    {
        name: "Rebecca Mulley",
        role: "Student Team Leader",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Will Chan",
        role: "Student Team Leader",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Daniel Thomas",
        role: "Student Team Leader",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Krupa George",
        role: "Student Team Leader",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Austin Childress",
        role: "Student Team Leader",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Kayla Murphy",
        role: "Student Team Leader",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "I graduated from Baylor in 2018 with a major in Biology and minor in Chemistry. I loved my time at Baylor and being a part of the pre-health community, especially MSO. Now I am a fourth year medical student at the University of Minnesota applying to psychiatry and combined medicine/psychiatry residency programs. I am interested in older adult mental health, developing models of care to better integrate mental health and medical care, quality improvement work, and medical education. Mentorship was a huge part of my pre-med and now medical training and I look forward to meeting some of you through Baylor Bridges! ",
        linkedinUrl: "#",
    },
    {
        name: "Daniel Hendrick",
        role: "Student Team Leader",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Nathan Rogers",
        role: "Student Team Leader",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "BA from BU '12, med school at UTH followed by orthopedic surgery residency, fellowship in adult reconstruction (joints) at Cleveland Clinic, plan to return to Houston as an attending. ",
        linkedinUrl: "#",
    },
    {
        name: "Samantha Allen",
        role: "Student Team Leader",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Orhue Odaro",
        role: "Student Team Leader",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Shreya Goyal",
        role: "Student Team Leader",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    // More people...
];

// leadership profiles
const leadership = [
    {
        name: "Arav Wijesinghe",
        role: "Student Team Leader",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Sarah Green",
        role: "Student Team Leader",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Carolyn Carper",
        role: "Team member",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Ryan Keller",
        role: "Team member",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Cassidy Parchall",
        role: "Team member",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "William McCunniff",
        role: "Team member",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "After graduating from Baylor in 2007 with a degree in Business Administration, I attended TTUHSC School of Medicine in Lubbock where I completed a combination MD/MBA program.  My love of every single specialty led me to Family Medicine where I attended the Waco Family Medicine Residency Program.  I currently practice at the Baylor Scott and White Hillcrest Midway Clinic and love the family life with a wonderful wife and 3 young children.",
        linkedinUrl: "#",
    },
    {
        name: "Kevin Shah",
        role: "Team member",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Alan Keister",
        role: "Team member",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Alejandra Perez",
        role: "Team member",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Theresa Aguilar",
        role: "Team member",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Meha Fox",
        role: "Team member",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    // More people...
];

// research profiles
const research = [
    {
        name: "Alex Crego",
        role: "Student Team Leader",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Greg Hoy",
        role: "Team member",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Corbin Goerlich",
        role: "Team member",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Corbin Goerlich is a general surgery resident at the Johns Hopkins Hospital and a postdoctoral fellow in the Cardiac Xenotransplantation lab of Muhammad Mohiuddin, MD, and Bartley Griffith, MD, at the University of Maryland School of Medicine (Baltimore, MD). He is completing a PhD in immunology with a thesis titled, “The Clinical Translation of Life-supporting Cardiac Xenografts From Genetically Engineered Pigs for Human Transplantation.” He is part of the team that performed the first Genetically Engineered Pig-to-Human Cardiac Xenotransplantation. He is applying to Cardiothoracic Surgery fellowship in 2022. Prior to this, Goerlich graduated from Baylor University (Waco, TX), with a BBA and received his MD from McGovern Medical School (Houston, TX).",
        linkedinUrl: "#",
    },
    {
        name: "Huongi Nguyen",
        role: "Team member",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Sam Han",
        role: "Team member",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Taylor Kohn",
        role: "Team member",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    // More people...
];

// tech team profiles
const TechTeam = [
    {
        name: "Cloudy (Yunfan) Yang",
        role: "Front-End Leader",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Tina (Xiayan) Li",
        role: "Back-End Leader",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    {
        name: "Joseph (Yang-En) Yu",
        role: "Database Leader",
        imageUrl:
            "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
        bio:
            "Bio goes here...",
        linkedinUrl: "#",
    },
    // More people...
];

const About = () => {
    return (
        <div className="bg-white">
            {/* this is the chair section*/}
            <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
                <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
                    <div className="space-y-5 sm:space-y-4">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Chairs</h2>
                        {/* this is the left side descriptions */}
                        <p className="text-xl text-gray-500">
                            To ensure the success of Baylor Bridges, an Alumni Board will be established to direct and govern its program goals, engagement, and outreach.
                        </p>
                    </div>
                    {/* these are the right side profile cards */}
                    <div className="lg:col-span-2">
                        <ul
                            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8"
                        >
                            {chair.map((person) => (
                                <li key={person.name}>
                                    <div className="space-y-4">
                                        <div className="aspect-w-3 aspect-h-2">
                                            <img className="object-cover shadow-lg rounded-lg" src={person.imageUrl} alt="" />
                                        </div>
                                        <div className="text-lg leading-6 font-medium space-y-1">
                                            <h3>{person.name}</h3>
                                            <p className="text-indigo-600">{person.role}</p>
                                        </div>
                                        <div className="text-lg">
                                            <p className="text-gray-500">{person.bio}</p>
                                        </div>

                                        <ul className="flex space-x-5">
                                            <li>
                                                <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-500">
                                                    <span className="sr-only">LinkedIn</span>
                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {/* this is the mentorship section*/}
            <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
                <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
                    <div className="space-y-5 sm:space-y-4">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Mentorship Pillar</h2>
                        <p className="text-xl text-gray-500">
                            Baylor Bridges will allow meaningful engagement between healthcare alumni and prehealth undergraduates through intentional programs that facilitate professional, personal and spiritual mentorship.
                        </p>
                    </div>
                    <div className="lg:col-span-2">
                        <ul
                            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8"
                        >
                            {mentorship.map((person) => (
                                <li key={person.name}>
                                    <div className="space-y-4">
                                        <div className="aspect-w-3 aspect-h-2">
                                            <img className="object-cover shadow-lg rounded-lg" src={person.imageUrl} alt="" />
                                        </div>
                                        <div className="text-lg leading-6 font-medium space-y-1">
                                            <h3>{person.name}</h3>
                                            <p className="text-indigo-600">{person.role}</p>
                                        </div>
                                        <div className="text-lg">
                                            <p className="text-gray-500">{person.bio}</p>
                                        </div>

                                        <ul className="flex space-x-5">
                                            <li>
                                                <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-500">
                                                    <span className="sr-only">LinkedIn</span>
                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {/* this is the leadership section*/}
            <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
                <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
                    <div className="space-y-5 sm:space-y-4">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Leadership Pillar</h2>
                        <p className="text-xl text-gray-500">
                            Baylor Bridges will address many issues of the global healthcare system by preparing talented and conscientious students for a career in medical leadership and service. By developing its partnerships, Baylor Bridges will enhance educational.
                        </p>
                    </div>
                    <div className="lg:col-span-2">
                        <ul
                            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8"
                        >
                            {leadership.map((person) => (
                                <li key={person.name}>
                                    <div className="space-y-4">
                                        <div className="aspect-w-3 aspect-h-2">
                                            <img className="object-cover shadow-lg rounded-lg" src={person.imageUrl} alt="" />
                                        </div>
                                        <div className="text-lg leading-6 font-medium space-y-1">
                                            <h3>{person.name}</h3>
                                            <p className="text-indigo-600">{person.role}</p>
                                        </div>
                                        <div className="text-lg">
                                            <p className="text-gray-500">{person.bio}</p>
                                        </div>

                                        <ul className="flex space-x-5">
                                            <li>
                                                <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-500">
                                                    <span className="sr-only">LinkedIn</span>
                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {/* this is the research section*/}
            <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
                <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
                    <div className="space-y-5 sm:space-y-4">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Research  Pillar</h2>
                        <p className="text-xl text-gray-500">
                            Baylor Bridges will allow meaningful engagement between healthcare alumni and prehealth undergraduates through intentional programs that facilitate professional, personal and spiritual mentorship.
                        </p>
                    </div>
                    <div className="lg:col-span-2">
                        <ul
                            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8"
                        >
                            {research.map((person) => (
                                <li key={person.name}>
                                    <div className="space-y-4">
                                        <div className="aspect-w-3 aspect-h-2">
                                            <img className="object-cover shadow-lg rounded-lg" src={person.imageUrl} alt="" />
                                        </div>
                                        <div className="text-lg leading-6 font-medium space-y-1">
                                            <h3>{person.name}</h3>
                                            <p className="text-indigo-600">{person.role}</p>
                                        </div>
                                        <div className="text-lg">
                                            <p className="text-gray-500">{person.bio}</p>
                                        </div>

                                        <ul className="flex space-x-5">
                                            <li>
                                                <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-500">
                                                    <span className="sr-only">LinkedIn</span>
                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {/* this is the tech team section*/}
            <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
                <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
                    <div className="space-y-5 sm:space-y-4">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Baylor Bridges Tech Team</h2>
                        <p className="text-xl text-gray-500">
                            Development and Maintenance Team for the Baylor Bridges Web Application and Database.
                        </p>
                    </div>
                    <div className="lg:col-span-2">
                        <ul
                            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8"
                        >
                            {TechTeam.map((person) => (
                                <li key={person.name}>
                                    <div className="space-y-4">
                                        <div className="aspect-w-3 aspect-h-2">
                                            <img className="object-cover shadow-lg rounded-lg" src={person.imageUrl} alt="" />
                                        </div>
                                        <div className="text-lg leading-6 font-medium space-y-1">
                                            <h3>{person.name}</h3>
                                            <p className="text-indigo-600">{person.role}</p>
                                        </div>
                                        <div className="text-lg">
                                            <p className="text-gray-500">{person.bio}</p>
                                        </div>

                                        <ul className="flex space-x-5">
                                            <li>
                                                <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-500">
                                                    <span className="sr-only">LinkedIn</span>
                                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;