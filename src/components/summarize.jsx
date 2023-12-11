import { CohereClient } from "cohere-ai";
import { useState } from 'react'



function Summarize() {

    const [text, setText] = useState("")
    const [summary, setSummary] = useState("Awating Brent's Magic...")
    const [loading, setLoading] = useState(true)
    const [submitted, setSubmitted] = useState(false)
    const cohere = new CohereClient({
        token: "BFnRZ0gxCSAbcJIIfG9AaRdsRSQdLpDeI22ltwuI", // This is your trial API key
    });

    const createBulletPoints = function (text) {
        // Split the text into individual sentences
        const sentences = text.split('. ');

        // Create bullet points
        const bulletPoints = sentences.map(sentence => `- ${sentence}`);

        // Join bullet points with line breaks
        const result = bulletPoints.join('\n');

        return result;
    }

    const loadingState = () => {
        return (submitted ?
            loading ?
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                :
                <p className="fs-4">{createBulletPoints(summary)}</p>
            :
            <p className="fs-4">{summary}</p>
        )
    }

    const sumSubmission = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        console.log("submit");
        const response = await cohere.summarize({
            text: text,
            length: "medium",
            format: "bullets",
            model: "summarize-xlarge",
            additionalCommand: "",
            temperature: 0.3,
        });
        let result = response.summary;
        console.log(result);
        setSummary(result);
        setLoading(false);
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className="my-3">Welcome To Brent's Magic Summarize Machine</h1>
                        <form onSubmit={sumSubmission}>
                            <div>
                                <textarea className="fs-5" name="text" id="text" cols="100" rows="10" onChange={(e) => { setText(e.target.value) }}></textarea>
                            </div>
                            <div className="my-4">
                                <button className="btn btn-success" type="submit">Summarize This</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-10 mx-auto  border border-1">
                        <div className="text-center">
                            <h2 className="my-4">Results</h2>
                        </div>
                        <div>
                            {loadingState()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Summarize;