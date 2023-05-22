import React from "react";
import { MailIcon, PhoneIcon } from "@heroicons/react/outline";

export default function ContactUs() {
    // return (
    //     <div className="bg-white">
    //         <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
    //             <div className="text-center mb-10">
    //                 <h2 className="text-3xl tracking-tight font-bold text-gray-900 sm:text-3xl">Contact Us</h2>
    //                 <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500 sm:mt-2">
    //                     We would love to hear from you!
    //                 </p>
    //             </div>
    //             <div className="max-w-lg mx-auto md:max-w-none md:grid md:gap-8 text-center">
    //                 <div>
    //                     <h2 className="text-lg sm:text-lg font-semibold text-gray-900">Program Support</h2>
    //                     <div className="mt-3">
    //                         <p className="text-md sm:text-sm text-gray-500">
    //                             Please contact program support if you have any questions regarding the
    //                             Vlyss application. Our coordinators are available to help you with any
    //                             questions you may have.
    //                         </p>
    //                     </div>
    //                     <div className="mt-6 flex justify-center">
    //                         <div className="flex items-center">
    //                             <div className="flex-shrink-0">
    //                                 <MailIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
    //                             </div>
    //                             <div className="ml-1.5 text-md text-gray-900">
    //                                 <a href="mailto:contact@vlyss.com" rel="noreferrer" target="_blank" className="hover:underline">contact@vlyss.com</a>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );

    const contacts = [
        {
            method: "Program Support",
            email: "contact@vlyss.com",
            phone: "210 569 9512"
        },
    ];

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Get in touch</h2>
                            <p className="mt-4 leading-7 text-gray-600">
                                Please contact program support if you have any questions regarding the
                                Vlyss application. Our coordinators are available to help you with any
                                questions you may have.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
                            {contacts.map((contact) => (
                                <div key={contact.method} className="rounded-2xl bg-gray-50 p-10">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">{contact.method}</h3>
                                    <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                                        <div className="flex justify-start">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <MailIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                                </div>
                                                <div className="ml-1.5 font-semibold text-gray-600">
                                                    <a href={`mailto:${contact.email}`} rel="noreferrer" target="_blank" className="hover:underline">{contact.email}</a>
                                                </div>
                                            </div>
                                        </div>
                                        {contact.phone && (
                                            <div className="flex justify-start">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <PhoneIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                                    </div>
                                                    <div className="ml-1.5 font-semibold text-gray-600">
                                                        <a href={`tel:${contact.phone}`} className="hover:underline">{contact.phone}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </dl>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
