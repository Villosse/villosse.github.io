import React from 'react';
import type { Highlight } from '@/config/schema';
import { RichText } from './RichText';

export const Highlights: React.FC<{ items?: Highlight[] }> = ({ items }) =>
    items?.length ? (
        <ul className="tl-list">
            {items.map((h, i) =>
                typeof h === 'string' ? (
                    <li key={i}><RichText text={h} /></li>
                ) : (
                    <li key={i}>
                        <RichText text={h.text} />
                        <Highlights items={h.items} />
                    </li>
                )
            )}
        </ul>
    ) : null;
