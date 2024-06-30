import PDFDocument from 'pdfkit';
import svgToPdf from 'svg-to-pdfkit';

const convertSvgToPDF = (req, res) =>{
    const { svg, width, height } = req.body;
    if(!svg){
        return res.status(400).send('SVG data is required.');
    }

    try {
        // Create PDF document
        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');

        // Convert SVG to PDF and pipe to response
        svgToPdf(doc, svg, 0, 0, { width, height });
        doc.pipe(res);
        doc.end();

      } catch (error) {
        console.error('Error converting SVG to PDF:', error.message);
        res.status(500).send('Error converting SVG to PDF.');
      }

}

export {convertSvgToPDF};