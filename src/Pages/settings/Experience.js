import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Menu, Listbox, Transition, Dialog } from "@headlessui/react";
import { PencilIcon, DotsVerticalIcon, TrashIcon, ExclamationIcon, PlusSmIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from "@heroicons/react/outline";
import { PaperClipIcon } from "@heroicons/react/solid";
import { classNames } from "../../components/Utils";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import isBetween from "dayjs/plugin/isBetween";

import Photo from "../../components/Photo";
import Container from "./Container";
import Button from "../../components/Button";
import Markdown from "../../components/Markdown";

const CREATE = 0;
const UPDATE = 1;
const DELETE = 2;

const EXPERIENCE = 0;
const PUBLICATION = 1;

const PRESENT = "present";

const MonthYearPicker = ({ value: raw_value, min, max, onChange, format, displayFormat, disabled, type, name, id, presentable, nullable, placeholder, highlighted }) => {
    dayjs.extend(isBetween);

    const parseDate = (date, null_fallback, present_fallback) => {
        null_fallback = null_fallback || null;
        present_fallback = present_fallback || PRESENT;
        if (!date) return null_fallback;
        if (date === "present" || date === PRESENT) return present_fallback;
        return dayjs(date, format);
    };


    if (!format) format = "MMM YYYY";
    min = parseDate(min, null, dayjs());
    max = parseDate(max, null, dayjs());
    highlighted = parseDate(highlighted);
    disabled = disabled === true;

    const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let value = parseDate(raw_value); // value will be null, PRESENT or a dayjs() object
    let now = parseDate(raw_value, dayjs(), dayjs());

    const [selectorYear, setSelectorYear] = useState(now.year());
    const [selectorMonth, setSelectorMonth] = useState(now.month());

    const isWithinValidRange = (month, year) => {
        let a = min ? min : dayjs("1980-01-01");
        let b = max ? max : dayjs("2099-01-01");
        let c = dayjs().year(year).month(month);
        return c.isBetween(a, b, "month", "[]");
    };

    const isWithinHighlightedRange = (month, year) => {
        if (!highlighted || !value || highlighted === PRESENT || value === PRESENT) return false;
        let a = value;
        let b = highlighted;
        let c = dayjs().year(year).month(month);
        return c.isBetween(a, b, "month", "[]");
    };

    const resetSelectors = () => {
        setSelectorYear(parseDate(value, now, now).year());
        setSelectorMonth(parseDate(value, now, now).month());
    };

    const onSelectorChange = (selectorMonth, selectorYear) => {
        if (selectorMonth === PRESENT || selectorYear === PRESENT) {
            onChange(PRESENT);
        } else if (selectorMonth === null || selectorYear === null) {
            onChange(null);
        } else {
            onChange(dayjs().month(selectorMonth).year(selectorYear).format(format));
        }
    };

    const parseDisplayText = (value) => {
        if (value === null) return <span className="text-gray-500">{placeholder ? placeholder : "Select"}</span>;
        if (value === PRESENT) return "Present";
        return value.format(displayFormat || format);
    };

    return (
        <div className="mt-1">
            <Listbox as="div" disabled={disabled} className="w-full relative inline-block text-left" value={selectorMonth} onChange={(selectorMonth) => onSelectorChange(selectorMonth, selectorYear)}>
                <Listbox.Button onClick={() => resetSelectors()} className={classNames(disabled && "cursor-not-allowed", "relative inline-flex justify-between items-center mt-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 focus:outline-none focus:ring-1 focus:border focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm")} type={type} name={name} id={id}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    {parseDisplayText(value)}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Listbox.Button>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Listbox.Options className="z-10 origin-top-left absolute left-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-2 px-2">
                            <div className="w-full text-center inline-flex justify-between items-center">
                                <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => setSelectorYear(selectorYear - 1)}>
                                    <ChevronLeftIcon className="h-5 w-5 text-gray-400" />
                                </button>
                                <div className="text-sm w-20">{selectorYear}</div>
                                <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => setSelectorYear(selectorYear + 1)}>
                                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                                </button>
                            </div>
                            <div className="grid grid-cols-4 gap-1 py-2 justify-items-center">
                                {
                                    allMonths.map((m, i) => {
                                        const validRanged = isWithinValidRange(i, selectorYear);
                                        const highlightedRanged = isWithinHighlightedRange(i, selectorYear);
                                        const isCurrentYear = value && value instanceof dayjs && value.year() === selectorYear && value !== PRESENT;
                                        const isCurrentMonth = value && value instanceof dayjs && value.month() === i;
                                        const isSelected = isCurrentYear && isCurrentMonth;
                                        return (
                                            <Listbox.Option
                                                key={m} value={i}
                                                className={
                                                    ({ selected, active }) => classNames(
                                                        "inline-flex justify-center items-center text-sm w-12 h-12 rounded-full text-center cursor-pointer",
                                                        !validRanged && "cursor-not-allowed text-gray-300",
                                                        isSelected && "bg-emerald-600 text-white",
                                                        (highlightedRanged && !isSelected) && "bg-gray-100 text-gray-500",
                                                        (active && !isSelected) && "bg-gray-100"
                                                    )}
                                                disabled={!validRanged}
                                            >
                                                {m.substring(0, 3)}
                                            </Listbox.Option>
                                        );
                                    })
                                }
                            </div>
                            {
                                (presentable || nullable) && (
                                    <div className="border-t flex justify-end pt-1 gap-1">
                                        {
                                            presentable && (
                                                <Listbox.Option key={"present"} value={PRESENT}>
                                                    {({ active }) => (
                                                        <button className="text-sm p-3 rounded-full hover:bg-gray-100 mt-1">Present</button>
                                                    )}
                                                </Listbox.Option>)
                                        }
                                        {
                                            nullable && (
                                                <Listbox.Option key={"null"} value={null}>
                                                    {({ active }) => (
                                                        <button className="text-sm p-3 rounded-full text-red-600 hover:bg-gray-100 mt-1">Clear</button>
                                                    )}
                                                </Listbox.Option>)
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </Listbox.Options>
                </Transition>
            </Listbox>
        </div>
    );
};

const Experience = () => {
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);

    const [open, setOpen] = useState(false);
    const [field, setField] = useState(null);

    const [experiences, setExperiences] = useState(null);

    useEffect(() => {
        // get all experiences of current account
        axios.get("/experiences/me")
            .then(res => {
                setExperiences(res.data);
            })
            .catch(err => toast.error(err.response.data.message));
    }, []);

    useEffect(() => {
        if (!field) return; // field is null

        // Experience & Publication must have title
        if (!field.title || field.title === "") {
            setComplete(false);
            return;
        }

        // Publication must have a link
        if (field._type === PUBLICATION && (!field.duo_link || field.duo_link === "")) {
            setComplete(false);
            return;
        }

        // Check date validity
        let s = field.start_time ? dayjs(field.start_time) : dayjs();
        let e = field.stop_time ? dayjs(field.stop_time) : dayjs();
        if (s.isAfter(e)) {
            setComplete(false);
            return;
        }

        setComplete(true);
    }, [field]);

    const getModal = (field) => {
        if (!field) return;

        const onChange = (value, attribute) => {
            setField({ ...field, [attribute]: value });
        };

        const onCreateExperience = (field) => {
            setLoading(true);
            axios.post("/experiences/me", field)
                .then(res => {
                    experiences.push(res.data);
                    setExperiences(experiences);
                    setOpen(false);
                })
                .catch(err => toast.error(err.response.data.message))
                .finally(() => {
                    setLoading(false);
                });
        };

        const onUpdateExperience = (field) => {
            setLoading(true);


            axios.put(`/experiences/${field.exper_id}`, field)
                .then(res => {
                    experiences[experiences.findIndex(e => e.exper_id === field.exper_id)] = res.data;
                    setExperiences(experiences);
                    setOpen(false);
                })
                .catch(err => toast.error(err.response.data.message))
                .finally(() => {
                    setLoading(false);
                });
        };

        const onDeleteExperience = (field) => {
            setLoading(true);
            axios.delete(`/experiences/${field.exper_id}`)
                .then(res => {
                    setExperiences(experiences.filter(e => e.exper_id !== field.exper_id));
                    setOpen(false);
                })
                .catch(err => toast.error(err.response.data.message))
                .finally(() => setLoading(false));
        };

        const onCreatePublication = (field) => {
            setLoading(true);

            axios.post("/publications/me", field)
                .then(res => {
                    experiences[experiences.findIndex(e => e.exper_id === field.exper_id)].publications.push(res.data);
                    setExperiences(experiences);
                    setOpen(false);
                })
                .catch(err => toast.error(err.response.data.message))
                .finally(() => setLoading(false));
        };

        const onUpdatePublication = (field) => {
            setLoading(true);
            axios.put(`/publications/${field.pub_id}`, field)
                .then(res => {
                    let exper_index = experiences.findIndex(e => e.exper_id === field.exper_id);
                    let pub_index = experiences[exper_index].publications.findIndex(p => p.pub_id === field.pub_id);
                    experiences[exper_index].publications[pub_index] = res.data;

                    setExperiences(experiences);
                    setOpen(false);
                })
                .catch(err => toast.error(err.response.data.message))
                .finally(() => setLoading(false));
        };

        const onDeletePublication = (field) => {
            setLoading(true);
            axios.delete(`/publications/${field.pub_id}`)
                .then(res => {
                    setOpen(false);

                    let exper_index = experiences.findIndex(e => e.exper_id === field.exper_id);
                    let pub_index = experiences[exper_index].publications.findIndex(p => p.pub_id === field.pub_id);

                    experiences[exper_index].publications.pop(pub_index, 1);
                    setExperiences(experiences);
                })
                .catch(err => toast.error(err.response.data.message))
                .finally(() => {
                    setLoading(false);
                });
        };


        const getExperienceDom = (field) => {
            return (
                <div className="p-4 pb-5 sm:align-middle sm:p-6">
                    {/* <div>
                        <h2 id="payment-details-heading" className="text-lg leading-6 font-medium text-gray-900">
                            {field._operation === CREATE && "Add Experience"}
                            {field._operation === UPDATE && "Edit Experience"}
                        </h2>
                    </div> */}

                    <div className="grid grid-cols-4 gap-3">
                        <div className="col-span-4 sm:col-span-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Experience Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                value={field.title || ""}
                                onChange={(e) => onChange(e.target.value, "title")}
                            />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                                Start Date
                            </label>
                            <MonthYearPicker
                                value={field.start_time}
                                max={field.stop_time || dayjs().format("MMM YYYY")}
                                onChange={(value) => setField({ ...field, "start_time": value, "stop_time": value === null ? null : field.stop_time })}
                                id="start-date"
                                name="start-date"
                                nullable={true}
                                placeholder={"Select start"}
                                highlighted={field.stop_time}
                                displayFormat={"MMMM YYYY"}
                            />
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
                                End Date
                            </label>
                            <MonthYearPicker
                                value={field.stop_time}
                                min={field.start_time || dayjs().format("MMM YYYY")}
                                onChange={(value) => onChange(value, "stop_time")}
                                disabled={!field.start_time}
                                id="end-date"
                                name="end-date"
                                nullable={true}
                                presentable={true}
                                placeholder={field.start_time ? "Select end" : "Must select start"}
                                highlighted={field.start_time}
                                displayFormat={"MMMM YYYY"}
                            />
                        </div>

                        <div className="col-span-4 sm:col-span-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                rows={4}
                                name="description"
                                id="description"
                                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 py-2 px-3 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={field.description || ""}
                                onChange={(e) => onChange(e.target.value, "description")}
                            />
                        </div>
                    </div>

                    <Button
                        className="mt-4 text-sm"
                        loading={loading}
                        disabled={!complete || loading}
                        onClick={() => {
                            if (field._operation === CREATE) {
                                onCreateExperience(field);
                            } else if (field._operation === UPDATE) {
                                onUpdateExperience(field);
                            }
                        }}
                    >
                        {field._operation === CREATE && "Create"}
                        {field._operation === UPDATE && "Update"}
                    </Button>
                </div >
            );
        };


        const getPublicationDom = (field) => {
            return (
                <div className="p-4 pb-5 sm:align-middle sm:p-6">

                    <div className="grid grid-cols-8 gap-3">
                        <div className="col-span-8 sm:col-span-3">
                            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                                Publication Title
                            </label>
                            <input
                                type="text"
                                name="expiration-date"
                                id="expiration-date"
                                autoComplete="cc-exp"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                placeholder="Title"
                                onChange={(e) => onChange(e.target.value, "title")}
                                value={field.title || ""}
                            />
                        </div>
                        <div className="col-span-8 sm:col-span-5">
                            <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                                DUO Link
                            </label>
                            <input
                                type="text"
                                name="expiration-date"
                                id="expiration-date"
                                autoComplete="cc-exp"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                onChange={(e) => onChange(e.target.value, "duo_link")}
                                placeholder="Link"
                                value={field.duo_link || ""}
                            />
                        </div>
                    </div>

                    <Button
                        className="mt-4 text-sm"
                        loading={loading}
                        disabled={!complete || loading}
                        onClick={() => {
                            if (field._operation === CREATE) {
                                onCreatePublication(field);
                            } else if (field._operation === UPDATE) {
                                onUpdatePublication(field);
                            }
                        }}
                    >
                        {field._operation === CREATE && "Create"}
                        {field._operation === UPDATE && "Update"}
                    </Button>
                </div>
            );
        };


        const getDeleteDom = (field) => {
            let field_type_text = "";
            if (field._type === EXPERIENCE) {
                field_type_text = "experience";
            } else if (field._type === PUBLICATION) {
                field_type_text = "publication";
            }

            return (
                <>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                    Delete {field_type_text}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to delete {field_type_text} &quot;{field.title}&quot;?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <Button
                            className="w-full text-sm bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            loading={loading}
                            disabled={loading}
                            onClick={() => {
                                if (field._type === EXPERIENCE) {
                                    onDeleteExperience(field);
                                } else if (field._type === PUBLICATION) {
                                    onDeletePublication(field);
                                }
                            }}
                        >
                            Remove
                        </Button>
                        <button
                            type="button"
                            className="mt-3 text-sm w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => !loading && setOpen(false)}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </>
            );
        };

        if (field._operation === CREATE || field._operation === UPDATE) {
            if (field._type === EXPERIENCE) {
                return getExperienceDom(field);
            } else if (field._type === PUBLICATION) {
                return getPublicationDom(field);
            }
        } else if (field._operation === DELETE) {
            return getDeleteDom(field);
        }
    };


    const onOpenModal = (field, type, operation) => {
        setField(Object.assign({}, field, { _type: type, _operation: operation }));
        setComplete(false);
        setOpen(true);
    };

    const getDisplayDateRange = (start, end) => {
        start = getFormattedDate(start);
        end = getFormattedDate(end);

        let display_date = "";
        if (start) display_date += start;
        if (start && end) display_date += " - ";
        if (end) display_date += end;
        return display_date;
    };

    const getFormattedDate = (date) => {
        if (!date) return null;
        if (date === "present") return "Present";

        let d = dayjs(date);
        return d.isValid() ? d.format("MMMM YYYY") : "";
    };

    const emptyState = () => {
        return (
            <button
                type="button"
                className="mt-8 relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                onClick={() => onOpenModal({ title: null, start_time: null, stop_time: null, description: null }, EXPERIENCE, CREATE)}
            >
                <PlusSmIcon className="mx-auto h-12 w-12 text-gray-400" />
                <span className="mt-2 block text-sm font-medium text-gray-900" >Create a new experience</span>
            </button>
        );
    };

    return (
        <>
            <Container current="experience">
                <div className="mt-10 divide-y divide-gray-200">
                    <div className="flex items-center justify-between space-x-4">
                        <div className="space-y-1">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Experience</h3>
                            <p className="max-w-2xl text-sm text-gray-500">Manage all your past experiences and publications.</p>
                        </div>
                        <div className="flex justify-center order-3 flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
                            <button
                                onClick={() => onOpenModal({ title: null, start_time: null, stop_time: null, description: null }, EXPERIENCE, CREATE)}
                                className="h-11 w-11 sm:h-11 sm:w-11 text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 focus:ring-2 focus:ring-offset-2 flex justify-center rounded-full items-center"
                            >
                                <PlusSmIcon className="h-7 w-7 sm:h-6 sm:w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-6">
                        <dl className="divide-y divide-gray-200">
                            {/* EXPERIENCES */}
                            {experiences && experiences.length === 0 && emptyState()}
                            {experiences && experiences.map((experience, exper_index) => (
                                <section key={exper_index} className="py-6">
                                    <div className="flex space-x-3">
                                        <div className="flex-shrink-0">
                                            <Photo size="10" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h1 className="text-md font-medium text-gray-800 -mt-0.5">
                                                {experience.title}
                                            </h1>
                                            <h2 className="text-sm text-gray-500">
                                                {getDisplayDateRange(experience.start_time, experience.stop_time)}
                                            </h2>
                                        </div>
                                        <div className="flex-shrink-0 self-center flex">
                                            <Menu as="div" className="relative z-30 inline-block text-left">
                                                <div>
                                                    <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                                                        <span className="sr-only">Open options</span>
                                                        <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                                                    </Menu.Button>
                                                </div>

                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="py-2">
                                                            {/* Edit experience */}
                                                            <Menu.Item>
                                                                <button
                                                                    className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer flex px-4 py-2 text-sm w-full"
                                                                    onClick={() => onOpenModal(experience, EXPERIENCE, UPDATE)}
                                                                >
                                                                    <PencilIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                    <span>Edit</span>
                                                                </button>
                                                            </Menu.Item>

                                                            {/* Delete experience */}
                                                            <Menu.Item>
                                                                <button
                                                                    className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer flex px-4 py-2 text-sm w-full"
                                                                    onClick={() => onOpenModal(experience, EXPERIENCE, DELETE)}
                                                                >
                                                                    <TrashIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                    <span>Remove</span>
                                                                </button>
                                                            </Menu.Item>
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>

                                    <div className="mt-4 ml-12 pl-1 space-y-4">
                                        <div className="">
                                            <p className="block text-sm font-medium text-gray-600">
                                                <Markdown>
                                                    {experience.description}
                                                </Markdown>
                                            </p>
                                        </div>

                                        <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                            {
                                                experience.publications.map((publication, pub_index) => (
                                                    <li className="px-3 py-1 flex items-center justify-between text-sm" key={pub_index}>
                                                        <div className="w-0 flex-1 flex items-center">
                                                            <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                                            <span className="ml-2 flex-1 w-0 truncate text-gray-700">
                                                                <a href={/^http:\/\//.test(publication.duo_link) || /^https:\/\//.test(publication.duo_link) ? publication.duo_link : "//" + publication.duo_link}
                                                                    className="font-medium text-emerald-600 hover:text-emerald-500" target="_blank" rel="noreferrer">
                                                                    {publication.title}
                                                                </a>
                                                            </span>
                                                        </div>
                                                        <div className="ml-4 flex-shrink-0 flex justify-between gap-0 -mr-1">
                                                            {/* Edit publication */}
                                                            <button
                                                                type="button"
                                                                className="rounded-full p-2 hover:bg-gray-100"
                                                                onClick={() => onOpenModal(Object.assign({}, publication, { exper_id: experience.exper_id, exper_index: exper_index, pub_index: pub_index }), PUBLICATION, UPDATE)}
                                                            >
                                                                <PencilIcon className="h-5 w-5 text-gray-400" />
                                                            </button>

                                                            {/* Delete publication */}
                                                            <button
                                                                className="rounded-full p-2 hover:bg-gray-100"
                                                                onClick={() => onOpenModal(Object.assign({}, publication, { exper_id: experience.exper_id, exper_index: exper_index, pub_index: pub_index }), PUBLICATION, DELETE)}
                                                            >
                                                                <TrashIcon className="h-5 w-5 text-gray-400" />
                                                            </button>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                            <li className="flex items-center overflow-hidden">
                                                {/* Add new publication */}
                                                <button
                                                    type="button"
                                                    className="relative block w-full border-gray-300 border-dashed py-2.5 text-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-emerald-600"
                                                    onClick={() => onOpenModal(Object.assign({}, { title: null, duo_link: null }, { exper_id: experience.exper_id, exper_index: exper_index }), PUBLICATION, CREATE)}>
                                                    <PlusSmIcon className="mx-auto h-5 w-5 text-gray-400" />
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </section>
                            ))}
                        </dl>
                    </div>
                </div>
            </Container>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={() => { if (!loading) setOpen(false); }}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="overflow-visible sm:my-8 sm:align-middle sm:max-w-xl sm:w-full w-full inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform space-y-4">
                                {getModal(field)}
                            </div>

                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};
export default Experience;