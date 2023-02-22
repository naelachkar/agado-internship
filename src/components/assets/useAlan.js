import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect, useState } from "react";

export default function useAlan() {
    const [alanInstance, setAlanInstance] = useState()

    useEffect(() => {
        if (alanInstance != null) return;
        setAlanInstance(
            alanBtn({
                top: "20px",
                left: "20px",
                key: '094210a0bed14f96ddae0d8d24063d5c2e956eca572e1d8b807a3e2338fdd0dc/stage',
                onCommand: (commandData) => {
                    console.log(commandData)
                }
            })
        )
    }, []);

    return null
}