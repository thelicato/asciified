import { useClipboard } from "use-clipboard-copy";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { BiCopy } from "react-icons/bi";

interface IFigletClipboardProps {
  id: string;
  figletTxt: string;
}

export const FigletClipboard = (props: IFigletClipboardProps) => {
  const clipboard = useClipboard({ copiedTimeout: 1000 });
  const figletLines = props.figletTxt.split("\n");
  // Style
  return (
    <div className="w-full flex justify-center relative group">
      <pre
        id={props.id}
        ref={clipboard.target}
        className="text-base text-center font-bold inline pb-4 pt-12 "
      >
        {figletLines.map((line) => {
          return (
            <>
              {line}
              <br />
            </>
          );
        })}
      </pre>

      <button
        className="clipboardcode-btn text-white"
        onClick={() => clipboard.copy(props.figletTxt)}
      >
        {/* Copy Icon */}
        {clipboard.copied ? <BsHandThumbsUpFill /> : <BiCopy />}
      </button>
    </div>
  );
};

interface IImgClipboardProps {
  png: string;
  fontName: string;
  figletTxt: string;
}

export const ImgClipboard = (props: IImgClipboardProps) => {
  const clipboard = useClipboard({ copiedTimeout: 1000 });
  // Style
  return (
    <div className="w-full text-center flex flex-col items-center relative group">
      <p className="w-11/12 mx-auto mb-4 mt-10">
        The <b>Figlet was too long</b> and was converted into an <b>image</b>.
        You can copy it anyway
      </p>
      <img src={props.png} alt={`text-${props.fontName}`} className="w-11/12" />
      <button
        className="clipboardcode-btn text-white"
        onClick={() => clipboard.copy(props.figletTxt)}
      >
        {/* Copy Icon */}
        {clipboard.copied ? <BsHandThumbsUpFill /> : <BiCopy />}
      </button>
    </div>
  );
};

export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-full border-2 border-white"></div>
      </div>
    </div>
  );
};
