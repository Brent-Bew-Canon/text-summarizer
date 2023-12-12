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
        setLoading(true);
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
                <div class="spinner-border mx-auto" role="status">
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
            <div class="tool-header container-fluid d-flex align-items-center justify-content-center mb-5" id="tool">
                <h2 class="text-center bg-header text-white py-4 px-5 rounded">Article Summary Tool</h2>
            </div>
            <div className="container" >
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={sumSubmission}>
                            <div>
                                <textarea
                                    className="form-control form-control-lg form-bg" // Adjust size using Bootstrap classes
                                    name="text"
                                    id="text"
                                    rows="10"
                                    value={text}
                                    placeholder="enter your text here...."
                                    onChange={(e) => { setText(e.target.value) }}
                                    style={{ width: '100%' }} // Set width to 100% for responsiveness
                                ></textarea>

                            </div>
                            <div className="my-4 text-center">
                                <button className="btn btn-success fs-4 m-4" type="submit">Summarize This</button>
                                <button className="btn btn-danger fs-4 m-4" type="button" onClick={clearTextArea}>New Submission</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-10 mx-auto">
                        <div className="text-center">
                            <h2 className="my-5 fw-bold fs-1 bg-secondary text-white py-3">Your Summary</h2>
                        </div>
                        <div className="text-start fs-3">
                            {loadingState()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Summarize;