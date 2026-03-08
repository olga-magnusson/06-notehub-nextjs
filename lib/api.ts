import type {Note, NoteTag} from '../types/note';
import axios from 'axios';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = 'https://notehub-public.goit.study/api';

axios.defaults.headers.common.Authorization = `Bearer ${token}`;

export interface FetchNotesResponse{
    notes: Note[];
    totalPages: number;
}

export const fetchNotes = async (page: number, perPage: number, search: string): Promise<FetchNotesResponse> => {
    const response = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`,{params: {page, perPage, search},});
    return response.data;
};

export async function fetchNoteById(id:string): Promise<Note> {
    const response = await axios.get<Note>(`${BASE_URL}/notes/${id}`);
    return response.data;
}

interface CreateNoteRequest{title: string; content: string; tag: NoteTag;}

export const createNote = async(note: CreateNoteRequest): Promise<Note> => {
    const response = await axios.post<Note>(`${BASE_URL}/notes`, note);
    return response.data;
};

export const deleteNote = async(id: string): Promise<Note> => {
    const response = await axios.delete<Note>(`${BASE_URL}/notes/${id}`);
    return response.data;
};