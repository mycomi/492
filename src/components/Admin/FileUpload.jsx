import { useEffect } from "react";
import useDrivePicker from "react-google-drive-picker";
import React from 'react'

function FileUpload() {
  const [openPicker, data, authResponse] = useDrivePicker();
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId:"800775607820-mss1qfni1pb5nm48j9si1lnukqvi8h66.apps.googleusercontent.com",
      developerKey:"AIzaSyAYg2LEhI1DFpWn169rfxpHGLtXxB9X47o",
      viewId:"DOCS",
      //token:"##youraccesstoken##", // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
    });
  };

  useEffect(() => {
    // do anything with the selected/uploaded files
    if (data) {
      data.docs.map((i) => console.log(i));
    }
  }, [data]);

  return (
    <div>
      <button onClick={() => handleOpenPicker()}>Open Picker</button>
    </div>
  );
}

export default FileUpload;