// create a document and pipe to a blob
var doc = new PDFDocument();
var stream = doc.pipe(blobStream());

// draw some text
doc.fontSize(30)
   .text('Ishara Madawa Kumararathna', 100, 30);

   
// and some justified text wrapped into columns
doc.text('And here is some wrapped text...', 100, 300)
   .font('Times-Roman', 13)
   .moveDown()
   .text(lorem, {
     width: 412,
     align: 'justify',
     indent: 30,
     columns: 2,
     height: 300,
     ellipsis: true
   });
   
// end and display the document in the iframe to the right
doc.end();
stream.on('finish', function() {
  iframe.src = stream.toBlobURL('application/pdf');
});