import { useAuth } from "@/context/AuthContext";
import {
    getFlashcardsForAllUsers,
    getFlashcardsByUserId,
    getUserById,
} from "@/lib/firebaseUtils";
import { error } from "console";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import FlashcardDeck from "./FlashcardDeck";

const PublicPage = () => {
    const { currentUser, isLoading } = useAuth();
    const [publicFlashcards, setPublicFlashcards] = useState<any>([]);
    const [flashcards, setFlashcards] = useState<any>([]);
    const [userData, setUserData] = useState<any | null>(null);
    const [publicFlashcardsLoading, setPublicFlashcardsLoading] =
        useState(false);

    useEffect(() => {
        async function getPublicFlashcard() {
            setPublicFlashcardsLoading(true);
            try {
                const data: any = await getFlashcardsForAllUsers(
                    currentUser.uid
                );
                if (data) {
                    setPublicFlashcards(data);
                    console.log("successfully added");
                    console.log(data);
                } else {
                    throw Error("data is empty");
                }
            } catch (error) {
                console.log("unable to get data");
                console.log(error);
            } finally {
                setPublicFlashcardsLoading(false);
            }
        }
        async function userFlashcard() {
            try {
                console.log(currentUser.uid);
                const data = await getFlashcardsByUserId(currentUser!.uid);
                console.log(data);
                if (data) {
                    setFlashcards(data.slice(0, 3));
                    console.log("successfully retrive user flashcard");
                    // console.log(data);
                } else {
                    throw Error("data is empty");
                }
            } catch (err) {
                console.log("unable to get user flashcard");
                console.log(err);
            }
        }
        const getUserData = async () => {
            if (currentUser) {
                try {
                    const data = await getUserById(currentUser?.uid);
                    if (data) {
                        // console.log(data);
                        setUserData(data);
                    } else {
                        console.log("No user data found");
                        setUserData(null);
                    }
                } catch (error) {
                    console.error("Error loading user data:");
                }
            }
        };
        if (currentUser) {
            userFlashcard();
            getPublicFlashcard();
            getUserData();
        }
    }, [currentUser]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen pb-20">
                <LoaderCircle size={48} className="animate-spin text-primary" />
            </div>
        );
    } else {
        return (
            <>
                <section className="container flex flex-col items-start gap-8 pt-8 px-8 md:px-20 sm:gap-10 min-h-screen">
                    <h1 className="text-xl font-semibold sm:text-2xl">
                        Your Recent Decks
                    </h1>
                    {flashcards.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-start w-full gap-6 mb-8">
                            {flashcards.map((flashcard: any) => (
                                <FlashcardDeck
                                    key={flashcard?.id}
                                    title={flashcard?.title}
                                    description={flashcard?.description}
                                    numberCards={flashcard?.questions.length}
                                    creator={
                                        userData?.firstName +
                                        " " +
                                        userData?.lastName
                                    }
                                    createdAt={flashcard?.created_at}
                                    docID={flashcard?.id}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="w-full flex items-start justify-center font-semibold text-2xl h-screen mt-20">
                            No Flashcard Decks Found, Create One Now!
                        </div>
                    )}

                    <h1 className="text-xl font-semibold sm:text-2xl">
                        Public Flashcards
                    </h1>
                    {publicFlashcardsLoading && (
                        <div className="flex w-full justify-center items-center">
                            <LoaderCircle
                                size={32}
                                className="animate-spin text-primary"
                            />
                        </div>
                    )}
                    {flashcards.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-start w-full gap-6 mb-20">
                            {publicFlashcards.map((flashcard: any) => (
                                <FlashcardDeck
                                    key={flashcard?.id}
                                    title={flashcard?.title}
                                    description={flashcard?.description}
                                    numberCards={flashcard?.questions.length}
                                    creator={flashcard.userName}
                                    createdAt={flashcard?.created_at}
                                    docID={flashcard?.id}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="w-full flex items-start justify-center font-semibold text-2xl h-screen mt-20">
                            No Flashcard Decks Found, Create One Now!
                        </div>
                    )}
                </section>
            </>
        );
    }
};

export default PublicPage;
