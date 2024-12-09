'use client'
import { db } from "@/firebase";
import useOwner from "@/lib/useOwner";
import { doc, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Avatars from "./Avatars";
import DeleteDocument from "./DeleteDocument";
import Editor from "./Editor";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import { Button } from "./ui/button";
import { Input } from "./ui/input";


function Document({id}: {id: string}) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, loading, error] = useDocumentData(doc(db, "documents", id));
    const [input, setInput] = useState("");
    const [isUpdating, startTransition] = useTransition();
    const isOwner = useOwner();

    useEffect(() => {
        if(data) {
            setInput(data.title);
        }
    }, [data])

    const updateTitle = (e: FormEvent) => {
        e.preventDefault();

        if(input.trim()){
            startTransition(async () => {
                await updateDoc(doc(db, "documents", id), {
                    title: input,
                })
            })
        }
    }
    
  return (
    <div className="flex-1 h-full bg-white p-5">
        <div className="flex max-w-6xl mx-auto justify-between pb-5">
            <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
                {/* update title.. */}
                <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />
                <Button disabled={isUpdating} type="submit">
                    {isUpdating ? "Updating..." : "Update"}
                </Button>

                {/* If */}
                {/* isOwner && InviteUser, Delete Document */}
                {isOwner && (
                    <>
                        {/* InviteUser */}
                        <InviteUser/>

                        {/* Delete Document */}
                        <DeleteDocument/>
                    </>
                )}
                
            </form>
        </div>

        <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
            {/* Manage Users */}
            <ManageUsers/>

            {/* Avatars */}
            <Avatars/>
        </div>

        <hr className="pb-10"/>

        {/* Collaborative Editor */}
        <Editor/>
    </div>
  )
}

export default Document