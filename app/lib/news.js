import Database from 'better-sqlite3';

import { DUMMY_NEWS } from '@/dummy-news';

const db = new Database('data.db');
db.pragma('journal_mode = WAL');

function initDb() {
    db.prepare(
       'CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY, slug TEXT UNIQUE, title TEXT, content TEXT, date TEXT, image TEXT)'
    ).run();
  
    const { count } = db.prepare('SELECT COUNT(*) as count FROM news').get();
  
    if (count === 0) {
        const insert = db.prepare(
            'INSERT INTO news (slug, title, content, date, image) VALUES (?, ?, ?, ?, ?)'
        );
  
        DUMMY_NEWS.forEach((news) => {
            insert.run(news.slug, news.title, news.content, news.date, news.image);
        });
    }
}

initDb();

export async function getAllNews() {
    const news = db.prepare('SELECT * FROM news').all();
    await new Promise(resolve => setTimeout(() => resolve(), 2000));
    return news;
}

export async function getLatestNews() {
    const news = db.prepare('SELECT * FROM news').all();
    await new Promise(resolve => setTimeout(() => resolve(), 2000));
    return news.slice(0, 3);
}

export function getAvailableNewsYears() {
    return DUMMY_NEWS.reduce((years, news) => {
        const year = new Date(news.date).getFullYear();

        if (!years.includes(year)) {
            years.push(year);
        }

        return years;
    }, []).sort((a, b) => b - a);
}

export function getAvailableNewsMonths(year) {
    return DUMMY_NEWS.reduce((months, news) => {
        const newsYear = new Date(news.date).getFullYear();

        if (newsYear === +year) {
            const month = new Date(news.date).getMonth();

            if (!months.includes(month)) {
                months.push(month + 1);
            }
        }

        return months;
    }, []).sort((a, b) => b - a);
}

export function getNewsForYear(year) {
    return DUMMY_NEWS.filter((news) => new Date(news.date).getFullYear() === +year);
}

export function getNewsForYearAndMonth(year, month) {
    return DUMMY_NEWS.filter((news) => {
        const newsYear = new Date(news.date).getFullYear();

        const newsMonth = new Date(news.date).getMonth() + 1;

        return newsYear === +year && newsMonth === +month;
    });
}