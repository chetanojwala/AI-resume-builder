import html2pdf from 'html2pdf.js';

export const pdfService = {
  async exportToPdf(elementId: string, filename = 'Resume.pdf'): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id ${elementId} not found`);
    }

    // Add generating class for PDF specific formatting if needed
    element.classList.add('pdf-render-mode');

    const opt = {
      margin: [0, 0, 0, 0], // exact full bleed
      filename: filename.endsWith('.pdf') ? filename : `${filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
        scrollX: 0,
        scrollY: 0,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('html2pdf generation failed, falling back to window.print():', err);
      window.print();
    } finally {
      element.classList.remove('pdf-render-mode');
    }
  },

  printResume(): void {
    window.print();
  },
};
