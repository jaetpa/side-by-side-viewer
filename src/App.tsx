import { useState } from 'react'
import './App.css'
import ImageCanvas from './ImageCanvas'
import LoaderButton from './LoaderButton'

function App() {
  
  const [imageFile, setImageFile] = useState<File>()

  const onLoaderButtonClicked = (imageFile: File) => {
    setImageFile(imageFile)
  }

  return (
    <>
    <LoaderButton handleImageSelected={onLoaderButtonClicked} />
    
    <ImageCanvas imageFile={imageFile} />
    </>
  )
}

export default App
