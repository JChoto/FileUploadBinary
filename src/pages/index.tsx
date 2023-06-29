import React, {  useState } from "react"; 

const IndexPage: React.FC<any> = () => {
    const [file, setFile] = useState<File>();
    const [fileByte, setFileByte] = useState<any>();

    // const handleFileChange = async(e: ChangeEvent<HTMLInputElement>) => {
    //   if (e.target.files) {
    //     const fileUpload = e.target.files[0]; 
    //     const buffer = await fileUpload.arrayBuffer(); 
    //     const bytes = new Uint8Array(buffer)
    //     setFileByte(bytes);
    //     setFile(fileUpload);
    //   }
    // };

    const handleFileChange = async(e: any) => {
      const byteFile = await transformByte(e);
      setFileByte(byteFile);
    };

    const transformByte = async(e: any) => {
      const file = e.target.files[0];
      setFile(file);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
  
          reader.onload = (event:any) => {
              resolve(event.target.result);
          };
  
          reader.onerror = (err) => {
              reject(err);
          };
  
          reader.readAsArrayBuffer(file);
      });
    }

    const handleUploadClick = async() => {
      if (!file) {
        return;
      }

      // 👇 Uploading the file using the fetch API to the server
      await fetch(
        `https://resourceful-shark-j7peo1-dev-ed.trailblaze.my.salesforce-sites.com/restapi/services/apexrest/DocumentUploadBinary?email=bertha@fcof.net&contentype=${file.type}&name=${file.name}`,

        {
        method: "POST",          
        body: fileByte,
        // body: fileByte,
        // 👇 Set headers manually for single file upload
        // headers: {
        //   'Content-Type': 'application/json'
        //   }
        // headers: {
        //   "contentype": file.type, 
        //   "email":'bertha@fcof.net',
        //   "name":file.name,
        // },
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    };
 

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
};

export default IndexPage;
