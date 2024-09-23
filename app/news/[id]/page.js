

export default function NewsDetailsPage({ params }) {
    const newsId = params.id;

    return (
        <>
            <h1>News Details Page</h1>
            <p>News id: {newsId}</p>
        </>
    )
}