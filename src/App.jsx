import React, {useState} from 'react';
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom';
import translations from "./translations";
import Home from './pages/Home'
import Cat from './pages/Cat'
import Dog from './pages/Dog'

export default function App() {
  const [locale, setLocale] = useState('en');
  return (
    <BrowserRouter>
      <span>Locale:</span>
      <button onClick={() => setLocale('en')} disabled={locale === 'en'}>English</button>
      <button onClick={() => setLocale('fr')} disabled={locale === 'fr'}>French</button>

      <h1>{translations[locale].greeting}</h1>

      <ul>
        <li><Link to="/">🏠</Link></li>
        <li><Link to="/cat">🐱</Link></li>
        <li><Link to="/dog">🐶</Link></li>
      </ul>

      <Routes>
        <Route path="/" element={<Home locale={locale} />} />
        <Route path="/cat" element={<Cat locale={locale} />} />
        <Route path="/dog" element={<Dog locale={locale} />} />
      </Routes>
    </BrowserRouter>
  );
}