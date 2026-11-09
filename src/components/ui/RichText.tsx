import React from 'react';
import { parseRichText } from '@/utils/richtext';

export const RichText: React.FC<{ text: string }> = ({ text }) => (
    <>
        {parseRichText(text).map((t, i) => {
            switch (t.type) {
                case 'text': return <React.Fragment key={i}>{t.text}</React.Fragment>;
                case 'bold': return <strong key={i}>{t.text}</strong>;
                case 'link': return <a key={i} href={t.href} target="_blank" rel="noopener noreferrer">{t.text}</a>;
            }
        })}
    </>
);
