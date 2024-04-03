import { useState } from 'react'
import './App.css'
import ImageCanvas from './ImageCanvas'
import LoaderButton from './LoaderButton'

function App() {
  
  const [imageFile, setImageFile] = useState<File>()
  const [displayMode, setDisplayMode] = useState<string>("TB")

  const onLoaderButtonClicked = (imageFile: File) => {
    setImageFile(imageFile)
  }

  const handleDisplayModeSelected = (displayMode: string) => {
    setDisplayMode(displayMode)
    console.log(displayMode);
  }


  return (
    <>
    <LoaderButton handleImageSelected={onLoaderButtonClicked} handleDisplayModeSelected={handleDisplayModeSelected}/>
    
    <ImageCanvas imageFile={imageFile} displayMode={displayMode} />
    </>
  )
}

export default App
