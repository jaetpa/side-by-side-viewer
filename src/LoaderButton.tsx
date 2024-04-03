import { useEffect, useState } from "react";
import "./LoaderButton.css"

interface LoaderButtonProps {
    handleImageSelected: Function;
}
const LoaderButton = (props: LoaderButtonProps) => {
    const [file, setFile] = useState<File|null>();

    useEffect(() => {
        if (file) {
            props.handleImageSelected(file)
        }
        
    }, [file, props.handleImageSelected])

    const handleDrop = (e: any) => {
        e.preventDefault();
        const files = Array.from<File>(e.dataTransfer.files);
        if (files) {
            setFile(files[0])
        }
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
    };

    return (
    <div className="loader">
        <form>
            <input type="file" accept=".jpg, .jpeg, .png, .gif" onChange={(e) => {
                if(e.target.files) {
                    setFile(e.target.files[0])
                }}}
                />
            <div onDragOver={handleDragOver} onDrop={handleDrop}></div>
        </form>
    </div> );
}
 
export default LoaderButton;