import { useEffect, useRef, useState } from "react";
import "./ImageCanvas.css"

interface ImageCanvasProps {
    imageFile: File | undefined;
    displayMode: string;
}

const ImageCanvas = (props: ImageCanvasProps) => {
    const [fileDataUrl, setFileDataUrl] = useState<string | undefined>();
    const [loaded, setLoaded] = useState<boolean>(false);

    const fileReaderRef = useRef<FileReader>(new FileReader());
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        window.addEventListener("resize", resizeImage);

        return () => window.removeEventListener("resize", resizeImage);
    }, [])

    useEffect(() => {
        if (props.imageFile && fileReaderRef.current) {
            setLoaded(false)
            fileReaderRef.current.readAsDataURL(props.imageFile);
            fileReaderRef.current.onload = (e) => {
                if (typeof e.target?.result === 'string') {
                    // setInterval(() => setLoaded(true), 1000);
                    setFileDataUrl(e.target.result);
                }
            };
        }
    }, [props.imageFile]);
    

    useEffect(() => {
        resizeImage();
    }, [fileDataUrl, props.displayMode])

    const resizeImage = () => {
        console.log("r1r")
        const img = imgRef.current
        if (img) {

            img.style.width = "inital";
            img.style.height = "initial";
            img.onload = function () {
                console.log(img.width, img.height);
            };
            if (fileDataUrl) {

            
            img.src = fileDataUrl

            const newImg = new Image();
            newImg.src = fileDataUrl;
            newImg.addEventListener("load", () => {
                const ratio = newImg.width / newImg.height;
                newImg.remove()
                setLoaded(true)
                console.log(ratio)
                if (img) {
                    switch (props.displayMode) {
                        case "SBS":
                            if (window.innerWidth > window.innerHeight) {
                                img.width = window.innerWidth;
                                img.height = window.innerWidth / ratio;
                            }
                            break;
                        case "TB":
                        default:
                            if (window.innerWidth > window.innerHeight) {
                                img.height = window.innerHeight;
                                img.width = window.innerHeight * ratio
                            }
                            break;
                    }
                }
            })



        }
        }
    }

    return (
        <div className="image-canvas" style={{backgroundImage: fileDataUrl}}>
                {fileDataUrl && <img ref={imgRef} alt="Uploaded" style={{visibility:  loaded ? "visible" : "hidden"}}/>}
        </div>
    );
};

export default ImageCanvas;
