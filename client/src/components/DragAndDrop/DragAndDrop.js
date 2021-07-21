import React from 'react';
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import firebase from 'firebase/app'
import 'firebase/storage'

function DragAndDrop(props) {
  const firebaseConfig = {
    apiKey: "AIzaSyCxVb7MPS_-gKr-bUl9VccxfkpwS5EgxT0",
    authDomain: "pet-sync-e6f45.firebaseapp.com",
    projectId: "pet-sync-e6f45",
    storageBucket: "pet-sync-e6f45.appspot.com",
    messagingSenderId: "327180827350",
    appId: "1:327180827350:web:d2b79d0c57824fb3582777"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)}
  const storage = firebase.storage()

  const onDrop = useCallback(async (acceptedFiles) => {
    let formdata = new FormData()
    formdata.append('uploadedFiles', acceptedFiles)
    // console.log(acceptedFiles)
      const file = acceptedFiles[0]
      const ref = await  storage.ref(`photos/${file.name}`)
      await ref.put(file)
      // console.log(345)
      const res = await fetch(`https://firebasestorage.googleapis.com/v0/b/pet-sync-e6f45.appspot.com/o/photos%2F${file.name}`)
      // console.log(321)
        const result = await res.json()
        // console.log(123)
        // console.log(result)
      let token = result.downloadTokens
     const url = `https://firebasestorage.googleapis.com/v0/b/pet-sync-e6f45.appspot.com/o/photos%2F${file.name}?alt=media&token=${token}`
      console.log(url)
      return url
  }, [storage])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


  return (
    <>
              <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
    </>
  );
}

export default DragAndDrop;
