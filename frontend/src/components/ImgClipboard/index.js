import { useClipboard } from 'use-clipboard-copy';
import { BsHandThumbsUpFill } from "react-icons/bs";
import { BiCopy } from "react-icons/bi";

const ImgClipboard = (props) => {
    const clipboard = useClipboard({ copiedTimeout: 1000 });
    // Style
    return (
        <div key={props.key} className="w-full text-center flex flex-col items-center relative group">
            <p className="mb-4">The Figlet was to long and was converted into an image. You can copy it anyway</p>
            <img src={props.png} alt={`text-${props.fontname}`} className="w-11/12"/>
            <button className="clipboardcode-btn text-white" onClick={() => clipboard.copy(props.figletTxt)}>
                {/* Copy Icon */}
                {clipboard.copied ? (<BsHandThumbsUpFill/>) : (<BiCopy/>)}
            </button>
        </div>
    )
}

export default ImgClipboard;