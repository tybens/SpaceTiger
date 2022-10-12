import { useParams } from "react-router-dom"

export default function Details() {
    const { query } = useParams();
    return <div>{query}</div>
}