'use client'

import { createNewDocument } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "./ui/button";

function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const {docId} = await createNewDocument();
      router.push(`/doc/${docId}`)
    })
  }

  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>
        {isPending ? "Creating..." : "New Document"}
    </Button>
  )
}

export default NewDocumentButton