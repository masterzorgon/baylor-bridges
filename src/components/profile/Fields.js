import { default as Joi_ } from "joi";
import JoiPhoneNumber from "joi-phone-number";

import { States } from "../../components/Utils";

const Joi = Joi_.extend(JoiPhoneNumber);

const Semesters = [
    { title: "Spring", value: "spring" },
    { title: "Fall", value: "fall" }
];

const Visibilities = [
    { title: "Self", value: "self", description: "Only visible to yourself" },
    { title: "Alumni", value: "alumni", description: "Only visible to other alumni" },
    { title: "Public", value: "all", description: "Visible to every user" },
];

const Role = {
    Alumni: "alumni",
    Student: "student",
};

const Properties = {
    name: {
        title: "Name",
        attributes: [
            { key: "prefix", path: "$.prefix", type: "text", title: "Prefix", placeholder: "Prefix", role: Role.Alumni },
            { key: "first_name", path: "$.first_name", type: "text", title: "First name", placeholder: "First name", required: true, validator: Joi.string().required() },
            { key: "last_name", path: "$.last_name", type: "text", title: "Last name", placeholder: "Last name", required: true, validator: Joi.string().required() },
        ],
    },
    headline: {
        title: "Headline",
        attributes: { key: "headline", path: "$.headline", type: "text", maxLength: 100, title: "Headline", placeholder: "Headline" },
    },
    graduate_alumni: {
        title: "Graduate Class",
        role: Role.Alumni,
        attributes: [
            { key: "graduate_semester", path: "$.graduate_semester", type: "radio", title: "Semester", placeholder: "Semester", options: Semesters },
            { key: "graduate_year", path: "$.graduate_year", type: "text", title: "Year", placeholder: "Year", validator: Joi.number().integer().min(1900).max(2099) },
        ]
    },
    graduate_student: {
        title: "Expected Graduate Class",
        role: Role.Student,
        attributes: [
            { key: "graduate_semester", path: "$.graduate_semester", type: "radio", title: "Semester", placeholder: "Semester", options: Semesters },
            { key: "graduate_year", path: "$.graduate_year", type: "text", title: "Year", placeholder: "Year", validator: Joi.number().integer().min(1900).max(2099) },
        ]
    },
    occupation: {
        title: "Occupation",
        role: Role.Alumni,
        attributes: { key: "occupation", path: "$.occupation", type: "text", title: "Occupation", placeholder: "Occupation" },
    },
    location: {
        title: "Location",
        attributes: [
            { key: "city", path: "$.city", type: "text", title: "City", placeholder: "City" },
            { key: "state", path: "$.state", type: "radio", title: "State", placeholder: "State", options: States },
        ],
    },
    role: {
        title: "Role",
        attributes: {
            key: "role", path: "$.role", type: "radio", title: "Role",
            options: [{ title: "Alumni", value: Role.Alumni }, { title: "Student", value: Role.Student }]
        },
    },
    biography: {
        title: "Biography",
        attributes: { key: "biography", path: "$.biography", type: "markdown", title: "Biography", placeholder: "Biography" },
    },
    email: {
        title: "Email",
        attributes: {
            section: "contact_info", key: "email", path: "$.contact_info.email", type: "text", title: "Email", placeholder: "Email",
            validator: Joi.string().email({ tlds: { allow: false } }),
            visibility: Visibilities,
        },
    },
    phone: {
        title: "Phone",
        attributes: {
            section: "contact_info", key: "phone", path: "$.contact_info.phone", type: "text", title: "Phone", placeholder: "Phone",
            validator: Joi.string().phoneNumber({ defaultCountry: "US", strict: true }),
            visibility: Visibilities,
        },
    },
};

Object.entries(Properties).forEach(([key, property]) => {
    if (!Array.isArray(property.attributes)) {
        property.attributes = [property.attributes];
    }

    property.attributes.forEach(attribute => {
        if (attribute.visibility) {
            property.attributes.push({
                ...attribute,
                options: attribute.visibility,
                type: "visibility",
                key: `${attribute.key}_visibility`,
                placeholder: Visibilities[0].value,
                title: "Visibility",
                description: "Who can see this information",
                validator: Joi.string().valid(...attribute.visibility.map(visibility => visibility.value)),
            });
        }
    });
});

export { Properties, Semesters, Visibilities, Role };