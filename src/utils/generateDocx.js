import {saveAs} from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

export const generateDocx=(fileName)=>{
    const doc=new Document({
        sections:[{

            children:[
                new Paragraph({
                    children:[new TextRun("Hello World")],
                })
            ]
        }]
    });
    const mimeType ="application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    Packer.toBlob(doc).then((blob)=>{
        const docblob = blob.slice(0, blob.size, mimeType);
        saveAs(docblob,fileName);
    })
}