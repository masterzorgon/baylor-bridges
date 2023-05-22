import React from "react";

// import { HyperLink } from "../components/Button";

const stats = [
    { label: "Lost to invoice fraud annually", value: "$2.4 Billion" },
    { label: "Lost per business on average", value: "$300,000" },
    { label: "Businesses victimized to invoice fraud annually", value: "62%" },
];

const values = [
    {
        name: "Integrity",
        description:
            "We uphold the highest standards of honesty, transparency, and ethical conduct. We prioritize integrity in all our interactions and ensure the integrity of our solutions to build trust with our clients.",
    },
    {
        name: "Innovation",
        description:
            "We are driven by a passion for innovation and continuously strive to develop cutting-edge solutions to combat invoice fraud. We embrace new technologies, explore creative ideas, and adapt to evolving market needs.",
    },
    {
        name: "Empowerment",
        description:
            "We empower our clients with the knowledge, tools, and resources they need to combat invoice fraud effectively. We provide educational materials, training programs, and ongoing support to enable our clients to make informed decisions and take proactive measures.",
    },
    {
        name: "Continuous Improvement",
        description:
            "We foster a culture of continuous improvement and learning. We encourage our team members to enhance their skills, stay updated with industry trends, and embrace a growth mindset. We continuously iterate and refine our solutions to deliver the best results.",
    },
];

const team = [
    {
        name: "Nathan Galindo",
        role: "Co-Founder / CEO",
        imageUrl:
            "data:image/jpeg;base64,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",
    },
    {
        name: "Cade Ross",
        role: "Co-Founder / CPO",
        imageUrl:
            "data:image/jpeg;base64,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",
    },
    {
        name: "Jack Reymond",
        role: "Co-Founder / CFO",
        imageUrl:
            "https://compote.slate.com/images/46d8cbe9-dd09-4a4b-be7b-1970e45a5220.jpeg?width=780&height=520&rect=3840x2560&offset=0x0",
    },
    // More people...
];

const About = () => {
    return (
        <div className="bg-white">
            <main className="isolate">
                {/* Hero section */}
                <div className="relative isolate -z-10">
                    <svg
                        className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                        aria-hidden="true"
                    >
                        <defs>
                            <pattern
                                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                                width={200}
                                height={200}
                                x="50%"
                                y={-1}
                                patternUnits="userSpaceOnUse"
                            >
                                <path d="M.5 200V.5H200" fill="none" />
                            </pattern>
                        </defs>
                        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                            <path
                                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                                strokeWidth={0}
                            />
                        </svg>
                        <rect width="100%" height="100%" strokeWidth={0} fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
                    </svg>
                    <div
                        className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                            style={{
                                clipPath:
                                    "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
                            }}
                        />
                    </div>
                    <div className="overflow-hidden">
                        <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
                            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                        We’re changing the way businesses transact.
                                    </h1>
                                    <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                                        Vlyss is an invoice management platform that allows companies to connect and transact with each other, all the while
                                        documenting the transaction history between companies on the blockchain.
                                    </p>
                                </div>
                                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                                    <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                        <div className="relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                    </div>
                                    <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                        <div className="relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                        <div className="relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                    </div>
                                    <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                                        <div className="relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                        <div className="relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content section */}
                <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our mission</h2>
                        <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                                <p className="text-xl leading-8 text-gray-600">
                                    Make the global financial supply chain more transparent.
                                </p>
                                <div className="mt-10 max-w-xl text-base leading-7 text-gray-700">
                                    <p>
                                        Invoice fraud is one of the most pernicious and costly threats to businesses
                                        of all sizes, globally. Vlyss is tackling this threat by authenticating the paper
                                        trails between transacting parties, and linking identities to the blockchain for
                                        immutable reference.
                                    </p>
                                    <p className="mt-10">
                                        Vlyss&apos;s blockchain-enhanced invoicing solution is designed to scale globally, and in so doing,
                                        Vlyss hopes to make the world&apos;s financial supply chain a more transparent and trustworthy place.
                                    </p>
                                </div>
                            </div>
                            <div className="lg:flex lg:flex-auto lg:justify-center">
                                <dl className="w-64 space-y-8 xl:w-80">
                                    {stats.map((stat) => (
                                        <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                                            <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
                                            <dd className="text-5xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image section */}
                <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
                    <img
                        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                        alt=""
                        className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
                    />
                </div>

                {/* Values section */}
                <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our values</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            These are the principles that drive and inspire us to do what we do.
                        </p>
                    </div>
                    <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {values.map((value) => (
                            <div key={value.name}>
                                <dt className="font-semibold text-gray-900">{value.name}</dt>
                                <dd className="mt-1 text-gray-600">{value.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* Logo cloud */}
                <div className="relative isolate -z-10 mt-32 sm:mt-48">
                    <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
                        <svg className="h-[40rem] w-[80rem] flex-none stroke-gray-200" aria-hidden="true">
                            <defs>
                                <pattern
                                    id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                                    width={200}
                                    height={200}
                                    x="50%"
                                    y="50%"
                                    patternUnits="userSpaceOnUse"
                                    patternTransform="translate(-100 0)"
                                >
                                    <path d="M.5 200V.5H200" fill="none" />
                                </pattern>
                            </defs>
                            <svg x="50%" y="50%" className="overflow-visible fill-gray-50">
                                <path d="M-300 0h201v201h-201Z M300 200h201v201h-201Z" strokeWidth={0} />
                            </svg>
                            <rect width="100%" height="100%" strokeWidth={0} fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)" />
                        </svg>
                    </div>
                </div>

                {/* Team section */}
                <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our team</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Meet the people who make Vlyss possible.
                        </p>
                    </div>
                    <ul
                        role="list"
                        className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
                    >
                        {team.map((person) => (
                            <li key={person.name}>
                                <img className="object-cover w-16 h-16 mx-auto rounded-full lg:w-20 lg:h-20" src={person.imageUrl} alt="" />
                                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                <p className="text-sm leading-6 text-gray-600">{person.role}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

// // tech team profiles
// const tech = {
//     title: "Technology Directors",
//     description: "Development and Maintenance Team for the Baylor Bridges Web Application.",
//     people: [
//         {
//             name: "Yunfan Yang (Cloudy Young)",
//             role: ["Front-End Lead", "Back-end Developer"],
//             imageUrl:
//                 "data:image/jpeg;base64,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",
//             linkedinUrl: "https://www.linkedin.com/in/yunfan-yang-cy/",
//         },
//         {
//             name: "Nathan Galindo",
//             role: "Front-end Developer",
//             imageUrl:
//                 "data:image/jpeg;base64,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",
//             linkedinUrl: "https://www.linkedin.com/in/nathanzebedee/",
//         },
//         {
//             name: "Xiayan Li (Tina)",
//             role: ["Back-end Lead", "Front-end Developer"],
//             imageUrl:
//                 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm2kXPZYElBjWmCyDrB3VaWhnRKKrsVcyc3Q&usqp=CAU",
//             linkedinUrl: "https://www.linkedin.com/in/xiayan-li-92b448192/",
//         },
//         // {
//         //     name: "Joseph (Yang-En) Yu",
//         //     role: "Database Lead",
//         //     imageUrl:
//         //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8vG6oOaY1JO4s1lT3L7rqMOM7__8thZzpDQ&usqp=CAU",
//         //     linkedinUrl: "#",
//         // },
//         {
//             name: "Yanbo Liu (Ned)",
//             role: "Front-end Developer",
//             imageUrl:
//                 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8vG6oOaY1JO4s1lT3L7rqMOM7__8thZzpDQ&usqp=CAU",
//             linkedinUrl: "#",
//         },
//         {
//             name: "Benjamin Li",
//             role: ["Bug Developer", "Tina's Cat"],
//             imageUrl: "Banjamin.jpg"
//         },
//         {
//             name: "Daniela Cortes Bermudez",
//             role: "Back-end / Database Developer",
//             imageUrl: "https://compote.slate.com/images/46d8cbe9-dd09-4a4b-be7b-1970e45a5220.jpeg?width=780&height=520&rect=3840x2560&offset=0x0",

//         },
//         // More people...
//     ]
// };

// const About = () => {
//     const defaultBg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQoAAAC+CAMAAAD6ObEsAAAAilBMVEX///8SRzQAPyj2+PcAQi1beW0ANx7H0M0NRTEfUkAAPCVnfnTr8O4AQi51iYH7/f2aq6RMbWAAMBOElo5UdGfd5OEAOSHP1dKhr6kANBkwWUmxvrmMnpbc5OGXqaIAMBIAIgAYTTo/ZVe+ycTL1NEARzIAHwAAFAAAGgA8YVN5jITl6uiotrF+k4ux2DaVAAAESUlEQVR4nO3dbXuaMBiG4YJIA4oKq1a0tfWl25T1//+9UV8eEyQgSE0T7vOj49gRrlIrhODDAwAAAAAAAAAAAAAAAAAAAAAAAMAPN+xUNlQ95m8yiu2KnOWsO+2rHvc3mPpWVYwFE3+keuDNq5Fizw07qofetLopLNszrUXtFFZgWov6KYxrcUMKyzGrxS0pDGtxUwormBn0eeu2FJbdVb0DzbkxhRXPVe9BY6auk2KH/WJOuUBMwTzVe9CY+VM3Fe5bsFWvW85m4mExVr0LzXp297vlvVxxmjV2hBYTc35D9h7d47ug23su3TgRjgt/cYfx3dEpRfpRIV6Vxkj448J+uccA7+ecIj3nLP8xryftSHHFpYjXmEvx6w7ju6OKKcZIcYIUBCkIUhCkIEhBRtzpbLs/V6y5g6LdKdYRV8Lgc5D9vg2LzPljIj0zXasefLP4FJa1LGJNhBKWa9j0qZiCFRJLBKHqsTdMTFFFVH59Qy+1U1xxRq+ZuikmPdUjb1zNFLZ5JeqmcFSP+xvUTBFsDZonPKr7XmFvVY+8cbX/gvjGvVvU/1wRG/a5W0zBgiKZT5tspnrsDeNTsFlYZJU5gEybMxXOTKfF227ehBSmzpnuU5RdrxBbGH29ovQq1gZXscgcc6Yn7ZozTT68PB/799TLi/99O3/zfyr3qpacFG7uJayJLEVUsLlWclJkLmGe/lGWIi7YXCtIQZCCIAVBCoIUBCkIUhCkIEhBLlOMf0cpYcVDnL7wvr86cZki+fO1uXN4KXCjo3f9VubKzky7XIvo/LLsXqzeocU16wd+LFmKJz7FefrnUXK94pjCfuvqO78uSxFGLvlLqwf7sjv/jynSX5Foq+ukgCzF+Plsc3ox8WXrQShFGuNN09+STYUr3mNfXCXEXZ3hUli2dinWg9SOf3tk4W4gt+u64qSQy82D6J1iGl8sEyxeV5hdUbjk/jPNUzS5zrTVKewn/j9rcwrHE+41aXGK7BMs2pvi4lkerU1x+fSKtqbIeY5HS1PkPQGpnSkmq5xnu7QvBXP8OPdWAr1TjCJfTnxUhW0fXgxYuMjfT71TdPoFOiF3xhEnx1fld/DqnaKY5CqWDFIQpCBIQZCCIAVBCoIUBCkIUhCkIEhBkIIgBUEKghQEKQhSEKQgvcDgFNyP2X0t3XzGzE0h3I3jle3cjp9IcAxLMbC5nQuWxXu3Exa2WyZ9HUBqIUwYBSwp2PZTfKCUacv21+JafGaH0iedb8VpNmegeuwNG2anEQPp7WqZhzm4ut7CKvWSvwCglGPek18evKB8v3PE5X95tdNndVoY9FUZnOSjeotYv6XoV0kqHxemlqj+O2Juia8WTnmAVpRIW1jXHxdml0hbzK68ZSsw82+H4DP2g+zDaLOY4870XTR2vfEinFnF3/nq9cw/JE5KvglY9fAAAAAAAAAAAAAAAAAAAAAAAAAA6vgPHIxi4MevoYwAAAAASUVORK5CYII=";

//     const getSection = (section) => {
//         return (
//             <div className="mx-auto py-6 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-7">
//                 <div className="space-y-5 lg:grid lg:grid-cols-3 lg:gap-10 lg:space-y-0">
//                     <div className="space-y-5 sm:space-y-2">
//                         <h2 className="text-3xl font-extrabold tracking-tight sm:text-2xl">{section.title}</h2>
//                         <p className="text-gray-500">
//                             {section.description}
//                         </p>
//                     </div>
//                     {/* PROFILE CARDS BELOW */}
//                     <div className="lg:col-span-2">
//                         <ul className="space-y-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 lg:gap-x-6">
//                             {section.people.map((person) => (
//                                 <li key={person.name}>
//                                     <div className="flex items-center space-x-4 lg:space-x-6">
//                                         <img className="object-cover w-16 h-16 rounded-full lg:w-20 lg:h-20" src={person.imageUrl ? person.imageUrl : defaultBg} alt={`${person.name}`} />
//                                         <div className="text-base leading-6">
//                                             <h3 className="font-medium">
//                                                 {person.name}
//                                             </h3>
//                                             <p className="text-emerald-700">
//                                                 {
//                                                     Array.isArray(person.role)
//                                                         ? person.role.map((role) => (
//                                                             <p key={role}>{role}</p>
//                                                         ))
//                                                         : person.role
//                                                 }
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     {/* PROFILE CARDS ABOVE */}
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <>
//             <div className="relative bg-gradient bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 mb-4">
//                 <div className="relative max-w-7xl mx-auto py-20 px-4 sm:py-18 sm:px-6 lg:px-8">
//                     <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
//                         Baylor Bridges Governing Board
//                     </h1>
//                     <p className="mt-3 text-xl text-emerald-100 max-w-3xl">
//                         <HyperLink to={"#"} onClick={() => window.open("https://www.baylor.edu/prehealth/index.php?id=982101", "_blank")} arrow={true} className="text-sm sm:text-lg font-medium text-white hover:text-gray-50 after:bg-white">
//                             View Governing Board List on Baylor University
//                         </HyperLink>
//                     </p>
//                 </div>
//             </div>

//             {getSection(chair)}
//             {getSection(mentorship)}
//             {getSection(leadership)}
//             {getSection(research)}
//             {getSection(tech)}
//         </>
//     );
// };

export default About;