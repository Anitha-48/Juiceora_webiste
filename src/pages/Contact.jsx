import { useState } from 'react'
const empty = { name: '', email: '', phone: '', subject: '', message: '' }
// Replace this with a real fetch('/api/contact', ...) when a backend exists.
const submitForm = data => new Promise((res, rej) => setTimeout(() => (data.message.includes('fail') ? rej(new Error('demo')) : res()), 900))
export default function Contact() {
  const [f, setF] = useState(empty); const [err, setErr] = useState({}); const [st, setSt] = useState('idle')
  const set = e => setF({ ...f, [e.target.name]: e.target.value })
  const validate = () => { const e = {}; if (!f.name.trim()) e.name = 'Enter your full name.'
    if (!f.email.trim()) e.email = 'Enter your email address.'; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email, like name@example.com.'
    if (!f.subject.trim()) e.subject = 'Enter a subject.'; if (!f.message.trim()) e.message = 'Enter a message.'; return e }
  const send = async ev => { ev.preventDefault(); const e = validate(); setErr(e); if (Object.keys(e).length) return
    setSt('loading'); try { await submitForm(f); setSt('success'); setF(empty) } catch { setSt('error') } }
  const Field = ({ n, label, type = 'text', req = true, area }) => { const P = area ? 'textarea' : 'input'
    return (<div className="field"><label htmlFor={n}>{label}{req ? '' : ' (optional)'}</label>
      <P id={n} name={n} type={area ? undefined : type} rows={area ? 5 : undefined} value={f[n]} onChange={set} aria-invalid={!!err[n]} aria-describedby={err[n] ? n + '-e' : undefined} />
      {err[n] && <span className="err" id={n + '-e'}>{err[n]}</span>}</div>) }
  return (<div className="page"><header className="phero"><h1>Contact us</h1><p>Demo mode: this form does not send messages to a real business.</p></header>
    <form className="section narrow" onSubmit={send} noValidate>
      {Field({ n: 'name', label: 'Full name' })}{Field({ n: 'email', label: 'Email address', type: 'email' })}{Field({ n: 'phone', label: 'Phone', type: 'tel', req: false })}
      {Field({ n: 'subject', label: 'Subject' })}{Field({ n: 'message', label: 'Message', area: true })}
      <button className="btn" disabled={st === 'loading'}>{st === 'loading' ? 'Sending…' : 'Send message'}</button>
      <div role="status" aria-live="polite">{st === 'success' && <p className="ok">Demo submission complete. Nothing was delivered.</p>}
        {st === 'error' && <p className="err">The demo request failed. Check your message and try again.</p>}</div></form></div>)
}
