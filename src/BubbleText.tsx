export interface BubbleProperties {
    text: string
}

export function BubbleText({ text }: BubbleProperties) {
    return (
        <>
            <div id="bubbleText">
                <p>{text}</p>
            </div>
        </>
    )
}