//Captura el HTML de un elemento del DOM y lo convierte en una cadena
//completa con estilos inline para que Lambda pueda renderizarlo
export function captureHTMLWithStyles(element: HTMLElement): string {
    // Clonar elemento
    const clone = element.cloneNode(true) as HTMLElement;
    
    // Obtener elementos del clon
    const allElements = clone.querySelectorAll('*');
    
    allElements.forEach((el, index) => {
        const originalEl = element.querySelectorAll('*')[index] as HTMLElement;
        const computedStyles = window.getComputedStyle(originalEl);
        
        // Aplicar estilos
        const stylesToCopy = [
        'font-family', 'font-size', 'font-weight', 'color',
        'background-color', 'padding', 'margin', 'border',
        'width', 'height', 'display', 'text-align',
        'line-height', 'letter-spacing'
        ];
        
        let inlineStyles = '';
        stylesToCopy.forEach(prop => {
        const value = computedStyles.getPropertyValue(prop);
        if (value) {
            inlineStyles += `${prop}: ${value}; `;
        }
        });
        
        (el as HTMLElement).setAttribute('style', inlineStyles);
    });
    
    // Construir el HTML
    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        }
        body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        }
        @page {
        size: A4;
        margin: 0;
        }
    </style>
</head>
<body>
    ${clone.outerHTML}
</body>
</html>
    `.trim();
    
    return htmlContent;
}

//Descarga un archivo PDF desde una URL
export async function downloadPDF(url: string, fileName: string): Promise<void> {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        
        // Crear un enlace temporal para descargar
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Limpiar el objeto URL
        URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error('Error descargando PDF:', error);
        throw error;
    }
}