import { CohereClient } from "cohere-ai";
import { useState } from 'react'



function Summarize() {

    const [text, setText] = useState("")
    const [summary, setSummary] = useState("Awating Your Input Above...")
    const [loading, setLoading] = useState(true)
    const [submitted, setSubmitted] = useState(false)
    const cohere = new CohereClient({
        token: "BFnRZ0gxCSAbcJIIfG9AaRdsRSQdLpDeI22ltwuI", // This is your trial API key
    });

    const clearTextArea = () => {
        setText("");
        setSubmitted(false);
        setSummary("Awating Your Input Above...");
    }

    const createListElements = (text) => {
        const sentences = text.split('- ');
        const listItems = sentences.slice(1).map((sentence, index) => <li key={index} className="my-3">{sentence}</li>);
        return <ul>{listItems}</ul>;
    };

    const loadingState = () => {
        return (submitted ?
            loading ?
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                :
                <>{createListElements(summary)}</>
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
                        <h1 className="mb-3 pb-5">Welcome To Brent's Magic Summarize Machine</h1>
                        <form onSubmit={sumSubmission}>
                            <div>
                                <textarea className="fs-5 rounded" name="text" id="text" cols="100" rows="10" onChange={(e) => { setText(e.target.value) }} value={text}></textarea>
                            </div>
                            <div className="my-4">
                                <button className="btn btn-success fs-4 mx-2" type="submit">Summarize This</button>
                                <button className="btn btn-danger fs-4 mx-2" type="button" onClick={clearTextArea}>New Submission</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-10 mx-auto   border-1">
                        <div className="text-center">
                            <h2 className="my-5 fw-bold fs-1 bg-secondary text-white py-3">Summarization</h2>
                        </div>
                        <div className=" fs-3">
                            {loadingState()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Summarize;