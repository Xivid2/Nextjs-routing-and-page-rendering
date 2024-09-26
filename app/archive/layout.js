export default function ArchiveLayout({ archive, latest }) {
    return (
        <div>
            <h1>News Archive</h1>

            <section id="acrhive-filter">
                {archive}
            </section>

            <section id="acrhive-latest">
                {latest}
            </section>
        </div>
    )
}