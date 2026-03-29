'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { projects as baseProjects } from '../lib/projects';

type Item = {
  slug: string;
  icon: string;
  title: string;
  short: string;
};

const STORAGE_KEY = 'playmolt-project-order-v1';
const TITLE_KEY = 'playmolt-project-titles-v1';

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function ProjectList() {
  const initialItems = useMemo<Item[]>(
    () => baseProjects.map(({ slug, icon, title, short }) => ({ slug, icon, title, short })),
    []
  );

  const [items, setItems] = useState<Item[]>(initialItems);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedOrder = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    const savedTitles = typeof window !== 'undefined' ? window.localStorage.getItem(TITLE_KEY) : null;

    let next = [...initialItems];

    if (savedOrder) {
      try {
        const order: string[] = JSON.parse(savedOrder);
        const map = new Map(next.map((item) => [item.slug, item]));
        const ordered = order.map((slug) => map.get(slug)).filter(Boolean) as Item[];
        const rest = next.filter((item) => !order.includes(item.slug));
        next = [...ordered, ...rest];
      } catch {}
    }

    if (savedTitles) {
      try {
        const titles: Record<string, string> = JSON.parse(savedTitles);
        next = next.map((item) => ({ ...item, title: titles[item.slug] ?? item.title }));
      } catch {}
    }

    setItems(next);
  }, [initialItems]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.map((item) => item.slug)));
    const titles = Object.fromEntries(items.map((item) => [item.slug, item.title]));
    window.localStorage.setItem(TITLE_KEY, JSON.stringify(titles));
  }, [items]);

  const onDropAt = (dropIndex: number) => {
    if (dragIndex === null || dragIndex === dropIndex) return;
    setItems((current) => reorder(current, dragIndex, dropIndex));
    setDragIndex(null);
  };

  const updateTitle = (slug: string, title: string) => {
    setItems((current) => current.map((item) => (item.slug === slug ? { ...item, title } : item)));
  };

  return (
    <div className="cards">
      {items.map((item, index) => (
        <article
          className={`card projectRow ${dragIndex === index ? 'dragging' : ''}`}
          key={item.slug}
          draggable
          onDragStart={() => setDragIndex(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onDropAt(index)}
          onDragEnd={() => setDragIndex(null)}
        >
          <div className="projectRowInner">
            <div className="dragHandle" aria-hidden="true" title="드래그해서 순서 변경">⋮⋮</div>

            <div className="projectMain">
              <div className="metaRow">
                <div className="pill">{item.icon}</div>
                <div className="pill">drag & drop</div>
              </div>
              <input
                className="titleInput"
                value={item.title}
                onChange={(e) => updateTitle(item.slug, e.target.value)}
                aria-label={`${item.title} 제목 수정`}
              />
              <p>{item.short}</p>
            </div>

            <div className="projectActions">
              <Link className="pill" href={`/projects/${item.slug}`}>
                상세 보기
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
