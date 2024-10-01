"use client";

import NewsList from "@/components/news-list";
import { useEffect, useState } from "react";

export default function NewsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [news, setNews] = useState();

    useEffect(() => {
        async function fetchNews() {
            setIsLoading(true);

            const response = await fetch('http://localhost:8080/news')
                .catch((error) => {
                    console.error(error);
                    setError('Failed to fetch news.');
                    return;
                });

            if (!response.ok) {
                setError('Failed to fetch news.');
            }

            const news = await response.json();
            setIsLoading(false);
            setNews(news);
        }

        fetchNews();
    }, []);

    if (isLoading) {
        return (
            <p>Loading...</p>
        );
    }

    if (error) {
        return (
            <p>{error}</p>
        );
    }

    let content;

    if (news) {
        content = (<NewsList news={news} />);
    }

    return (
        <>
            <h1>News Page</h1>

            {content}
        </>
    )
}