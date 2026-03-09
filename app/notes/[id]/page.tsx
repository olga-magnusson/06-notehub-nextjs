import NoteDetailsClient from "./NoteDetails.client";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

interface NoteDetailsPageProps {
  params: { id: string; };
}

export default async function NoteDetailsPage(props: NoteDetailsPageProps) {
  
  const awaitedParams: {id: string} = await Promise.resolve(props.params);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", awaitedParams.id],
    queryFn: () => fetchNoteById(awaitedParams.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
