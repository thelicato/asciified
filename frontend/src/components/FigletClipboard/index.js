import { useClipboard } from 'use-clipboard-copy';
import { BsHandThumbsUpFill } from "react-icons/bs";
import { BiCopy } from "react-icons/bi";

const FigletClipboard = (props) => {
    const clipboard = useClipboard({ copiedTimeout: 1000 });
    const figletLines = props.figletTxt.split('\n');
    // Style
    return (
        <div key={props.key} className="w-full flex justify-center relative group">
            <pre id={props.key} ref={clipboard.target} className="text-base text-center font-bold inline pb-4 pt-12 ">
                {figletLines.map((line) => {
                    return (
                        <>{line}<br/></>
                    )
                })}
            </pre>

            <button className="clipboardcode-btn text-white" onClick={() => clipboard.copy(props.figletTxt)}>
                {/* Copy Icon */}
                {clipboard.copied ? (<BsHandThumbsUpFill/>) : (<BiCopy/>)}
            </button>
        </div>
    )
}

export default FigletClipboard;