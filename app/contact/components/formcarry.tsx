'use client'
import React, { useState } from 'react';

export default function Formcarry() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const [error, setError] = useState('')

    function onSubmit(e){
        e.preventDefault();
        e.stopPropagation();

        fetch("https://formcarry.com/s/mB1Qk1B-AIS", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        })
            .then(response => response.json())
            .then(response => {
                if (response.code === 200) {
                    alert("We received your submission, thank you!");
                }
                else if(response.code === 422){
                    // Field validation failed
                    setError(response.message)
                }
                else {
                    // other error from formcarry
                    setError(response.message)
                }
            })
            .catch(error => {
                // request related error.
                setError(error.message ? error.message : error);
            });
    }


    return (
        <form className="grid gap-6 w-full" onSubmit={(e) => onSubmit(e)}>

            <div className="grid formcarry-block">
                <label className="mb-1 block" htmlFor="name">Full Name</label>
                <input className="px-3 py-2 rounded-lg border border-green-300 text-white" type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Your first and last name" />
            </div>

            <div className="grid formcarry-block">
                <label className="mb-1 block" htmlFor="email">Your Email Address</label>
                <input className="px-3 py-2 rounded-lg border border-green-300 text-white" type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="john@doe.com" />
            </div>

            <div className="grid formcarry-block">
                <label className="mb-1 block" htmlFor="message">Your message</label>
                <textarea rows="10" className="px-3 py-2 rounded-lg border border-green-300 text-white" value={message} onChange={(e) => setMessage(e.target.value)} id="message" placeholder="Enter your message..."></textarea>
            </div>

            <div className="flex justify-center formcarry-block">
                <button className="text-center text-lg font-bold bg-[#85B59C] hover:bg-green-300 text-black px-4 py-2 inline-flex items-center rounded-lg" type="submit">Send</button>
            </div>
        </form>
    )
}