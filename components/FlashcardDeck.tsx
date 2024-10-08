import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface FlashcardDeckProps {
    title: string;
    numberCards: number;
    description: string;
    creator: string;
    createdAt: string;
    docID: string;
}

const FlashcardDeck = ({
    title,
    numberCards,
    description,
    creator,
    createdAt,
    docID,
}: FlashcardDeckProps) => {
    return (
        <Card className="w-full hover:shadow-md">
            <CardHeader className="flex flex-col gap-1">
                <CardTitle className="font-semibold text-lg">{title}</CardTitle>
                <CardDescription className="text-sm leading-4 text-muted-foreground">{description}</CardDescription>
                <Badge className="text-sm mr-auto">{numberCards} Cards</Badge>
            </CardHeader>
            <CardContent className="flex flex-row items-start justify-start gap-2">
                <Avatar>
                    <AvatarImage src="" alt="@shadcn" />
                    <AvatarFallback>{creator[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start justify-start">
                    <p className="text-sm font-semibold">{creator}</p>
                    <p className="text-sm text-muted-foreground">{createdAt}</p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                {/* <Button variant="outline">View Deck</Button> */}
                <Link href={`/flashcards/${docID}`} passHref>
                    <Button>View Deck</Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default FlashcardDeck;
