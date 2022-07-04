import Joi from "joi";

import { States } from "../../components/Utils";

const Semesters = [
    { title: "Spring", value: "spring" },
    { title: "Fall", value: "fall" }
];

const Visibilities = [
    { title: "Self", value: "self", description: "Only visibie to yourself" },
    { title: "Alumni", value: "alumni", description: "Only visible to other alumni" },
    { title: "Public", value: "all", description: "Visibie to every user" },
];

const Role = {
    Alumni: "alumni",
    Student: "student",
};

const Properties = {
    name: {
        title: "Name",
        attribute: [
            { key: "prefix", type: "text", title: "Prefix", placeholder: "Prefix", role: Role.Alumni },
            { key: "first_name", type: "text", title: "First name", placeholder: "First name", required: true, validator: Joi.string().required() },
            { key: "last_name", type: "text", title: "Last name", placeholder: "Last name", required: true, validator: Joi.string().required() },
        ],
    },
    headline: {
        title: "Headline",
        attribute: { key: "headline", type: "text", maxLength: 100, title: "Headline", placeholder: "Headline" },
    },
    graduate_alumni: {
        title: "Graduate Class",
        role: Role.Alumni,
        attribute: [
            { key: "graduate_semester", type: "dropdown", title: "Semester", placeholder: "Semester", options: Semesters },
            { key: "graduate_year", type: "text", title: "Year", placeholder: "Year", validator: Joi.number().integer().min(1900).max(2099) },
        ]
    },
    graduate_student: {
        title: "Expected Graduate Class",
        role: Role.Student,
        attribute: [
            { key: "graduate_semester", type: "dropdown", title: "Semester", placeholder: "Semester", options: Semesters },
            { key: "graduate_year", type: "text", title: "Year", placeholder: "Year", validator: Joi.number().integer().min(1900).max(2099) },
        ]
    },
    occupation: {
        title: "Occupation",
        role: Role.Alumni,
        attribute: { key: "occupation", type: "text", title: "Occupation", placeholder: "Occupation" },
    },
    location: {
        title: "Location",
        attribute: [
            { key: "city", type: "text", title: "City", placeholder: "City" },
            { key: "state", type: "dropdown", title: "State", placeholder: "State", options: States },
        ],
    },
    role: {
        title: "Role",
        attribute: { key: "role", type: "dropdown", title: "Role", options: [{ title: "Alumni", value: Role.Alumni }, { title: "Student", value: Role.Student }] },
    },
    biography: {
        title: "Biography",
        attribute: { key: "biography", type: "markdown", title: "Biography", placeholder: "Biography" },
    },
    email: {
        title: "Email",
        type: "email",
        visibility: Visibilities,
        attribute: { section: "contact_info", key: "email" },
    },
    phone: {
        title: "Phone",
        type: "phone",
        visibility: Visibilities,
        attribute: { section: "contact_info", key: "phone", validator: Joi.string().regex(/^(\+[0-9]{1,2})?( )?[0-9-() ]{10,}$/) },
    },
};

export { Properties, Semesters, Visibilities, Role };