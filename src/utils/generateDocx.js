import { saveAs } from "file-saver";
import { Document, Packer,ImageRun, Paragraph, TextRun, AlignmentType } from "docx";
import Logo  from "./images/bpdf_logo.jpg";
import { readFile } from "fs-web";
export const generateDocx = (fileName) => {
    // const image = new ImageRun({
    //     data: readFile(bpdf_logo),
    //     transformation: {
    //         width: 100,
    //         height: 100,
    //     },
    // });
    //console.log(Logo);
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Bago People Defense Force - BPDF",
                bold:true,
                break: 1,
              }),
              new TextRun({
                text: "မှတ်တမ်းတင်ဂုဏ်ပြုလွှာ",
                font:"Pyidaungsu",
                break: 1,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
      },
    ],
  });
  const logo = readFile();
  const mimeType =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  Packer.toBlob(doc).then((blob) => {
    const docblob = blob.slice(0, blob.size, mimeType);
    saveAs(docblob, fileName);
  });
};
