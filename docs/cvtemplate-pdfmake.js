// create a document and pipe to a blob
var doc = new PDFDocument();
var stream = doc.pipe(blobStream());

// draw some text
doc.fontSize(30)
   .text('Ishara Madawa Kumararathna', 30, 30);

doc.fontSize(13).font('Helvetica-Bold')
   .text('Mobile : ', 30, 60);
   
doc.fontSize(13).font('Helvetica-Bold')
   .text('Address : ', 30, 75);
   
doc.fontSize(13).font('Helvetica-Bold')
   .text('E-Mail : ', 30, 90);

doc.moveTo(30, 105)   
   .lineTo(580, 105)       
   .stroke() 

// and some justified text wrapped into columns
doc.text('And here is some wrapped text...', 30, 200)
   .font('Times-Roman', 13)
   .text(lorem, {
     //width: 412,
     align: 'justify',
     indent: 30,
     columns: 1,
     //height: 300,
     ellipsis: true
   });
   
// end and display the document in the iframe to the right
doc.end();
stream.on('finish', function() {
  iframe.src = stream.toBlobURL('application/pdf');
});