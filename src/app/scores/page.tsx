export default async function ScoresDisplay() {
    const res = await fetch("http://localhost:3000/api/score/fetch?sort=id", {
        cache: "no-store",
    });
    const scores = await res.json();

    return <>{JSON.stringify(scores, null, 4)}</>; // TODO
}
