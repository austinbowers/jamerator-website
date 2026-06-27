'use client'
import React, { useState } from 'react';
import { Icon } from '@/app/components/ds/Icon';

export default function Formcarry() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        e.stopPropagation();
        setError('');
        setSending(true);

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
                    setSent(true);
                } else {
                    setError(response.message || 'Something went wrong. Please try again.');
                }
            })
            .catch(err => {
                setError(err.message ? err.message : String(err));
            })
            .finally(() => setSending(false));
    }

    if (sent) {
        return (
            <div className="form-sent">
                <span className="contact-ico" style={{ width: 54, height: 54, borderRadius: 16 }}>
                    <Icon name="check" size={28} color="var(--forest)" strokeWidth={2.4} />
                </span>
                <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: 'var(--light-ink)' }}>Message sent!</h2>
                <p className="body-copy" style={{ margin: '0 auto' }}>Thanks for reaching out. We&apos;ll get back to you as soon as we can.</p>
            </div>
        )
    }

    return (
        <form className="form-grid" onSubmit={onSubmit}>
            <div className="form-field">
                <label className="form-label" htmlFor="name">Full name</label>
                <input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Your first and last name" required />
            </div>

            <div className="form-field">
                <label className="form-label" htmlFor="email">Email address</label>
                <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="you@example.com" required />
            </div>

            <div className="form-field">
                <label className="form-label" htmlFor="message">Your message</label>
                <textarea className="form-input" value={message} onChange={(e) => setMessage(e.target.value)} id="message" placeholder="How can we help?" required></textarea>
            </div>

            {error && <p className="form-error">{error}</p>}

            <button className="form-submit" type="submit" disabled={sending}>
                {sending ? 'Sending…' : 'Send message'}
                {!sending && <Icon name="chevronRight" size={18} color="#FCFAF3" strokeWidth={2.4} />}
            </button>
        </form>
    )
}
