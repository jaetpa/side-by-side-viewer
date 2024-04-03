import { useEffect, useState } from "react";
import "./LoaderButton.css"

interface LoaderButtonProps {
    handleImageSelected: Function;
    handleDisplayModeSelected: Function;
}
const LoaderButton = (props: LoaderButtonProps) => {
    const [files, setFiles] = useState<File[]>();
    const [fileIndex, setFileIndex] = useState<number>(0);

    useEffect(() => {
        const handleKeyUp = (e: KeyboardEvent) => {
            
            if (files) {
                console.log("gheqbds", files)
                if (e.key === 'ArrowLeft') {
                    setFileIndex(prev => Math.max(prev - 1, 0));
                }
                if (e.key === 'ArrowRight') {
                    setFileIndex(prev => Math.min(prev + 1, files.length - 1))
                }    
            }
        }

        window.addEventListener("keyup", handleKeyUp );


        console.log(fileIndex)

        return () => window.removeEventListener("keyup", handleKeyUp)
    }, [files])

    useEffect(() => {
        if (files) {
            props.handleImageSelected(files[fileIndex])
        }
        console.log(fileIndex)

        
    }, [fileIndex, files, props.handleImageSelected])

    // const handleDrop = (e: any) => {
    //     e.preventDefault();
    //     const files = Array.from<File>(e.dataTransfer.files);
    //     if (files) {
    //         setFiles(files)
    //     }
    // };

    // const handleDragOver = (e: any) => {
    //     e.preventDefault();
    // };

    return (
    <div className="loader">
        <form>
            <input type="file" multiple={true} accept=".jpg, .jpeg, .png, .gif" onChange={(e) => {
                if(e.target.files) {
                    const filesArray = Array.from(e.target.files);
                    console.log("Files:",filesArray)
                    setFiles(filesArray);
                }}}
                />
                <div>
                <label htmlFor="TB">TB</label>
                <input type="radio" id="TB" name="displayMode" defaultChecked onClick={(e) => props.handleDisplayModeSelected(e.currentTarget.id)}/>
                <label htmlFor="SBS">SBS</label>
                <input type="radio" id="SBS" name="displayMode" onClick={(e) => props.handleDisplayModeSelected(e.currentTarget.id)}/>
                </div>
            {/* <div onDragOver={handleDragOver} onDrop={handleDrop}></div> */}
        </form>
    </div> );
}
 
export default LoaderButton;