import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

// Configure the worker to use the pdf.worker.bundle.js file.
GlobalWorkerOptions.workerSrc = '/pdf.worker.bundle.js';

export default getDocument;
