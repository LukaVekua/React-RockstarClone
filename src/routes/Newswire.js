import Nav from "../components/mainNavigation/Nav"
import { useQuery } from "@tanstack/react-query"
import { fetchNewswires } from "../async/actions"
import CurrentNewswire from "../components/newswire/CurrentNewswire"
import NewswireList from "../components/newswire/NewswireList"
export default function Newswire() {
    const { data, isLoading } = useQuery({
        queryKey: ['newswire'],
        queryFn: () => fetchNewswires()
    })

    return <>
        <Nav />
        {!isLoading && <CurrentNewswire current={data[2]} />}
        {!isLoading && <NewswireList limited={false} />}
    </>
}