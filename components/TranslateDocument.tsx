'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
  
import { BotIcon, LanguagesIcon } from "lucide-react";
import { FormEvent, useState, useTransition } from "react";
import Markdown from "react-markdown";
import { toast } from "sonner";
import * as Y from "yjs";
import { Button } from "./ui/button";

type Language = 
    | "english"
    | "spanish"
    | "portuguese"
    | "french"
    | "german"
    | "chinese"
    | "arabic"
    | "hindi"
    | "russian"
    | "japanese";

const languages: Language[] = [
    "english",
    "spanish",
    "portuguese",
    "french",
    "german",
    "chinese",
    "arabic",
    "hindi",
    "russian",
    "japanese",
];

function TranslateDocument({doc}: {doc: Y.Doc}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [language, setLanguage] = useState<string>("");
    const [summary, setSummary] = useState("");

    const handleAskQuestion = async (e: FormEvent) => {
        e.preventDefault();
        
        startTransition(async () => {
            const documentData = doc.get("document-store").toJSON();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        documentData,
                        targetLang: language,
                    }),
                }
            );

            if(response.ok) {
                const {translated_text} = await response.json();

                setSummary(translated_text);
                toast.success("Translated Summary Successfully!");
            }

        });
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button asChild variant="outline">
            <DialogTrigger>
                <LanguagesIcon/>
                Translate
            </DialogTrigger>
        </Button>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Translate the Document</DialogTitle>
            <DialogDescription>
                Select a Language and AI will translate a summary of the document in the selected language
            </DialogDescription>

            <hr className="mt-5"/>

            </DialogHeader>

            {summary && (
                <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
                    <div className="flex">
                        <BotIcon className="w-10 flex-shrink-0"/>
                        <p className="font-bold">
                            GPT {isPending ? "is thinking..." : "Says"}
                        </p>
                    </div>
                    <p>{isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}</p>
                </div>
            )}

            <form className="flex gap-2" onSubmit={handleAskQuestion}>
                <Select
                 value={language}
                 onValueChange={(value) => setLanguage(value)}
                >
                    <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Select a Language"/>
                    </SelectTrigger>

                    <SelectContent>
                        {languages.map((language) => (
                            <SelectItem key={language} value={language}>
                                {language.charAt(0).toUpperCase() + language.slice(1)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button type="submit" disabled={!language || isPending}>
                    {isPending ? "Translating.." : "Translate"}
                </Button>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default TranslateDocument