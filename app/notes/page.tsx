import NotesClient from "./Notes.client";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

export default async function NotesPage(){
    const queryClient = new QueryClient();

    const page = 1;
    const perPage = 12;
    const search = "";

    await queryClient.prefetchQuery({
        queryKey: ["notes", page, search],
        queryFn: () => fetchNotes(page, perPage, search),
    });
    return <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient />
    </HydrationBoundary>;
}