import PDFDocument from 'pdfkit';
import svgToPdf from 'svg-to-pdfkit';

const exportAsPDF = (req, res) =>{
    const { svg } = req.body;
    if(!svg){
        return res.status(400).send('SVG data is required.');
    }

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');

    svgToPdf(doc, svg, 0, 0);
    doc.pipe(res);
    doc.end();


}

export {exportAsPDF};