import { useEffect, useRef, useState } from "react";
import "./ImageCanvas.css"

interface ImageCanvasProps {
    imageFile: File | undefined;
}

const ImageCanvas = (props: ImageCanvasProps) => {
    const [fileDataUrl, setFileDataUrl] = useState<string | undefined>();

    const fileReaderRef = useRef<FileReader>(new FileReader());
    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (props.imageFile && fileReaderRef.current) {
            fileReaderRef.current.readAsDataURL(props.imageFile);
        }
    }, [props.imageFile]);
    
    useEffect(() => {
        fileReaderRef.current.onload = (e) => {
            if (typeof e.target?.result === 'string') {
                setFileDataUrl(e.target.result);
                const img = new Image();
                img.src = e.target.result;
                setTimeout(() => {
                    const ratio = img.width / img.height;
                    console.log(img.width )
                    console.log("ldsllgd")
                    console.log("src", img.src)
                    console.log("Ratio", ratio)
                    if (imgRef.current) {
                        if (ratio > 1) {
                            imgRef.current.width = window.innerWidth;
                            imgRef.current.height = window.innerWidth/ratio;
                        } else if (ratio < 1) {
                            imgRef.current.height = window.innerHeight;
                            imgRef.current.width = window.innerHeight * ratio
                        } else {
                            imgRef.current.width = window.innerWidth;
                            imgRef.current.height = window.innerHeight;
                        }
                    }
                }, 25)
                }
        };
    }, []);

    useEffect(() => {
        if (imgRef) {
            imgRef.current?.width
        }
    })

    return (
        <div className="image-canvas" style={{backgroundImage: fileDataUrl}}>
                {fileDataUrl && <img ref={imgRef} src={fileDataUrl} alt="Uploaded"/>}
        </div>
    );
};

export default ImageCanvas;
